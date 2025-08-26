-- AlterTable
ALTER TABLE `Bill` ADD COLUMN `proposerId` INTEGER NULL;

-- CreateTable
CREATE TABLE `BiographySection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `representativeId` INTEGER NOT NULL,
    `heading` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BiographyParagraph` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `biographySectionId` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `className` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bill` ADD CONSTRAINT `Bill_proposerId_fkey` FOREIGN KEY (`proposerId`) REFERENCES `Representative`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BiographySection` ADD CONSTRAINT `BiographySection_representativeId_fkey` FOREIGN KEY (`representativeId`) REFERENCES `Representative`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BiographyParagraph` ADD CONSTRAINT `BiographyParagraph_biographySectionId_fkey` FOREIGN KEY (`biographySectionId`) REFERENCES `BiographySection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
