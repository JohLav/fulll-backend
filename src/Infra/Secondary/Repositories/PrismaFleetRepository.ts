import { prisma } from "../client";
import { Vehicle as PrismaVehicle } from "@prisma/client";
import { Fleet } from "../../../Domain/Models/Fleet";
import { Vehicle } from "../../../Domain/Models/Vehicle";
import { FleetRepository } from "../../../Domain/Ports/FleetRepository";
import { LocationMapper } from "./Mappers/LocationMapper";

// Secondary Adapter
export class PrismaFleetRepository implements FleetRepository {
  async save(fleet: Fleet): Promise<void> {
    try {
      const existingFleet = await prisma.fleet.findUnique({
        where: { id: fleet.id },
      });

      if (!existingFleet) {
        await prisma.fleet.create({
          data: {
            id: fleet.id,
            userId: fleet.userId,
          },
        });
      }

      for (const vehicle of fleet.vehicles) {
        const locationString = vehicle.location
          ? LocationMapper.toPrisma(vehicle.location)
          : "";

        const dbVehicle = await prisma.vehicle.upsert({
          where: { plate: vehicle.plateNumber },
          update: {
            location: locationString,
          },
          create: {
            plate: vehicle.plateNumber,
            location: locationString,
          },
        });

        await prisma.vehiclesInFleets.upsert({
          where: {
            vehiclePlate_fleetId: {
              vehiclePlate: dbVehicle.plate,
              fleetId: fleet.id,
            },
          },
          update: {},
          create: {
            vehiclePlate: dbVehicle.plate,
            fleetId: fleet.id,
          },
        });
      }
    } catch (error) {
      console.error("Error saving fleet:", error);
      throw error;
    }
  }

  async findById(fleetId: string): Promise<Fleet | undefined> {
    const fleet = await prisma.fleet.findUnique({
      where: { id: fleetId },
      include: {
        vehicles: {
          include: { vehicle: true },
        },
      },
    });
    if (!fleet) return undefined;

    const vehicles: Vehicle[] = fleet.vehicles.map(
      (v: { vehicle: PrismaVehicle }): Vehicle =>
        Vehicle.create(
          v.vehicle.plate,
          LocationMapper.toDomain(v.vehicle.location as string),
        ),
    );

    return Fleet.create(fleet.id, fleet.userId, vehicles);
  }
}
