-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: giftogram
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test@test.com','$2a$10$A5XgEvaIReBeAjhp7Fs7Tews9SEcBGCGoec861ltURztdLko0WB2G','test','test'),(2,'john@test.com','$2a$10$Y9cx6CM6alpioCKB.3i7I.f3jfBuwwoS1yrurTg4ztW2IcMNs.0A.','John','Doe'),(3,'noemainmdl@gmail.com','$2a$10$9an/diGBMQfLQrn2/ok/3uEKwA4zxJD6zeG.7/WLhCOaAfcjcZ.By','l','Doe'),(4,'logan@test.com','$2a$10$ZFxsRooxM2Kiw2/.Zg7roO.ZznKeMqF.zkmlYqaL7KRXiHJONjx4m','Logan','Sailer'),(5,'logan@gmail.com','$2a$10$n8oyIg3oLCDx4FdaoFlGnuqreIH7JcxesXaxB80PPjTRo.S5h5056','Logan','Sailer'),(6,'Test0@test.com','$2a$10$ixqC1o2Tgrw3hA9BjrvxYO4j0QqRNW0AqHkMkNwaAdShOjhKv71LW','Test','0'),(7,'Test1@test.com','$2a$10$okuwtp4XPAXt5UJkZAdz9.YhcpI1NUQ50J763A9JsLNrcBwVplNNe','Test','1'),(8,'Test01@test.com','$2a$10$u8jENxAWzYmcjkMo.8Fyb.Q1VKmgzKaoMRM7fxwrkUGxhCGir6H1u','Tester','01'),(9,'Test03@test.com','$2a$10$H6hLfqXhHH9EJp/iRnghIupwzRShzLP6cQWBFIsnoQKml0BBkN5Em','Test','03'),(10,'Test04@test.com','$2a$10$3dlMlzF1sxcsFgO5CPtOKOmWyIKILbZeo15XBBr0taAOUCbr1ZWW6','Test','04'),(11,'logansailer0633@gmail.com','$2a$10$5BFPK/cSS77tdsJavQ/hAePBf6iRg8MU1Xz1nVpuqhe8gKTrSUxKW','Logan','Sailer'),(12,'giftogram@gmail.com','$2a$10$GdNmCZCHn0xyuEDO32SNxeCJAfjVh0oP9bRDJkk1OlrnpUdvwYZNO','Giftogram','Giftogram');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-22 23:15:46
