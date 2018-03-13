-- MySQL dump 10.13  Distrib 5.1.66, for redhat-linux-gnu (x86_64)
--
-- Host: mysql.eecs.oregonstate.edu    Database: CS275
-- ------------------------------------------------------
-- Server version	5.1.65-community-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bsg_planets`
--

DROP TABLE IF EXISTS `workouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` int(11) NOT NULL,
  `reps` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `lbs` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

-- ALTER TABLE workouts AUTO_INCREMENT = 1 
--
-- Dumping data for table `bsg_planets`
--

-- LOCK TABLES `bsg_planets` WRITE;
-- /*!40000 ALTER TABLE `bsg_planets` DISABLE KEYS */;
-- INSERT INTO `workos` VALUES (1,'Gemenon',2800000000,'Old Gemenese','Oranu'),(2,'Leonis',2600000000,'Leonese','Luminere'),(3,'Caprica',4900000000,'Caprican','Caprica City'),(7,'Sagittaron',1700000000,NULL,'Tawa'),(16,'Aquaria',25000,NULL,NULL),(17,'Canceron',6700000000,NULL,'Hades'),(18,'Libran',2100000,NULL,NULL),(19,'Picon',1400000000,NULL,'Queestown'),(20,'Scorpia',450000000,NULL,'Celeste'),(21,'Tauron',2500000000,'Tauron','Hypatia'),(22,'Virgon',4300000000,NULL,'Boskirk');
-- /*!40000 ALTER TABLE `bsg_planets` ENABLE KEYS */;
-- UNLOCK TABLES;

INSERT INTO workouts (
             	name,
		          reps,
              weight,
              date,
              lbs)

-- name: pushups
-- reps: 55
-- weight: 35
-- date: 1970-01-02
-- lbs: true (1)	
	VALUES	(
    '21',
		'31',
		'41',
    '51',
    '1'
		),

    (
		 '101',
		'102',
		'103',
    '104',
    '0'
		);      
	
-- first_name: David
-- last_name: Atkins
-- dob: 11/18/1979

		-- (
		-- 'David',
		-- 'Atkins',
		-- '1979-11-18'
		-- ),  

-- first_name: Daniel
-- last_name: Jensen
-- dob: 3/2/1985 

		-- (
		-- 'Daniel',
		-- 'Jensen',
		-- '1985-03-02'
		-- );  