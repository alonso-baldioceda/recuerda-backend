/*
  Warnings:

  - Added the required column `proposerName` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bill` ADD COLUMN `proposerName` VARCHAR(191) NOT NULL;
