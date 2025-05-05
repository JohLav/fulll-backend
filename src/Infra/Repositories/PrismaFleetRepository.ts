import { prisma } from "../Prisma/client.js";
import { Fleet } from "../../Domain/Models/Fleet.js";
import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { LocationMapper } from "../Mappers/LocationMapper.js";
import { VehicleTypeMapper } from "../Mappers/VehicleTypeMapper.js";
import { LocationNotFoundError } from "../../App/Errors/LocationNotFoundError.js";
import {retrieveFleet} from "../../../features/steps/shared/retrieveFleet.js";

export class PrismaFleetRepository implements FleetRepository {
  async save(fleet: Fleet): Promise<void> {
      const existingFleet = await prisma.fleet.findUnique({ where: { id: fleet.id } });

      if (!existingFleet) {
        prisma.fleet.create({
          data: {
            userId: fleet.userId,
          },
        });
      }

    for (const vehicle of fleet.vehicles) {
      if (!vehicle.location) throw new LocationNotFoundError(vehicle.plateNumber);
      const vehicleType = VehicleTypeMapper.toPrisma(vehicle.type);
      const locationString = LocationMapper.toPrisma(vehicle.location);

      await prisma.vehicle.upsert({
        where: {id: vehicle.id},
        update: {
          plate: vehicle.plateNumber,
          type: vehicleType,
          location: locationString,
        },
        create: {
          plate: vehicle.plateNumber,
          type: vehicleType,
          location: locationString,
        }
      })
      await prisma.vehiclesInFleets.upsert({
        where: {
          vehicleId_fleetId: {
            vehicleId: vehicle.id,
            fleetId: fleet.id,
          },
        },
        update: {},
        create: {
          vehicleId: vehicle.id,
          fleetId: fleet.id,
        },
      });
    }
  }

    async findById(fleetId: string): Promise<Fleet | undefined> {
      const fleet = await prisma.fleet.findUnique({
              where: {id: fleetId},
              include: {
                  vehicles: {
                      include: {vehicle: true},
                  },
              },
          });

          if (!fleet) return undefined;

        return retrieveFleet(this.repository, fleet.id);
    }

    async findByUserId(userId: string): Promise<Fleet | undefined> {
      // Implement the logic to find a fleet by its ID using Prisma
      return null;
    }

    async findVehicleByPlateNumber(plateNumber: string): Promise<Vehicle | undefined> {
      // Implement the logic to find a vehicle by its plate number using Prisma
      return null;
    }
  }
}
