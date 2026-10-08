<?php
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
?>
