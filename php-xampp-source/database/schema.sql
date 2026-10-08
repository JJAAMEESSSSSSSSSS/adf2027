-- ========================================================
-- DATABASE SCHEMA: adf2027_cms.sql
-- Content Management System for ADF2027: A Day with the Foxes
-- Holy Angel University - School of Computing
-- ========================================================

CREATE DATABASE IF NOT EXISTS `adf2027_cms` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `adf2027_cms`;

-- Table: admins
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'Super Admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table: event_details
CREATE TABLE IF NOT EXISTS `event_details` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(100) NOT NULL DEFAULT 'ADF2027',
  `edition` VARCHAR(20) DEFAULT '2027',
  `theme` VARCHAR(150) DEFAULT 'A DAY WITH THE FOXES',
  `tagline` VARCHAR(200) DEFAULT 'Rooted In Code, Driven By Purpose.',
  `about_text` TEXT NOT NULL,
  `date_range` VARCHAR(100) DEFAULT 'February 23-24, 2027',
  `time_range` VARCHAR(100) DEFAULT '9:00am To 4:00pm',
  `venue` VARCHAR(150) DEFAULT 'SJH Building',
  `coordinators` VARCHAR(255) DEFAULT 'Dr. Mary Jane Rabena And Sir Bon Flores',
  `what_to_expect` TEXT NOT NULL,
  `video_title` VARCHAR(150) DEFAULT 'ADF2027 A DAY WITH THE FOXES',
  `video_purpose` TEXT NOT NULL,
  `video_url` VARCHAR(255) DEFAULT 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-41484-large.mp4',
  `ready_text` TEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table: organizations
CREATE TABLE IF NOT EXISTS `organizations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `acronym` VARCHAR(30) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `icon_type` VARCHAR(30) DEFAULT 'code',
  `description` TEXT NOT NULL,
  `tagline` VARCHAR(200) DEFAULT NULL,
  `booth_location` VARCHAR(150) DEFAULT 'SJH Building',
  `member_count` INT DEFAULT 100,
  `featured` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table: registrations (Fox Adventure Attendees)
CREATE TABLE IF NOT EXISTS `registrations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_id` VARCHAR(50) NOT NULL,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `year_level` VARCHAR(50) NOT NULL,
  `program` VARCHAR(150) NOT NULL,
  `preferred_org` VARCHAR(150) NOT NULL,
  `status` ENUM('Pending', 'Confirmed', 'Attended') DEFAULT 'Confirmed',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table: gallery (Polaroids)
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `caption` VARCHAR(255) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `tag` VARCHAR(50) DEFAULT 'Demonstrations',
  `rotation_deg` INT DEFAULT -2,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table: inquiries (Contact Messages)
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `subject` VARCHAR(200) DEFAULT 'General Inquiry',
  `message` TEXT NOT NULL,
  `status` ENUM('Unread', 'Read', 'Resolved') DEFAULT 'Unread',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ========================================================
-- SEED DATA
-- Default Admin: username 'admin', password 'admin123' (password_hash: BCRYPT)
-- ========================================================

INSERT INTO `admins` (`username`, `password_hash`, `full_name`, `role`) VALUES
('admin', '$2y$10$wTqS8l77O9ZfGqYtYdGQk.C2n7F8eO0lXkP6jYxQw4n9A7o/4mHSm', 'Dr. Mary Jane Rabena', 'Super Admin')
ON DUPLICATE KEY UPDATE `username`=`username`;

INSERT INTO `event_details` (`id`, `title`, `edition`, `theme`, `tagline`, `about_text`, `date_range`, `time_range`, `venue`, `coordinators`, `what_to_expect`, `video_title`, `video_purpose`, `video_url`, `ready_text`) VALUES
(1, 'ADF2027', '2027', 'A DAY WITH THE FOXES', 'Rooted In Code, Driven By Purpose.',
'ADF (A Day With Foxes) Is An Annual School Of Computing Event Designed To Allow Students, Especially Incoming And Non-Major Students, To Experience The Culture, Activities, Specialisations, And Student Organizations Within The School Of Computing.',
'February 23-24, 2027', '9:00am To 4:00pm', 'SJH Building', 'Dr. Mary Jane Rabena And Sir Bon Flores',
'Each Organization Prepares Interactive Booths, Demonstrations, Games, Exhibits, And Activities Related To Their Specialization.',
'ADF2027 A DAY WITH THE FOXES',
'The purpose of the video is to persuade visitors to explore the School of Computing and encourage them to participate in ADF2027.',
'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-41484-large.mp4',
'Experience games, activities, organizations, and the School of Computing community.')
ON DUPLICATE KEY UPDATE `id`=1;

INSERT INTO `organizations` (`name`, `acronym`, `category`, `icon_type`, `description`, `tagline`, `booth_location`, `member_count`) VALUES
('CODE GEEKS', 'CG', 'Software Engineering', 'code',
'CODE GEEKS IS A STUDENT ORGANIZATION FOR ASPIRING PROGRAMMERS AND SOFTWARE DEVELOPERS. MEMBERS ENHANCE THEIR CODING SKILLS THROUGH PROGRAMMING WORKSHOPS, CODING COMPETITIONS, COLLABORATIVE PROJECTS, AND TECHNOLOGY-FOCUSED EVENTS WHILE BUILDING A SUPPORTIVE COMMUNITY OF FUTURE DEVELOPERS.',
'Coding The Future Byte by Byte', 'SJH 2nd Floor Lobby', 140),

('CYBERSECURITY INTELLIGENCE ALLIANCE', 'CSIA', 'Cybersecurity & Networks', 'shield',
'THE CYBERSECURITY INTELLIGENCE ALLIANCE (CSIA) PROMOTES CYBERSECURITY AWARENESS THROUGH ENGAGING WORKSHOPS, HANDS-ON ACTIVITIES, AND EDUCATIONAL PROGRAMS THAT EQUIP STUDENTS WITH THE KNOWLEDGE AND PRACTICAL SKILLS NEEDED TO BECOME FUTURE ETHICAL CYBERSECURITY PROFESSIONALS.',
'Defend, Secure, Protect', 'SJH Cyber Lab 304', 115),

('MULTIMEDIA AFICIONADOS FOR INTERESTED ARTISTS (MAFIA)', 'MAFIA', 'Digital Arts & Animation', 'media',
'MULTIMEDIA AFICIONADOS FOR INTERESTED ARTISTS (MAFIA) PROVIDES A CREATIVE SPACE WHERE STUDENTS DEVELOP THEIR TALENTS IN GRAPHIC DESIGN, PHOTOGRAPHY, VIDEOGRAPHY, ANIMATION, AND DIGITAL STORYTELLING WHILE COLLABORATING WITH FELLOW ARTISTS ON EXCITING MULTIMEDIA PROJECTS.',
'Where Creativity Meets Computation', 'SJH Multimedia Hall', 185),

('LOOP', 'LOOP', 'Leadership & Competitions', 'loop',
'LOOP IS A STUDENT-LED ORGANIZATION UNDER THE SCHOOL OF COMPUTING DEDICATED TO HELPING STUDENTS GROW THEIR TECHNICAL SKILLS AND EXPAND THEIR PROFESSIONAL NETWORK. THROUGH CODING COMPETITIONS, AND COLLABORATIVE EVENTS, LOOP CREATES OPPORTUNITIES FOR MEMBERS TO LEARN, AND CONNECT WITH THE COMPUTING COMMUNITY.',
'Iterate, Innovate, Elevate', 'SJH Ground Plaza', 130);

INSERT INTO `gallery` (`title`, `caption`, `image_url`, `tag`, `rotation_deg`) VALUES
('Future Tech Showcase', 'Interactive student presentations - "We Are The Future"', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80', 'Demonstrations', -3),
('Packed SOC Auditorium', 'Incoming and non-major students filling the main hall', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=700&q=80', 'Plenary', 2),
('Fox Mascot Campus Parade', 'Fox mascot and student leaders welcoming everyone!', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80', 'Parade', -1);

INSERT INTO `registrations` (`student_id`, `full_name`, `email`, `year_level`, `program`, `preferred_org`, `status`) VALUES
('2023-10492', 'Juan Carlo Santos', 'jcsantos@hau.edu.ph', '1st Year', 'BS Information Technology', 'CODE GEEKS', 'Confirmed'),
('2024-08219', 'Maria Angela Dizon', 'madizon@hau.edu.ph', 'Incoming Freshman', 'BS Computer Science', 'CYBERSECURITY INTELLIGENCE ALLIANCE', 'Confirmed'),
('2022-19401', 'Rafael De Leon', 'rdeleon@hau.edu.ph', '2nd Year', 'BS Entertainment & Multimedia Computing', 'MULTIMEDIA AFICIONADOS FOR INTERESTED ARTISTS (MAFIA)', 'Pending');
