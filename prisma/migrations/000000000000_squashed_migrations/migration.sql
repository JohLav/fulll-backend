-- CreateTable
CREATE TABLE `Vehicle` (
    `plate` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,

    UNIQUE INDEX `Vehicle_plate_key`(`plate`),
    PRIMARY KEY (`plate`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fleet` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehiclesInFleets` (
    `vehiclePlate` VARCHAR(191) NOT NULL,
    `fleetId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `VehiclesInFleets_vehiclePlate_fleetId_key`(`vehiclePlate`, `fleetId`),
    PRIMARY KEY (`vehiclePlate`, `fleetId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VehiclesInFleets` ADD CONSTRAINT `VehiclesInFleets_vehiclePlate_fkey` FOREIGN KEY (`vehiclePlate`) REFERENCES `Vehicle`(`plate`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehiclesInFleets` ADD CONSTRAINT `VehiclesInFleets_fleetId_fkey` FOREIGN KEY (`fleetId`) REFERENCES `Fleet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

