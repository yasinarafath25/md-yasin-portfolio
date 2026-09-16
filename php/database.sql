-- ============================================================
-- MySQL Database Schema for InfinityFree Hosting
-- Import this file into phpMyAdmin on InfinityFree
-- Database: epiz_XXXXXX_portfolio (or your database name)
-- ============================================================

-- Table structure for `bookings` (Consultation & Contact Form)
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `topic` VARCHAR(255) NOT NULL,
  `selected_time` VARCHAR(100) NOT NULL,
  `message` TEXT DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for `contact_messages` (General Messages)
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `sender_name` VARCHAR(255) NOT NULL,
  `sender_email` VARCHAR(255) NOT NULL,
  `subject` VARCHAR(255) DEFAULT NULL,
  `message` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional sample initial data
INSERT INTO `bookings` (`name`, `email`, `topic`, `selected_time`, `message`) 
VALUES ('John Doe', 'john@example.com', 'Full Stack Web Development', '10:00 AM', 'Initial consultation inquiry.');
