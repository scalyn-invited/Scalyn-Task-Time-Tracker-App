-- AlterTable
ALTER TABLE `Client`
    ADD COLUMN `monthlyAllowanceMinutes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `billable` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `archivedAt` DATETIME(3) NULL;

-- Index
CREATE INDEX `Client_userId_archivedAt_idx` ON `Client`(`userId`, `archivedAt`);
