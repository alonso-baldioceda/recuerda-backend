/*
  Warnings:

  - The values [0,1] on the enum `Bill_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Bill` MODIFY `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL;
