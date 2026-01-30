/*
  Warnings:

  - You are about to drop the column `verifyToken` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `verificationtoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `adminuser` DROP FOREIGN KEY `AdminUser_userId_fkey`;

-- DropForeignKey
ALTER TABLE `brand` DROP FOREIGN KEY `Brand_userId_fkey`;

-- DropForeignKey
ALTER TABLE `influencer` DROP FOREIGN KEY `Influencer_userId_fkey`;

-- DropIndex
DROP INDEX `User_verifyToken_key` ON `user`;

-- AlterTable
ALTER TABLE `influencer` ALTER COLUMN `platform` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `verifyToken`,
    ADD COLUMN `emailOtp` VARCHAR(191) NULL,
    ADD COLUMN `emailOtpExpiry` DATETIME(3) NULL;

-- DropTable
DROP TABLE `verificationtoken`;

-- AddForeignKey
ALTER TABLE `AdminUser` ADD CONSTRAINT `AdminUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Brand` ADD CONSTRAINT `Brand_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Influencer` ADD CONSTRAINT `Influencer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
