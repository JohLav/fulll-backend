/*
  Warnings:

  - A unique constraint covering the columns `[vehiclePlate,fleetId]` on the table `VehiclesInFleets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `VehiclesInFleets_vehiclePlate_fleetId_key` ON `VehiclesInFleets`(`vehiclePlate`, `fleetId`);
