/*
  Warnings:

  - Made the column `location` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Vehicle` MODIFY `location` VARCHAR(191) NOT NULL;
