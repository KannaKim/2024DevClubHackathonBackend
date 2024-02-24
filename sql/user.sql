CREATE TABLE `2024devclubhackathon`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `userid` VARCHAR(45) NOT NULL,
  `pw` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `userid_UNIQUE` (`userid` ASC) VISIBLE);
