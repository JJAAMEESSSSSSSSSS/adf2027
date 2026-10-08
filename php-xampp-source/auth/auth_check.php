<?php
/**
 * Authentication Middleware
 * Checks if admin session is valid. Redirects to login if unauthenticated.
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../auth/login.php');
    exit;
}
?>
