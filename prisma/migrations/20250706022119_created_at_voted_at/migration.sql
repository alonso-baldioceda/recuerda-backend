/*
  Warnings:

  - You are about to drop the column `isActive` on the `Party` table. All the data in the column will be lost.
  - Made the column `flag` on table `Party` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Bill` ADD COLUMN `votedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Party` DROP COLUMN `isActive`,
    MODIFY `id` INTEGER NOT NULL,
    MODIFY `flag` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `BillDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `billId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `className` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `representativeId` INTEGER NOT NULL,
    `billId` INTEGER NOT NULL,
    `type` ENUM('IN_FAVOR', 'AGAINST', 'ABSENT') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Representative` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NOT NULL,
    `fuel` BOOLEAN NOT NULL,
    `provinceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RepresentativeParty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `representativeId` INTEGER NOT NULL,
    `partyId` INTEGER NOT NULL,
    `from` DATETIME(3) NOT NULL,
    `to` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BillDetail` ADD CONSTRAINT `BillDetail_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `Bill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_representativeId_fkey` FOREIGN KEY (`representativeId`) REFERENCES `Representative`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `Bill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Representative` ADD CONSTRAINT `Representative_provinceId_fkey` FOREIGN KEY (`provinceId`) REFERENCES `Province`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RepresentativeParty` ADD CONSTRAINT `RepresentativeParty_representativeId_fkey` FOREIGN KEY (`representativeId`) REFERENCES `Representative`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RepresentativeParty` ADD CONSTRAINT `RepresentativeParty_partyId_fkey` FOREIGN KEY (`partyId`) REFERENCES `Party`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
