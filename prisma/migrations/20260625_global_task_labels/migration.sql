-- CreateTable
CREATE TABLE `TaskLabel_new` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TaskLabel_new_name_key`(`name` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE=InnoDB;

-- Populate the global label catalog with one row per unique label name.
INSERT INTO `TaskLabel_new` (`name`, `createdAt`, `updatedAt`)
SELECT
    `source`.`name`,
    MIN(`source`.`createdAt`) AS `createdAt`,
    MAX(`source`.`updatedAt`) AS `updatedAt`
FROM `TaskLabel` AS `source`
GROUP BY `source`.`name`;

-- CreateTable
CREATE TABLE `_TaskToTaskLabel_new` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TaskToTaskLabel_new_AB_unique`(`A` ASC, `B` ASC),
    INDEX `_TaskToTaskLabel_new_B_index`(`B` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE=InnoDB;

-- Rebuild the task-label join table against the canonical global labels.
INSERT INTO `_TaskToTaskLabel_new` (`A`, `B`)
SELECT DISTINCT
    `source`.`A`,
    `target`.`id` AS `B`
FROM `_TaskToTaskLabel` AS `source`
INNER JOIN `TaskLabel` AS `legacy` ON `legacy`.`id` = `source`.`B`
INNER JOIN `TaskLabel_new` AS `target` ON `target`.`name` = `legacy`.`name`;

-- DropForeignKey
ALTER TABLE `_TaskToTaskLabel` DROP FOREIGN KEY `_TaskToTaskLabel_B_fkey`;

-- DropForeignKey
ALTER TABLE `_TaskToTaskLabel` DROP FOREIGN KEY `_TaskToTaskLabel_A_fkey`;

-- DropForeignKey
ALTER TABLE `TaskLabel` DROP FOREIGN KEY `TaskLabel_clientId_fkey`;

-- DropTable
DROP TABLE `_TaskToTaskLabel`;

-- DropTable
DROP TABLE `TaskLabel`;

-- RenameTable
RENAME TABLE `TaskLabel_new` TO `TaskLabel`;

-- RenameTable
RENAME TABLE `_TaskToTaskLabel_new` TO `_TaskToTaskLabel`;

-- AddForeignKey
ALTER TABLE `_TaskToTaskLabel` ADD CONSTRAINT `_TaskToTaskLabel_A_fkey` FOREIGN KEY (`A`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TaskToTaskLabel` ADD CONSTRAINT `_TaskToTaskLabel_B_fkey` FOREIGN KEY (`B`) REFERENCES `TaskLabel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
