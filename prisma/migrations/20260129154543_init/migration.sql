-- CreateTable
CREATE TABLE `adminuser` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AdminUser_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `application` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `influencerId` INTEGER NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Application_campaignId_fkey`(`campaignId`),
    INDEX `Application_influencerId_fkey`(`influencerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brand` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `industry` VARCHAR(191) NOT NULL,
    `totalSpend` DOUBLE NOT NULL,
    `avatarInitial` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Brand_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campaign` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `brandId` VARCHAR(191) NOT NULL,
    `budgetRange` VARCHAR(191) NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `deliverables` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `niche` VARCHAR(191) NOT NULL,
    `platforms` TEXT NOT NULL,
    `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    INDEX `Campaign_brandId_fkey`(`brandId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chatmessage` (
    `id` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ticketId` VARCHAR(191) NOT NULL,
    `senderId` VARCHAR(191) NOT NULL,

    INDEX `ChatMessage_senderId_fkey`(`senderId`),
    INDEX `ChatMessage_ticketId_fkey`(`ticketId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `influencer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `platform` VARCHAR(191) NOT NULL DEFAULT 'instagram',
    `username` VARCHAR(191) NOT NULL,
    `followers` INTEGER NOT NULL DEFAULT 0,
    `mediaCount` INTEGER NOT NULL DEFAULT 0,
    `connected` BOOLEAN NOT NULL DEFAULT false,
    `engagementRate` DOUBLE NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Influencer_username_key`(`username`),
    UNIQUE INDEX `Influencer_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `settings` (
    `id` VARCHAR(191) NOT NULL,
    `stripeApiKey` VARCHAR(191) NULL,
    `paypalBusinessEmail` VARCHAR(191) NULL,
    `notifyOnPayment` BOOLEAN NOT NULL DEFAULT true,
    `notifyOnSupport` BOOLEAN NOT NULL DEFAULT true,
    `notifyOnCampaign` BOOLEAN NOT NULL DEFAULT true,
    `notifyWeeklyReports` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscription` (
    `id` VARCHAR(191) NOT NULL,
    `plan` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `renewalDate` DATETIME(3) NOT NULL,
    `brandId` VARCHAR(191) NULL,
    `influencerId` INTEGER NULL,

    UNIQUE INDEX `Subscription_brandId_key`(`brandId`),
    UNIQUE INDEX `Subscription_influencerId_key`(`influencerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supportticket` (
    `id` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `influencerId` INTEGER NULL,
    `brandId` VARCHAR(191) NULL,

    INDEX `SupportTicket_brandId_fkey`(`brandId`),
    INDEX `SupportTicket_influencerId_fkey`(`influencerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'BRAND', 'INFLUENCER') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `verifyToken` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_verifyToken_key`(`verifyToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verificationtoken` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    INDEX `VerificationToken_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `adminuser` ADD CONSTRAINT `AdminUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `Application_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `Application_influencerId_fkey` FOREIGN KEY (`influencerId`) REFERENCES `influencer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `brand` ADD CONSTRAINT `Brand_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campaign` ADD CONSTRAINT `Campaign_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chatmessage` ADD CONSTRAINT `ChatMessage_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `adminuser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chatmessage` ADD CONSTRAINT `ChatMessage_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `supportticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `influencer` ADD CONSTRAINT `Influencer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscription` ADD CONSTRAINT `Subscription_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscription` ADD CONSTRAINT `Subscription_influencerId_fkey` FOREIGN KEY (`influencerId`) REFERENCES `influencer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supportticket` ADD CONSTRAINT `SupportTicket_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supportticket` ADD CONSTRAINT `SupportTicket_influencerId_fkey` FOREIGN KEY (`influencerId`) REFERENCES `influencer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
