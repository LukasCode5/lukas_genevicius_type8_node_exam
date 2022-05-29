-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2022 at 05:13 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `type8_node_exam_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(10) UNSIGNED NOT NULL,
  `group_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `group_id`, `user_id`) VALUES
(1, 5, 7),
(2, 2, 7),
(3, 1, 7),
(4, 3, 11),
(5, 3, 4),
(6, 5, 4),
(7, 5, 13),
(8, 2, 8),
(9, 7, 16),
(10, 9, 7),
(11, 3, 7),
(12, 9, 18),
(13, 5, 18),
(14, 2, 18),
(15, 1, 18),
(16, 8, 18),
(17, 7, 18),
(18, 4, 18),
(19, 8, 7),
(20, 1, 19),
(21, 1, 17),
(22, 3, 17),
(23, 6, 17),
(24, 1, 15),
(25, 4, 15),
(26, 2, 15),
(27, 5, 15),
(28, 7, 15),
(29, 9, 15),
(30, 6, 15),
(31, 3, 15),
(32, 9, 25),
(33, 8, 25),
(34, 1, 25);

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(10) UNSIGNED NOT NULL,
  `group_id` int(10) UNSIGNED NOT NULL,
  `amount` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `group_id`, `amount`, `description`) VALUES
(1, 1, 5000, 'Vacation bills'),
(2, 3, 900, 'Additional expenses'),
(3, 3, 100, 'Some expenses'),
(4, 3, 3000, 'Hotel expenses'),
(5, 4, 250, 'Food cost'),
(6, 1, 500, 'Car expenses'),
(7, 1, 30, 'Some expenses'),
(8, 1, 900, 'Entertainment bills'),
(9, 9, 35, 'Car expenses'),
(10, 6, 50, 'Car expenses'),
(11, 9, 90, 'Food expenses'),
(12, 9, 65, 'Hotel bills'),
(13, 9, 90, 'Movie tickets'),
(14, 2, 500, 'Car expenses'),
(15, 4, 90, 'Bus tickets'),
(16, 4, 100, 'Car expenses'),
(17, 4, 150, 'Hotel bills'),
(18, 4, 50, 'Movie tickets'),
(19, 4, 200, 'Car service bills'),
(20, 1, 20, 'Coffee expenses'),
(21, 1, 10, 'Bus tickets'),
(22, 9, 900, 'Car service bills');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(1, 'Trip to Spain'),
(2, 'Going to Alps'),
(3, 'Dinner in Belgium'),
(4, 'Trip to Finland'),
(5, 'New Years Party'),
(6, 'Vacation in Hawaii'),
(7, 'Trip to the New World'),
(8, 'Into the Rain Forest'),
(9, 'Trip Around the World');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `req_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `req_timestamp`) VALUES
(4, 'Karolis Kisas', 'karolis@gamil.com', '$2a$10$8VUSciBn6u/1jLSpU2lk6us73mulpCMT7tlT4LPfuSlkdhXhC2GTm', '2022-05-26 06:57:49'),
(7, 'Migle Migluota', 'migle@gamil.com', '$2a$10$593uS7XfT7CNYscQMChPVuQhpxbIaUBUP5sNQF865VJkPvwBml4ci', '2022-05-26 06:59:56'),
(8, 'Mantas Kunlas', 'mantas@gamil.com', '$2a$10$hSEL3UwOZHmotHfAYOWTEO3H4gtRMiEzetVXkEv/.hxDQFUintDhi', '2022-05-26 07:00:32'),
(10, 'Areta Greilona', 'areta@gamil.com', '$2a$10$bLwxUOxFZ8NdxDb2TG/h7eX54l4nPnPRoTUIWOHDABhmHSfyPVXMS', '2022-05-26 07:01:07'),
(11, 'Mindaugas Medis', 'mindaugas@gamil.com', '$2a$10$lmUGVx7MkgajPQEeVvxH9O9JMa1/l5TBs087EtPrty4gYK3nT7Hxq', '2022-05-26 07:02:21'),
(13, 'Mantvydas Cool', 'mantvydas@gamil.com', '$2a$10$9V56FzsDoVpIQ/xg.2VxiO5rer5cyG/KFoSoxaZLYDTBdt2ii.IIK', '2022-05-27 05:44:20'),
(15, 'Rokas Jankevicius', 'rokas@gamil.com', '$2a$10$ia53UNfwwz5WsZgX.4VvBO3Dlcm/gmW37T8MTkLKplljEaypI2KP.', '2022-05-27 09:12:23'),
(16, 'Juste Jusla', 'juste@gamil.com', '$2a$10$gHLRz8gsmGu84ogAqAKgKeKew2HdVl1MdLIPrXzstRMWrcogVhtDe', '2022-05-27 09:13:18'),
(17, 'Kristina Birza', 'kristina@gamil.com', '$2a$10$PonkBWOmLPMIjaxfiW94zulZhmsbqQK/onAC7tK.T.r1V1SgTsmmS', '2022-05-27 13:22:04'),
(18, 'Eimantas Kulas', 'eimantas@gamil.com', '$2a$10$TA7cok7yNRd37O4G7t/bku.lsaI04fCuT7UQHRNCxyG/NuP8DDuKG', '2022-05-27 13:26:11'),
(19, 'Pauliu Viskas', 'paulius@gamil.com', '$2a$10$a2liw2cwZMYN6qyeKc5WYOr/ua3HXbeevZe8a4igbgynrdosplJq2', '2022-05-28 07:18:46'),
(22, 'Leonardas Tyron', 'leonardas@gamil.com', '$2a$10$d/PshVpdazanb2bd7GXO4uaogd4Y5OaatV4o6JU9XNQM111Wvdqgq', '2022-05-28 07:21:56'),
(23, 'Saulius Liepa', 'saulius@gamil.com', '$2a$10$kkxvNKA8EWyhGbOgEJjnfuvtwR4w7wOo1hJNiCkqkFJVA6O4It.i6', '2022-05-29 10:06:41'),
(25, 'John Doe', 'john@gamil.com', '$2a$10$Ojg9II3ZOqPiMY3AHntX8.DnxlPcENoogYJOkaslnT9KwaHn7g6Ri', '2022-05-29 15:00:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
