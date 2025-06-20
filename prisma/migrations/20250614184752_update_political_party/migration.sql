/*
  Warnings:

  - You are about to drop the column `sortOrder` on the `PoliticalParty` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `PoliticalParty` DROP COLUMN `sortOrder`,
    MODIFY `flag` VARCHAR(191) NULL,
    MODIFY `description` TEXT NULL,
    MODIFY `isActive` BOOLEAN NULL DEFAULT true;
