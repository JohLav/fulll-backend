import { prisma } from "../client.js";
import { Fleet } from "../../Domain/Models/Fleet.js";
import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { LocationMapper } from "../Mappers/LocationMapper.js";
import { VehicleMapper } from "../Mappers/VehicleMapper";
import { Vehicle as PrismaVehicle } from "@prisma/client";

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
          : null;

        const dbVehicle = await prisma.vehicle.upsert({
          where: { plate: vehicle.plateNumber },
          update: {},
          create: {
            id: vehicle.id,
            plate: vehicle.plateNumber,
            location: locationString,
          },
        });

        await prisma.vehiclesInFleets.upsert({
          where: {
            vehicleId_fleetId: {
              vehicleId: dbVehicle.id,
              fleetId: fleet.id,
            },
          },
          update: {},
          create: {
            vehicleId: dbVehicle.id,
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
          v.vehicle.id,
          v.vehicle.plate,
          LocationMapper.toDomain(v.vehicle.location),
        ),
    );

    return Fleet.create(fleet.id, fleet.userId, vehicles);
  }

  async findVehicleByPlateNumber(
    fleetId: string,
    plateNumber: string,
  ): Promise<Vehicle | undefined> {
    const vehicleInFleet = await prisma.vehiclesInFleets.findFirst({
      where: {
        fleetId,
        vehicle: {
          plate: plateNumber,
        },
      },
      include: {
        vehicle: true,
      },
    });
    if (!vehicleInFleet || !vehicleInFleet.vehicle) return undefined;

    return VehicleMapper.fromPrisma(vehicleInFleet.vehicle);
  }
}
