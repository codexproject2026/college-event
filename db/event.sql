-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2026 at 03:01 AM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `event`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
`id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(1, 'admin@gmail.com', 'admin123');

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE IF NOT EXISTS `attendance` (
`id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `marked_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `student_id`, `event_id`, `marked_at`) VALUES
(4, 1, 7, '2026-04-08 09:48:25'),
(5, 1, 8, '2026-04-08 10:08:08');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE IF NOT EXISTS `events` (
`id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` text,
  `event_date` date DEFAULT NULL,
  `register_last_date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `slot_count` int(11) DEFAULT NULL,
  `available_slots` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Open',
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `category`, `description`, `event_date`, `register_last_date`, `start_time`, `end_time`, `slot_count`, `available_slots`, `status`, `image`) VALUES
(7, 'Dance event', 'Cultural', 'this is dance event', '2026-04-08', '2026-04-08', '15:18:00', '15:21:00', 10, 8, 'Completed', '1775641676792.jpg'),
(8, 'Cricket event', 'Sports', 'dsddddd', '2026-04-08', '2026-04-08', '15:38:00', '15:40:00', 5, 4, 'Completed', '1775642863552.jpg'),
(10, 'Dance event', 'Sports', 'qadssas', '2026-05-02', '2026-04-24', '16:39:00', '20:38:00', 20, 19, 'Open', '1775819050731.png');

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE IF NOT EXISTS `registrations` (
`id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `registered_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`id`, `student_id`, `event_id`, `registered_at`) VALUES
(4, 1, 7, '2026-04-08 09:48:16'),
(5, 3, 7, '2026-04-08 09:49:15'),
(6, 1, 8, '2026-04-08 10:08:05'),
(7, 1, 10, '2026-04-10 11:19:50');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE IF NOT EXISTS `students` (
`id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `interest_event` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `mobile`, `department`, `interest_event`, `password`, `created_at`) VALUES
(1, 'Kaviyarasu A', 'a.kaviyarasu01@gmail.com', '6369569637', 'MCA', 'Cultural', '123', '2026-02-19 01:52:57'),
(3, 'codex', 'codexproject2026@gmail.com', '8899663322', 'MCA', 'Technical', '123', '2026-04-08 09:49:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `student_id` (`student_id`,`event_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
 ADD PRIMARY KEY (`id`), ADD KEY `idx_status` (`status`), ADD KEY `idx_event_date` (`event_date`);

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `student_id` (`student_id`,`event_id`), ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `registrations`
--
ALTER TABLE `registrations`
ADD CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
ADD CONSTRAINT `registrations_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
