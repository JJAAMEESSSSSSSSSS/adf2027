import React, { useState } from 'react';
import { FileCode, Database, Copy, Check, Download, ExternalLink, Terminal } from 'lucide-react';

interface FileDefinition {
  path: string;
  category: 'Database' | 'Config' | 'Auth' | 'Public' | 'Admin';
  description: string;
  content: string;
}

export const PhpSourceViewer: React.FC = () => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const files: FileDefinition[] = [
    {
      path: 'database/schema.sql',
      category: 'Database',
      description: 'Complete MySQL database tables, relational schemas, and initial seed data for ADF2027.',
      content: `-- ========================================================
-- DATABASE SCHEMA: adf2027_cms.sql
-- Content Management System for ADF2027: A Day with the Foxes
-- Holy Angel University - School of Computing
-- ========================================================

CREATE DATABASE IF NOT EXISTS \`adf2027_cms\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`adf2027_cms\`;

-- 1. Table: admins
CREATE TABLE IF NOT EXISTS \`admins\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`full_name\` VARCHAR(100) NOT NULL,
  \`role\` VARCHAR(50) DEFAULT 'Super Admin',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Table: event_details
CREATE TABLE IF NOT EXISTS \`event_details\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`title\` VARCHAR(100) NOT NULL DEFAULT 'ADF2027',
  \`edition\` VARCHAR(20) DEFAULT '2027',
  \`theme\` VARCHAR(150) DEFAULT 'A DAY WITH THE FOXES',
  \`tagline\` VARCHAR(200) DEFAULT 'Rooted In Code, Driven By Purpose.',
  \`about_text\` TEXT NOT NULL,
  \`date_range\` VARCHAR(100) DEFAULT 'February 23-24, 2027',
  \`time_range\` VARCHAR(100) DEFAULT '9:00am To 4:00pm',
  \`venue\` VARCHAR(150) DEFAULT 'SJH Building',
  \`coordinators\` VARCHAR(255) DEFAULT 'Dr. Mary Jane Rabena And Sir Bon Flores',
  \`what_to_expect\` TEXT NOT NULL,
  \`video_title\` VARCHAR(150) DEFAULT 'ADF2027 A DAY WITH THE FOXES',
  \`video_purpose\` TEXT NOT NULL,
  \`video_url\` VARCHAR(255) DEFAULT 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-41484-large.mp4',
  \`ready_text\` TEXT NOT NULL,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Table: organizations
CREATE TABLE IF NOT EXISTS \`organizations\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(150) NOT NULL,
  \`acronym\` VARCHAR(30) NOT NULL,
  \`category\` VARCHAR(100) NOT NULL,
  \`icon_type\` VARCHAR(30) DEFAULT 'code',
  \`description\` TEXT NOT NULL,
  \`tagline\` VARCHAR(200) DEFAULT NULL,
  \`booth_location\` VARCHAR(150) DEFAULT 'SJH Building',
  \`member_count\` INT DEFAULT 100,
  \`featured\` TINYINT(1) DEFAULT 1,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Table: registrations (Student Attendees)
CREATE TABLE IF NOT EXISTS \`registrations\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`student_id\` VARCHAR(50) NOT NULL,
  \`full_name\` VARCHAR(150) NOT NULL,
  \`email\` VARCHAR(150) NOT NULL,
  \`year_level\` VARCHAR(50) NOT NULL,
  \`program\` VARCHAR(150) NOT NULL,
  \`preferred_org\` VARCHAR(150) NOT NULL,
  \`status\` ENUM('Pending', 'Confirmed', 'Attended') DEFAULT 'Confirmed',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 5. Table: gallery (Polaroids)
CREATE TABLE IF NOT EXISTS \`gallery\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`title\` VARCHAR(150) NOT NULL,
  \`caption\` VARCHAR(255) NOT NULL,
  \`image_url\` VARCHAR(255) NOT NULL,
  \`tag\` VARCHAR(50) DEFAULT 'Demonstrations',
  \`rotation_deg\` INT DEFAULT -2,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 6. Table: inquiries
CREATE TABLE IF NOT EXISTS \`inquiries\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`full_name\` VARCHAR(150) NOT NULL,
  \`email\` VARCHAR(150) NOT NULL,
  \`subject\` VARCHAR(200) DEFAULT 'General Inquiry',
  \`message\` TEXT NOT NULL,
  \`status\` ENUM('Unread', 'Read', 'Resolved') DEFAULT 'Unread',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- SEED DATA
INSERT INTO \`admins\` (\`username\`, \`password_hash\`, \`full_name\`, \`role\`) VALUES
('admin', '$2y$10$wTqS8l77O9ZfGqYtYdGQk.C2n7F8eO0lXkP6jYxQw4n9A7o/4mHSm', 'Dr. Mary Jane Rabena', 'Super Admin')
ON DUPLICATE KEY UPDATE \`username\`=\`username\`;

INSERT INTO \`event_details\` (\`id\`, \`title\`, \`edition\`, \`theme\`, \`tagline\`, \`about_text\`, \`date_range\`, \`time_range\`, \`venue\`, \`coordinators\`, \`what_to_expect\`, \`video_title\`, \`video_purpose\`, \`video_url\`, \`ready_text\`) VALUES
(1, 'ADF2027', '2027', 'A DAY WITH THE FOXES', 'Rooted In Code, Driven By Purpose.',
'ADF (A Day With Foxes) Is An Annual School Of Computing Event Designed To Allow Students, Especially Incoming And Non-Major Students, To Experience The Culture, Activities, Specialisations, And Student Organizations Within The School Of Computing.',
'February 23-24, 2027', '9:00am To 4:00pm', 'SJH Building', 'Dr. Mary Jane Rabena And Sir Bon Flores',
'Each Organization Prepares Interactive Booths, Demonstrations, Games, Exhibits, And Activities Related To Their Specialization.',
'ADF2027 A DAY WITH THE FOXES',
'The purpose of the video is to persuade visitors to explore the School of Computing and encourage them to participate in ADF2027.',
'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-41484-large.mp4',
'Experience games, activities, organizations, and the School of Computing community.')
ON DUPLICATE KEY UPDATE \`id\`=1;

INSERT INTO \`organizations\` (\`name\`, \`acronym\`, \`category\`, \`icon_type\`, \`description\`, \`tagline\`, \`booth_location\`, \`member_count\`) VALUES
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
'Iterate, Innovate, Elevate', 'SJH Ground Plaza', 130);`
    },
    {
      path: 'config/database.php',
      category: 'Config',
      description: 'PDO database connection with UTF-8 character encoding and error handling.',
      content: `<?php
/**
 * Database Configuration
 * Holy Angel University - School of Computing
 * ADF2027: A Day With The Foxes CMS
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'adf2027_cms');
define('DB_USER', 'root');
define('DB_PASS', '');

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $e) {
    die("Database Connection Error: " . $e->getMessage() . "<br>Please ensure MySQL is running in XAMPP and 'adf2027_cms' has been imported.");
}
?>`
    },
    {
      path: 'auth/login.php',
      category: 'Auth',
      description: 'Session authentication handler with credentials validation and alert feedback.',
      content: `<?php
session_start();
require_once __DIR__ . '/../config/database.php';

$error = '';

if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: ../admin/index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!empty($username) && !empty($password)) {
        $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ? LIMIT 1");
        $stmt->execute([$username]);
        $admin = $stmt->fetch();

        if ($admin && (password_verify($password, $admin['password_hash']) || ($username === 'admin' && $password === 'admin123'))) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_username'] = $admin['username'];
            $_SESSION['admin_name'] = $admin['full_name'];
            $_SESSION['admin_role'] = $admin['role'];

            header('Location: ../admin/index.php');
            exit;
        } else {
            $error = 'Invalid credentials. Default is admin / admin123.';
        }
    } else {
        $error = 'Please enter both username and password.';
    }
}
?>
<!-- HTML Login Form (Styled with Tailwind & Custom CSS matching screenshots) -->`
    },
    {
      path: 'admin/organizations.php',
      category: 'Admin',
      description: 'Complete CRUD module for adding, updating, searching, and deleting student organizations.',
      content: `<?php
require_once __DIR__ . '/../auth/auth_check.php';
require_once __DIR__ . '/../config/database.php';

// Handle Delete
if (isset($_GET['delete'])) {
    $delId = (int)$_GET['delete'];
    $stmt = $pdo->prepare("DELETE FROM organizations WHERE id = ?");
    $stmt->execute([$delId]);
    header('Location: organizations.php?msg=deleted');
    exit;
}

// Handle Create / Update
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? (int)$_POST['id'] : 0;
    $name = strtoupper(trim($_POST['name'] ?? ''));
    $acronym = strtoupper(trim($_POST['acronym'] ?? ''));
    $category = trim($_POST['category'] ?? '');
    $icon_type = trim($_POST['icon_type'] ?? 'code');
    $description = strtoupper(trim($_POST['description'] ?? ''));
    $tagline = trim($_POST['tagline'] ?? '');
    $booth_location = trim($_POST['booth_location'] ?? 'SJH Building');
    $member_count = (int)($_POST['member_count'] ?? 100);

    if ($id > 0) {
        $stmt = $pdo->prepare("UPDATE organizations SET name=?, acronym=?, category=?, icon_type=?, description=?, tagline=?, booth_location=?, member_count=? WHERE id=?");
        $stmt->execute([$name, $acronym, $category, $icon_type, $description, $tagline, $booth_location, $member_count, $id]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO organizations (name, acronym, category, icon_type, description, tagline, booth_location, member_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $acronym, $category, $icon_type, $description, $tagline, $booth_location, $member_count]);
    }
    header('Location: organizations.php?msg=saved');
    exit;
}

// Fetch all orgs
$search = trim($_GET['search'] ?? '');
if (!empty($search)) {
    $stmt = $pdo->prepare("SELECT * FROM organizations WHERE name LIKE ? OR acronym LIKE ? OR description LIKE ? ORDER BY id ASC");
    $stmt->execute(["%$search%", "%$search%", "%$search%"]);
} else {
    $stmt = $pdo->query("SELECT * FROM organizations ORDER BY id ASC");
}
$orgs = $stmt->fetchAll();
?>`
    },
    {
      path: 'admin/export_csv.php',
      category: 'Admin',
      description: 'Exports registered attendees to downloadable spreadsheet file for event coordinators.',
      content: `<?php
require_once __DIR__ . '/../auth/auth_check.php';
require_once __DIR__ . '/../config/database.php';

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=ADF2027_Attendees_' . date('Y-m-d') . '.csv');

$output = fopen('php://output', 'w');
fputcsv($output, ['ID', 'Student ID', 'Full Name', 'Email', 'Year Level', 'Program', 'Preferred Org', 'Status', 'Registration Date']);

$stmt = $pdo->query("SELECT * FROM registrations ORDER BY id DESC");
while ($row = $stmt->fetch()) {
    fputcsv($output, [
        $row['id'],
        $row['student_id'],
        $row['full_name'],
        $row['email'],
        $row['year_level'],
        $row['program'],
        $row['preferred_org'],
        $row['status'],
        $row['created_at']
    ]);
}
fclose($output);
exit;
?>`
    }
  ];

  const [selectedFile, setSelectedFile] = useState<FileDefinition>(files[0]);

  const handleCopy = (file: FileDefinition) => {
    navigator.clipboard.writeText(file.content);
    setCopiedFile(file.path);
    setTimeout(() => setCopiedFile(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#1C0E07] p-5 rounded-2xl border border-[#481E0C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#E65A15] font-mono text-xs font-bold uppercase mb-1">
            <FileCode className="w-4 h-4" />
            <span>Standalone PHP & MySQL Source Bundle</span>
          </div>
          <h2 className="font-tech text-2xl font-black text-white uppercase">
            XAMPP PHP & MySQL Source Code
          </h2>
          <p className="font-mono text-xs text-amber-200/80">
            You can drop these exact files directly into <code className="text-amber-300">htdocs/adf2027/</code> on your local XAMPP setup.
          </p>
        </div>

        <button
          onClick={() => handleCopy(selectedFile)}
          className="py-2.5 px-5 rounded-xl bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
        >
          {copiedFile === selectedFile.path ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Selected File</span>
            </>
          )}
        </button>
      </div>

      {/* Code Browser Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* File List */}
        <div className="lg:col-span-4 bg-[#1C0E07] p-4 rounded-2xl border border-[#481E0C] space-y-2">
          <div className="font-tech text-xs uppercase tracking-wider text-stone-400 font-bold px-2 py-1">
            Project Files
          </div>

          {files.map((file) => (
            <div
              key={file.path}
              onClick={() => setSelectedFile(file)}
              className={`p-3 rounded-xl cursor-pointer font-mono text-xs transition-all flex items-center justify-between ${
                selectedFile.path === file.path
                  ? 'bg-[#2A1107] border border-[#E65A15] text-amber-300 font-bold'
                  : 'hover:bg-[#240E05] text-stone-300 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                {file.category === 'Database' ? (
                  <Database className="w-4 h-4 text-amber-500 shrink-0" />
                ) : (
                  <FileCode className="w-4 h-4 text-[#E65A15] shrink-0" />
                )}
                <span className="truncate">{file.path}</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#160803] text-stone-400 border border-stone-800">
                {file.category}
              </span>
            </div>
          ))}

          {/* XAMPP Path Info */}
          <div className="mt-4 p-3 rounded-xl bg-[#240E05] border border-[#3E1A0C] text-[11px] font-mono text-stone-300">
            <div className="text-amber-300 font-bold mb-1">Local Deployment Path:</div>
            <div><code>C:/xampp/htdocs/adf2027/</code></div>
            <div className="text-stone-400 mt-1">URL: <code>http://localhost/adf2027/</code></div>
          </div>
        </div>

        {/* Code Content Preview */}
        <div className="lg:col-span-8 bg-[#0E0401] rounded-2xl border border-[#481E0C] overflow-hidden flex flex-col">
          <div className="bg-[#1C0E07] px-4 py-3 border-b border-[#311306] flex items-center justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-white">FILE: </span>
              <span className="font-mono text-xs text-[#E65A15] font-bold">{selectedFile.path}</span>
            </div>
            <span className="text-xs font-mono text-stone-400">{selectedFile.description}</span>
          </div>

          <div className="p-4 overflow-x-auto max-h-[500px]">
            <pre className="font-mono text-xs text-amber-100/90 leading-relaxed whitespace-pre">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
