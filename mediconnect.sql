-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2026 at 09:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mediconnect`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `name`, `email`, `password`) VALUES
(123, 'admin', 'admin123@gmail.com', 'admin123');

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `appointment_id` int(10) UNSIGNED NOT NULL,
  `consultation _id` int(10) UNSIGNED NOT NULL,
  `patient _id` int(10) UNSIGNED NOT NULL,
  `doctor _id` int(10) UNSIGNED NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `consultation`
--

CREATE TABLE `consultation` (
  `consultation _id` int(10) UNSIGNED NOT NULL,
  `patient _id` int(10) UNSIGNED NOT NULL,
  `doctor _id` int(10) UNSIGNED NOT NULL,
  `consultation _type` varchar(20) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `consultation _date` date NOT NULL,
  `status` varchar(20) NOT NULL,
  `started _date` datetime DEFAULT NULL,
  `ended _date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consultation`
--

INSERT INTO `consultation` (`consultation _id`, `patient _id`, `doctor _id`, `consultation _type`, `subject`, `consultation _date`, `status`, `started _date`, `ended _date`) VALUES
(1, 123, 12, 'chat', 'general', '0000-00-00', 'completed', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `consultation _fee`
--

CREATE TABLE `consultation _fee` (
  `fee _id` int(10) UNSIGNED NOT NULL,
  `consultation _id` int(10) UNSIGNED NOT NULL,
  `doctor _id` int(10) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment _status` varchar(20) NOT NULL,
  `payment _date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `doctor _id` int(10) UNSIGNED NOT NULL,
  `doctor _name` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `phone _number` varchar(15) NOT NULL,
  `Gender` varchar(20) NOT NULL,
  `specialisation` varchar(100) NOT NULL,
  `qualification` varchar(100) NOT NULL,
  `medical _registration _number` varchar(50) NOT NULL,
  `years _of _experience` int(10) UNSIGNED NOT NULL,
  `hospital/clinic_name` varchar(150) NOT NULL,
  `available _days` varchar(100) NOT NULL,
  `available _time` time NOT NULL,
  `password` varchar(255) NOT NULL,
  `created _at` timestamp NOT NULL DEFAULT current_timestamp(),
  `verification _status` varchar(20) NOT NULL DEFAULT 'pending',
  `verification _note` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`doctor _id`, `doctor _name`, `Email`, `phone _number`, `Gender`, `specialisation`, `qualification`, `medical _registration _number`, `years _of _experience`, `hospital/clinic_name`, `available _days`, `available _time`, `password`, `created _at`, `verification _status`, `verification _note`) VALUES
(12, 'dr arun', 'doctorarun23@gmail.com', '2334566757', 'male', 'general', 'mbbs', '2345', 3, 'arun clinic', 'monday', '01:00:00', '23434546', '0000-00-00 00:00:00', 'pending', 'verification required');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message _id` int(11) UNSIGNED NOT NULL,
  `consultation _id` int(11) UNSIGNED NOT NULL,
  `sender _id` int(11) NOT NULL,
  `sender _type` varchar(20) NOT NULL,
  `message` text NOT NULL,
  `sent _at` datetime NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

CREATE TABLE `prescription` (
  `prescription _id` int(11) UNSIGNED NOT NULL,
  `consultation _id` int(11) UNSIGNED NOT NULL,
  `advice` varchar(1000) NOT NULL,
  `prescription` varchar(1000) DEFAULT NULL,
  `follow_up_required` varchar(3) NOT NULL,
  `in_person_required` varchar(3) NOT NULL,
  `follow _up_notes` varchar(500) DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rating and review`
--

CREATE TABLE `rating and review` (
  `rating _id` int(10) UNSIGNED NOT NULL,
  `consultation _id` int(10) UNSIGNED NOT NULL,
  `patient _id` int(10) UNSIGNED NOT NULL,
  `doctor _id` int(10) UNSIGNED NOT NULL,
  `rating` int(10) UNSIGNED NOT NULL,
  `review` varchar(500) DEFAULT NULL,
  `created _at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `report _id` int(10) UNSIGNED NOT NULL,
  `reported _by` int(10) UNSIGNED NOT NULL,
  `reported user` int(10) UNSIGNED NOT NULL,
  `reason` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `status` varchar(20) NOT NULL,
  `admin response` varchar(1000) DEFAULT NULL,
  `created at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Patient ID` int(10) UNSIGNED NOT NULL,
  `Patient Name` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Age` int(10) UNSIGNED NOT NULL,
  `Gender` varchar(20) NOT NULL,
  `Phone Number` varchar(15) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `created _at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Patient ID`, `Patient Name`, `Email`, `Age`, `Gender`, `Phone Number`, `Password`, `created _at`) VALUES
(123, 'swathi', 'swathi123@gmail.com', 23, 'female', '23456789', '2345tyui', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `index_consultation` (`consultation _id`),
  ADD KEY `index _patient` (`patient _id`),
  ADD KEY `index _doctor` (`doctor _id`);

--
-- Indexes for table `consultation`
--
ALTER TABLE `consultation`
  ADD PRIMARY KEY (`consultation _id`),
  ADD KEY `index _patient` (`patient _id`),
  ADD KEY `index _doctor` (`doctor _id`);

--
-- Indexes for table `consultation _fee`
--
ALTER TABLE `consultation _fee`
  ADD PRIMARY KEY (`fee _id`),
  ADD KEY `index_consultation` (`consultation _id`),
  ADD KEY `index _doctor` (`doctor _id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`doctor _id`) USING BTREE;

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message _id`),
  ADD KEY `index_consultation` (`consultation _id`);

--
-- Indexes for table `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`prescription _id`),
  ADD KEY `index_consultation` (`consultation _id`);

--
-- Indexes for table `rating and review`
--
ALTER TABLE `rating and review`
  ADD PRIMARY KEY (`rating _id`),
  ADD KEY `index_consultation` (`consultation _id`),
  ADD KEY `index _patient` (`patient _id`),
  ADD KEY `index _doctor` (`doctor _id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report _id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Patient ID`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `appointment_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `consultation`
--
ALTER TABLE `consultation`
  MODIFY `consultation _id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `consultation _fee`
--
ALTER TABLE `consultation _fee`
  MODIFY `fee _id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message _id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prescription`
--
ALTER TABLE `prescription`
  MODIFY `prescription _id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rating and review`
--
ALTER TABLE `rating and review`
  MODIFY `rating _id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `report _id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`consultation _id`) REFERENCES `consultation` (`consultation _id`),
  ADD CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`patient _id`) REFERENCES `users` (`Patient ID`),
  ADD CONSTRAINT `appointment_ibfk_3` FOREIGN KEY (`doctor _id`) REFERENCES `doctors` (`doctor _id`);

--
-- Constraints for table `consultation`
--
ALTER TABLE `consultation`
  ADD CONSTRAINT `consultation_ibfk_1` FOREIGN KEY (`patient _id`) REFERENCES `users` (`Patient ID`),
  ADD CONSTRAINT `consultation_ibfk_2` FOREIGN KEY (`doctor _id`) REFERENCES `doctors` (`doctor _id`);

--
-- Constraints for table `consultation _fee`
--
ALTER TABLE `consultation _fee`
  ADD CONSTRAINT `consultation _fee_ibfk_1` FOREIGN KEY (`consultation _id`) REFERENCES `consultation` (`consultation _id`),
  ADD CONSTRAINT `consultation _fee_ibfk_2` FOREIGN KEY (`doctor _id`) REFERENCES `doctors` (`doctor _id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`consultation _id`) REFERENCES `consultation` (`consultation _id`);

--
-- Constraints for table `prescription`
--
ALTER TABLE `prescription`
  ADD CONSTRAINT `prescription_ibfk_1` FOREIGN KEY (`consultation _id`) REFERENCES `consultation` (`consultation _id`);

--
-- Constraints for table `rating and review`
--
ALTER TABLE `rating and review`
  ADD CONSTRAINT `rating and review_ibfk_1` FOREIGN KEY (`consultation _id`) REFERENCES `consultation` (`consultation _id`),
  ADD CONSTRAINT `rating and review_ibfk_2` FOREIGN KEY (`doctor _id`) REFERENCES `doctors` (`doctor _id`),
  ADD CONSTRAINT `rating and review_ibfk_3` FOREIGN KEY (`patient _id`) REFERENCES `users` (`Patient ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
