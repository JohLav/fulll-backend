/*
  Warnings:

  - You are about to drop the column `user_id` on the `Fleet` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Fleet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Fleet` DROP COLUMN `user_id`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Vehicle` (
    `id` VARCHAR(191) NOT NULL,
    `plate` VARCHAR(191) NOT NULL,
    `type` ENUM('CAR', 'TRUCK', 'MOTORCYCLE') NOT NULL,
    `location` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Vehicle_plate_key`(`plate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehiclesInFleets` (
    `vehicleId` VARCHAR(191) NOT NULL,
    `fleetId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`vehicleId`, `fleetId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VehiclesInFleets` ADD CONSTRAINT `VehiclesInFleets_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehiclesInFleets` ADD CONSTRAINT `VehiclesInFleets_fleetId_fkey` FOREIGN KEY (`fleetId`) REFERENCES `Fleet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
