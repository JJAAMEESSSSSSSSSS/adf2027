<?php
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

        // Check password hash or default fallback
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
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ADF2027 CMS - Admin Login</title>
    <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600&family=VT323&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #120602; }
        .font-tech { font-family: 'Chakra Petch', sans-serif; }
        .font-mono { font-family: monospace; }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-[#1C0E07] rounded-3xl border-3 border-[#E65A15] p-8 shadow-2xl text-white">
        <div class="text-center mb-6">
            <div class="text-5xl mb-2">🦊</div>
            <h1 class="font-tech text-2xl font-black uppercase text-white tracking-wider">
                ADF<span class="text-[#E65A15]">2027</span> CMS LOGIN
            </h1>
            <p class="font-mono text-xs text-amber-200/80 mt-1">
                Holy Angel University • School of Computing
            </p>
        </div>

        <?php if (!empty($error)): ?>
            <div class="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-600 text-red-200 font-mono text-xs">
                <?= htmlspecialchars($error) ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="" class="space-y-4 font-mono text-xs">
            <div>
                <label class="block text-amber-200 font-semibold mb-1">Username</label>
                <input type="text" name="username" required value="admin"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white outline-none">
            </div>

            <div>
                <label class="block text-amber-200 font-semibold mb-1">Password</label>
                <input type="password" name="password" required value="admin123"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1107] border border-[#54210C] focus:border-[#E65A15] text-white outline-none">
            </div>

            <div class="p-3 rounded-xl bg-[#240E05] border border-[#481E0C] text-[11px] text-stone-300">
                <span class="text-[#E65A15] font-bold">Default Credentials:</span> Username: <code class="text-amber-300">admin</code> | Password: <code class="text-amber-300">admin123</code>
            </div>

            <button type="submit"
                class="w-full py-3 rounded-full bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-orange-950">
                Sign In to CMS Portal
            </button>

            <div class="text-center pt-2">
                <a href="../index.php" class="text-amber-200/70 hover:text-white underline text-xs">
                    ← Back to Public Event Site
                </a>
            </div>
        </form>
    </div>
</body>
</html>
