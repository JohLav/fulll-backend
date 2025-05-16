/*
  Warnings:

  - The primary key for the `Vehicle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Vehicle` table. All the data in the column will be lost.
  - The primary key for the `VehiclesInFleets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `vehicleId` on the `VehiclesInFleets` table. All the data in the column will be lost.
  - Added the required column `vehiclePlate` to the `VehiclesInFleets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `VehiclesInFleets` DROP FOREIGN KEY `VehiclesInFleets_vehicleId_fkey`;

-- AlterTable
ALTER TABLE `Vehicle` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`plate`);

-- AlterTable
ALTER TABLE `VehiclesInFleets` DROP PRIMARY KEY,
    DROP COLUMN `vehicleId`,
    ADD COLUMN `vehiclePlate` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`vehiclePlate`, `fleetId`);

-- AddForeignKey
ALTER TABLE `VehiclesInFleets` ADD CONSTRAINT `VehiclesInFleets_vehiclePlate_fkey` FOREIGN KEY (`vehiclePlate`) REFERENCES `Vehicle`(`plate`) ON DELETE RESTRICT ON UPDATE CASCADE;
