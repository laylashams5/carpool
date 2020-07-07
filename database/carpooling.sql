-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.16-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for carpooling
CREATE DATABASE IF NOT EXISTS `carpooling` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `carpooling`;

-- Dumping structure for table carpooling.ads
CREATE TABLE IF NOT EXISTS `ads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(250) NOT NULL,
  `caption` varchar(250) NOT NULL,
  `points` int(11) NOT NULL,
  `addtime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table carpooling.ads: ~3 rows (approximately)
/*!40000 ALTER TABLE `ads` DISABLE KEYS */;
INSERT INTO `ads` (`id`, `image`, `caption`, `points`, `addtime`) VALUES
	(1, 'slide1.png', '0', 10, NULL),
	(2, 'slide2.jpg', '0', 20, NULL),
	(3, 'slide3.jpg', '0', 30, NULL);
/*!40000 ALTER TABLE `ads` ENABLE KEYS */;

-- Dumping structure for table carpooling.members
CREATE TABLE IF NOT EXISTS `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `points` int(11) NOT NULL DEFAULT '0',
  `username` varchar(250) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `carmodel` varchar(250) DEFAULT NULL,
  `typeid` int(11) NOT NULL,
  `confirmed` tinyint(4) NOT NULL DEFAULT '0',
  `addtime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `type` (`typeid`),
  CONSTRAINT `FK_members_member_types` FOREIGN KEY (`typeid`) REFERENCES `member_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=243 DEFAULT CHARSET=utf8;

-- Dumping data for table carpooling.members: ~5 rows (approximately)
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` (`id`, `points`, `username`, `image`, `email`, `phone`, `address`, `password`, `carmodel`, `typeid`, `confirmed`, `addtime`) VALUES
	(108, 0, 'omer', 'images/13841f88a2d12319ee24b9f80b1b46e4.gif', 'omer@gmail.com', '123456789', 'bahri', '81dc9bdb52d04dc20036dbd8313ed055', 'vista', 2, 0, '2020-04-17 02:04:00'),
	(128, 0, 'laylaha', 'images/7ea7dd9aa96384a5a33ea63e783c1395.jpg', 'laylashams5@gmail.com', '07645678', 'ombdad', 'd93591bdf7860e1e4ee2fca799911215', '', 1, 0, '2020-04-17 02:04:00'),
	(236, 0, 'ali', 'images/bde38b9f7853813f9e6755ed3509e866.png', 'aliomran@gmail.com', '243567890', 'bahri', '81dc9bdb52d04dc20036dbd8313ed055', 'hondi', 2, 0, '2020-04-17 05:04:00'),
	(240, 0, 'omer123', 'images/67a3366c14db4fce714b22be5cf33b0d.png', 'omer@hotmail.com', '1223456789', 'test', '81dc9bdb52d04dc20036dbd8313ed055', 'morning', 2, 0, '2020-04-17 05:04:00'),
	(242, 0, 'lolo', '', 'laylashams2@gmail.com', '12345678', 'omdurman', '81dc9bdb52d04dc20036dbd8313ed055', '', 1, 0, '2020-04-30 12:04:00');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;

-- Dumping structure for table carpooling.member_types
CREATE TABLE IF NOT EXISTS `member_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(250) NOT NULL DEFAULT '0',
  `addtime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table carpooling.member_types: ~2 rows (approximately)
/*!40000 ALTER TABLE `member_types` DISABLE KEYS */;
INSERT INTO `member_types` (`id`, `type`, `addtime`) VALUES
	(1, 'member', NULL),
	(2, 'driver', NULL);
/*!40000 ALTER TABLE `member_types` ENABLE KEYS */;

-- Dumping structure for table carpooling.points
CREATE TABLE IF NOT EXISTS `points` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `points` int(11) NOT NULL DEFAULT '0',
  `addtime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1_points_members` (`member_id`),
  KEY `FK2_points_member_type` (`type_id`),
  CONSTRAINT `FK1_points_members` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK2_points_member_type` FOREIGN KEY (`type_id`) REFERENCES `member_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table carpooling.points: ~1 rows (approximately)
/*!40000 ALTER TABLE `points` DISABLE KEYS */;
INSERT INTO `points` (`id`, `member_id`, `type_id`, `points`, `addtime`) VALUES
	(2, 108, 2, 20, '2020-06-13 12:06:00');
/*!40000 ALTER TABLE `points` ENABLE KEYS */;

-- Dumping structure for table carpooling.posted_trip
CREATE TABLE IF NOT EXISTS `posted_trip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL DEFAULT '0',
  `seats` int(11) NOT NULL DEFAULT '0',
  `status_id` int(11) DEFAULT NULL,
  `carno` varchar(250) NOT NULL DEFAULT '0',
  `cityfrom` varchar(250) DEFAULT NULL,
  `cityto` varchar(250) DEFAULT NULL,
  `arrivetime` varchar(250) DEFAULT NULL,
  `addtime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_posttrips_trip_status` (`status_id`),
  KEY `FK_member_psoted` (`member_id`),
  CONSTRAINT `FK_member_psoted` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_posttrips_trip_status` FOREIGN KEY (`status_id`) REFERENCES `trip_status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- Dumping data for table carpooling.posted_trip: ~2 rows (approximately)
/*!40000 ALTER TABLE `posted_trip` DISABLE KEYS */;
INSERT INTO `posted_trip` (`id`, `member_id`, `seats`, `status_id`, `carno`, `cityfrom`, `cityto`, `arrivetime`, `addtime`) VALUES
	(31, 108, 2, 1, 'vista', 'Jumhouria St', 'Mak St', '5:00 PM', '2020-05-11 12:05:00'),
	(33, 236, 2, 1, 'hondi', 'Nile St', 'Jamma St', '12:00 PM', '2020-05-11 01:05:00');
/*!40000 ALTER TABLE `posted_trip` ENABLE KEYS */;

-- Dumping structure for table carpooling.post_trip
CREATE TABLE IF NOT EXISTS `post_trip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seats` int(11) NOT NULL DEFAULT '0',
  `carno` int(11) NOT NULL DEFAULT '0',
  `cityfrom` varchar(250) DEFAULT NULL,
  `cityto` varchar(250) DEFAULT NULL,
  `arrivetime` varchar(250) DEFAULT NULL,
  `addtime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table carpooling.post_trip: ~3 rows (approximately)
/*!40000 ALTER TABLE `post_trip` DISABLE KEYS */;
INSERT INTO `post_trip` (`id`, `seats`, `carno`, `cityfrom`, `cityto`, `arrivetime`, `addtime`) VALUES
	(1, 1, 0, 'Jamma St', 'Nile St', '8:00 AM', NULL),
	(2, 3, 0, 'Nile St', 'Jamma St', '12:00 PM', NULL),
	(3, 2, 0, 'Jumhouria St', 'Mak St', '5:00 PM', NULL);
/*!40000 ALTER TABLE `post_trip` ENABLE KEYS */;

-- Dumping structure for table carpooling.slider
CREATE TABLE IF NOT EXISTS `slider` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caption` varchar(250) DEFAULT NULL,
  `image` varchar(250) NOT NULL,
  `addtime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table carpooling.slider: ~0 rows (approximately)
/*!40000 ALTER TABLE `slider` DISABLE KEYS */;
/*!40000 ALTER TABLE `slider` ENABLE KEYS */;

-- Dumping structure for table carpooling.trips
CREATE TABLE IF NOT EXISTS `trips` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL DEFAULT '0',
  `driver_id` int(11) NOT NULL DEFAULT '0',
  `status_id` int(11) NOT NULL,
  `carmodel` varchar(250) NOT NULL,
  `pointto` varchar(250) NOT NULL,
  `pointfrom` varchar(250) NOT NULL,
  `starttime` varchar(250) NOT NULL,
  `seats` int(11) NOT NULL,
  `qrcode` varchar(250) DEFAULT NULL,
  `addtime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_trips_trip_status` (`status_id`),
  KEY `FK_members_trips` (`member_id`),
  KEY `FK_driver_trip` (`driver_id`),
  CONSTRAINT `FK_driver_trip` FOREIGN KEY (`driver_id`) REFERENCES `posted_trip` (`member_id`),
  CONSTRAINT `FK_members_trips` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_trips_trip_status` FOREIGN KEY (`status_id`) REFERENCES `trip_status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- Dumping data for table carpooling.trips: ~1 rows (approximately)
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;
INSERT INTO `trips` (`id`, `member_id`, `driver_id`, `status_id`, `carmodel`, `pointto`, `pointfrom`, `starttime`, `seats`, `qrcode`, `addtime`) VALUES
	(24, 128, 108, 2, 'vista', 'Mak St', 'Jumhouria St', '5:00 PM', 3, 'order24', '2020-06-12 02:06:00');
/*!40000 ALTER TABLE `trips` ENABLE KEYS */;

-- Dumping structure for table carpooling.trip_status
CREATE TABLE IF NOT EXISTS `trip_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(250) NOT NULL,
  `addtime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table carpooling.trip_status: ~4 rows (approximately)
/*!40000 ALTER TABLE `trip_status` DISABLE KEYS */;
INSERT INTO `trip_status` (`id`, `status`, `addtime`) VALUES
	(1, 'new', '2020-04-26 12:37:14'),
	(2, 'arrived', '2020-04-26 12:37:09'),
	(3, 'canceled', '2020-04-26 12:37:15'),
	(4, 'approved', '2020-05-07 11:30:08'),
	(5, 'done', NULL);
/*!40000 ALTER TABLE `trip_status` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
