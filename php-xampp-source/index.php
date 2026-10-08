<?php
/**
 * ADF2027: A Day With The Foxes - Public Portal
 * School of Computing - Holy Angel University
 * Powered by custom PHP & MySQL CMS
 */

require_once __DIR__ . '/config/database.php';

// Fetch Event Details
$stmt = $pdo->query("SELECT * FROM event_details WHERE id = 1 LIMIT 1");
$event = $stmt->fetch();
if (!$event) {
    die("Event information not initialized. Please import database/schema.sql.");
}

// Fetch Featured Organizations
$stmt = $pdo->query("SELECT * FROM organizations WHERE featured = 1 ORDER BY id ASC");
$organizations = $stmt->fetchAll();

// Fetch Gallery Photos
$stmt = $pdo->query("SELECT * FROM gallery ORDER BY id ASC LIMIT 3");
$gallery = $stmt->fetchAll();

// Handle Registration POST
$regMessage = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'register') {
    $student_id = trim($_POST['student_id'] ?? '');
    $full_name = trim($_POST['full_name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $year_level = trim($_POST['year_level'] ?? '1st Year');
    $program = trim($_POST['program'] ?? 'BS Information Technology');
    $preferred_org = trim($_POST['preferred_org'] ?? '');

    if (!empty($full_name) && !empty($email)) {
        $stmt = $pdo->prepare("INSERT INTO registrations (student_id, full_name, email, year_level, program, preferred_org, status) VALUES (?, ?, ?, ?, ?, ?, 'Confirmed')");
        $stmt->execute([$student_id, $full_name, $email, $year_level, $program, $preferred_org]);
        $regMessage = "success";
    }
}

// Handle Contact Inquiry POST
$inqMessage = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'contact') {
    $c_name = trim($_POST['full_name'] ?? '');
    $c_email = trim($_POST['email'] ?? '');
    $c_subject = trim($_POST['subject'] ?? 'General Inquiry');
    $c_message = trim($_POST['message'] ?? '');

    if (!empty($c_name) && !empty($c_email) && !empty($c_message)) {
        $stmt = $pdo->prepare("INSERT INTO inquiries (full_name, email, subject, message) VALUES (?, ?, ?, ?)");
        $stmt->execute([$c_name, $c_email, $c_subject, $c_message]);
        $inqMessage = "success";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($event['title']) ?> - <?= htmlspecialchars($event['theme']) ?></title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Silkscreen&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #160803; }
        .font-tech { font-family: 'Chakra Petch', sans-serif; }
        .font-silkscreen { font-family: 'Silkscreen', monospace; }
        .font-mono { font-family: monospace; }
        .hazard-stripes {
            background: repeating-linear-gradient(45deg, rgba(230, 90, 21, 0.15), rgba(230, 90, 21, 0.15) 12px, transparent 12px, transparent 24px);
        }
        .tape-top {
            position: absolute; top: -10px; left: 50%; transform: translateX(-50%) rotate(-2deg);
            width: 70px; height: 20px; background-color: rgba(245, 230, 190, 0.85); box-shadow: 0 1px 3px rgba(0,0,0,0.2); z-index: 10;
        }
    </style>
</head>
<body class="text-white selection:bg-[#E65A15] selection:text-white">

    <!-- Top Platform Bar -->
    <div class="bg-[#120602] py-0.5 text-center border-b border-[#240e05]">
        <span class="text-[10px] text-amber-200/50 tracking-wider">
            Built on WIX Harmony • School Of Computing • ADF2027
        </span>
    </div>

    <!-- Header / Navbar matching Screenshot 1 -->
    <header class="sticky top-0 z-40 bg-[#160803] border-b border-[#351508] shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3.5 cursor-pointer">
                <div class="text-3xl">🦊</div>
                <div class="flex flex-col">
                    <div class="flex items-baseline gap-1">
                        <span class="font-tech text-2xl font-black text-white">ADF</span>
                        <span class="font-tech text-2xl font-black text-[#E65A15]"><?= htmlspecialchars($event['edition']) ?></span>
                    </div>
                    <span class="font-tech text-[10px] tracking-widest text-[#FED7AA] font-semibold uppercase -mt-1">
                        A DAY WITH <span class="text-[#E65A15] font-bold">THE FOXES</span>
                    </span>
                </div>
            </div>

            <div class="hidden lg:flex items-center px-4 py-1.5 rounded bg-[#210D05]/80 border border-[#431B09] text-[11px] font-mono text-[#E0A878]">
                <span><?= htmlspecialchars($event['tagline']) ?></span>
            </div>

            <nav class="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
                <a href="#hero" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:text-[#E65A15] text-[#F5E6D3]">Home</a>
                <a href="#about" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:text-[#E65A15] text-[#F5E6D3]">About</a>
                <a href="#organizations" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:text-[#E65A15] text-[#F5E6D3]">Organizations</a>
                <a href="#video" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:text-[#E65A15] text-[#F5E6D3]">Video</a>
                <a href="#gallery" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:text-[#E65A15] text-[#F5E6D3]">Gallery</a>
                <a href="#contact" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:text-[#E65A15] text-[#F5E6D3]">Contact</a>
                <a href="auth/login.php" class="ml-2 px-3 py-1.5 rounded-md bg-[#E65A15] hover:bg-[#D95A11] text-white font-semibold text-xs transition-all shadow">
                    CMS Admin
                </a>
            </nav>
        </div>
    </header>

    <!-- SECTION 1: HERO & ABOUT matching Screenshot 1 -->
    <section id="hero" class="relative bg-[#F7EBD8] text-[#1B0B04] pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto flex justify-end pr-6 mb-2">
            <span class="text-amber-500 text-sm">🧡 🧡 🧡</span>
        </div>

        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <!-- Left Poster -->
            <div class="lg:col-span-7">
                <div class="bg-[#160803] text-white p-6 rounded-3xl border-4 border-[#3D180A] shadow-2xl">
                    <div class="flex items-center justify-between border-b border-[#3D180A] pb-3 mb-4">
                        <span class="font-tech text-xs tracking-widest text-amber-200 uppercase font-bold">SCHOOL OF COMPUTING</span>
                        <div class="flex items-center gap-1.5 text-[10px] text-amber-300 font-mono">
                            <span class="text-stone-400">COLLABORATED WITH:</span>
                            <span class="px-1.5 py-0.5 rounded bg-[#E65A15] text-white font-bold">SOC ORGS</span>
                        </div>
                    </div>

                    <div class="text-center my-3">
                        <h1 class="font-tech text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-400 to-[#E65A15] tracking-tight uppercase">
                            A DAY WITH THE FOXES
                        </h1>
                        <div class="mt-1 font-tech font-bold text-xs sm:text-sm text-[#FFB074] tracking-widest uppercase">
                            WHERE FUTURES ARE CODED.
                        </div>
                    </div>

                    <div class="bg-[#E65A15] text-[#160803] font-black text-center py-1.5 px-3 rounded-lg text-xs uppercase tracking-wide my-3 font-tech">
                        JOIN US AND DISCOVER WHERE YOUR JOURNEY BEGINS!
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 font-mono text-[11px]">
                        <div class="bg-[#240E05] p-3 rounded-xl border border-[#481D0B] text-amber-100">
                            <div class="text-[#FF8A3D] font-bold mb-1">// SOC_EXPLORER.SH</div>
                            <p class="text-[10px] text-stone-300">Come and experience life in the School of Computing! Meet our organizations, explore specialisations, and discover endless possibilities.</p>
                        </div>
                        <div class="bg-[#240E05] p-3 rounded-xl border border-[#481D0B] space-y-1 font-tech text-xs text-amber-200 font-semibold">
                            <div>• INTERACTIVE BOOTHS</div>
                            <div>• LIVE DEMONSTRATIONS</div>
                            <div>• FUN GAMES & ACTIVITIES</div>
                            <div>• EXHIBITS & ORGS SHOWCASE</div>
                            <div>• PRIZES & GIVEAWAYS</div>
                        </div>
                    </div>

                    <div class="text-center pt-2 border-t border-[#3D180A]/60">
                        <span class="font-tech text-xs tracking-wider text-amber-300 font-bold uppercase">SEE YOU AT ADF2027! 🦊</span>
                    </div>
                </div>

                <div class="flex items-center justify-between mt-3 px-6">
                    <span class="text-xs font-mono text-[#743512] font-semibold">👆 Explore the official event showcase!</span>
                    <span class="text-amber-500 text-sm">🧡 🧡 🧡</span>
                </div>
            </div>

            <!-- Right About Card -->
            <div id="about" class="lg:col-span-5">
                <div class="bg-[#1C0E07] text-[#FFF7ED] p-7 sm:p-9 rounded-3xl border-2 border-[#431B0A] shadow-2xl">
                    <h2 class="font-tech text-3xl font-black tracking-tight text-white mb-4">About the Event</h2>
                    <p class="font-mono text-xs leading-relaxed text-[#FED7AA] mb-6">
                        <?= nl2br(htmlspecialchars($event['about_text'])) ?>
                    </p>

                    <div class="mb-8">
                        <div class="font-tech text-xs sm:text-sm font-bold text-white mb-3">
                            The Event Showcases Different Organizations And Specialization Areas Such As:
                        </div>
                        <ul class="space-y-2 font-mono text-xs text-[#FDBA74] pl-2">
                            <?php foreach ($organizations as $org): ?>
                                <li>• <?= htmlspecialchars($org['name']) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>

                    <a href="#register-modal" class="block text-center py-3.5 px-6 rounded-full bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-sm tracking-wider uppercase transition-all shadow-lg">
                        ENTER THE FOX ADVENTURE &gt;
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION 2: EVENT DETAILS & POLAROID GALLERY matching lower Screenshot 1 -->
    <section class="relative bg-[#C84E0C] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <!-- Left Card -->
            <div class="lg:col-span-6">
                <div class="bg-[#1C0E07] text-[#FFF7ED] p-7 sm:p-9 rounded-3xl border-2 border-[#54210C] shadow-2xl">
                    <h2 class="font-tech text-2xl sm:text-3xl font-black text-white mb-4">📅 Event Details</h2>
                    <div class="mb-5 p-4 rounded-xl bg-[#29130A] border border-[#481E0D]">
                        <div class="font-tech text-xs uppercase text-[#FF9E59] font-bold mb-1">What To Expect:</div>
                        <p class="font-mono text-xs text-[#FED7AA]"><?= htmlspecialchars($event['what_to_expect']) ?></p>
                    </div>
                    <div class="space-y-3 font-mono text-xs sm:text-sm">
                        <div><strong class="text-[#FFB074]">Date:</strong> <?= htmlspecialchars($event['date_range']) ?></div>
                        <div><strong class="text-[#FFB074]">Time:</strong> <?= htmlspecialchars($event['time_range']) ?></div>
                        <div><strong class="text-[#FFB074]">Venue:</strong> <?= htmlspecialchars($event['venue']) ?></div>
                        <div><strong class="text-[#FFB074]">Contact Information:</strong> <?= htmlspecialchars($event['coordinators']) ?></div>
                    </div>
                </div>
            </div>

            <!-- Right Polaroid Gallery -->
            <div id="gallery" class="lg:col-span-6">
                <div class="flex justify-end pr-6 mb-4">
                    <span class="font-silkscreen text-xl text-amber-200 font-bold -rotate-3 inline-block">See you there!! ✨</span>
                </div>
                <div class="flex flex-col gap-5 items-center">
                    <?php foreach ($gallery as $photo): ?>
                        <div class="relative bg-white text-slate-800 p-3 pb-4 rounded-sm shadow-2xl w-full max-w-sm" style="transform: rotate(<?= (int)$photo['rotation_deg'] ?>deg);">
                            <div class="tape-top"></div>
                            <div class="w-full h-44 overflow-hidden bg-black">
                                <img src="<?= htmlspecialchars($photo['image_url']) ?>" alt="<?= htmlspecialchars($photo['caption']) ?>" class="w-full h-full object-cover">
                            </div>
                            <div class="mt-2 text-center font-mono text-[11px] text-stone-700 font-semibold truncate">
                                <?= htmlspecialchars($photo['caption']) ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION 3: FEATURED ORGANIZATIONS matching Screenshot 2 -->
    <section id="organizations" class="relative bg-[#160803] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-[#311306]">
        <div class="max-w-7xl mx-auto px-4 sm:px-8">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#351508]">
                <div class="flex items-center gap-3">
                    <div class="text-3xl">🦊</div>
                    <div>
                        <h2 class="font-tech text-3xl sm:text-4xl font-black text-white uppercase">Featured Organizations ✨</h2>
                        <p class="font-mono text-xs text-amber-200/70">School of Computing Accredited Student Organizations</p>
                    </div>
                </div>
                <span class="font-mono text-xs text-amber-200/60"><?= htmlspecialchars($event['tagline']) ?></span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <?php foreach ($organizations as $org): ?>
                    <div class="bg-[#1C0E07] rounded-2xl border-2 border-[#54210C] hover:border-[#E65A15] p-5 flex flex-col justify-between transition-all group">
                        <div>
                            <div class="text-amber-500 font-mono text-sm mb-3">📁 <?= htmlspecialchars($org['category']) ?></div>
                            <h3 class="font-tech font-black text-lg text-white mb-2 uppercase"><?= htmlspecialchars($org['name']) ?></h3>
                            <p class="font-mono text-[11px] text-[#E6CCB2] leading-relaxed mb-6 uppercase line-clamp-6"><?= htmlspecialchars($org['description']) ?></p>
                        </div>
                        <div class="pt-4 border-t border-[#311306] flex items-center justify-between">
                            <span class="font-mono text-xs font-bold text-amber-400"><?= htmlspecialchars($org['acronym']) ?></span>
                            <span class="w-8 h-8 rounded-full bg-[#2A1107] border border-[#E65A15] text-[#E65A15] flex items-center justify-center font-bold text-xs">&gt;</span>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- SECTION 4: VIDEO SHOWCASE matching Screenshot 2/3 -->
    <section id="video" class="relative bg-[#160803] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto mb-10">
            <div class="h-2 w-full bg-[#D95A11] rounded-full"></div>
        </div>
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-7">
                <div class="relative aspect-video rounded-2xl overflow-hidden border-3 border-[#54210C] bg-black">
                    <video src="<?= htmlspecialchars($event['video_url']) ?>" controls class="w-full h-full object-cover"></video>
                </div>
            </div>
            <div class="lg:col-span-5 space-y-3">
                <h2 class="font-tech text-4xl font-black uppercase">
                    ADF<span class="text-[#E65A15]">2027</span>
                    <div>A DAY WITH <span class="text-[#E65A15]">THE FOXES</span></div>
                </h2>
                <p class="font-mono text-xs sm:text-sm text-[#FED7AA] leading-relaxed pt-2">
                    <?= htmlspecialchars($event['video_purpose']) ?>
                </p>
            </div>
        </div>
    </section>

    <!-- SECTION 5: READY TO JOIN ARCADE matching Screenshot 3 -->
    <section class="relative bg-[#F7EBD8] text-[#1B0B04] py-14 px-4 sm:px-6 lg:px-8 border-t border-[#DEC8AC]">
        <div class="max-w-6xl mx-auto">
            <div class="flex items-center justify-between mb-4">
                <div class="font-tech text-2xl font-black">ADF<span class="text-[#E65A15]">2027</span></div>
                <div class="font-mono text-xs text-[#743512] font-semibold"><?= htmlspecialchars($event['tagline']) ?></div>
            </div>
            <div class="w-full h-0.5 bg-[#E65A15] mb-8"></div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div class="lg:col-span-6 flex justify-center">
                    <div class="w-full max-w-md bg-[#160803] p-6 rounded-3xl border-4 border-[#3D180A] text-white">
                        <div class="bg-[#C84E0C] text-center font-mono text-xs font-bold py-1 rounded mb-4">FEBRUARY 23-24, 2027</div>
                        <div class="bg-[#220D04] p-6 rounded-2xl border-2 border-[#54210C] text-center">
                            <div class="font-tech text-3xl font-black text-amber-200">A DAY</div>
                            <div class="font-tech text-2xl font-black text-[#E65A15]">WITH THE FOXES</div>
                        </div>
                        <div class="mt-4 p-4 rounded-xl bg-[#281106] text-center font-tech text-xs text-amber-200">
                            SCHOOL OF COMPUTING • SJH BUILDING (9AM - 4PM)
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-6 space-y-4">
                    <div class="flex items-center gap-3">
                        <div class="text-4xl">🦊</div>
                        <h2 class="font-tech text-4xl font-black leading-tight">
                            READY TO JOIN
                            <div class="text-[#E65A15]">THE FOXES?</div>
                        </h2>
                    </div>
                    <p class="font-mono text-xs sm:text-sm text-[#54210C] leading-relaxed">
                        <?= htmlspecialchars($event['ready_text']) ?>
                    </p>
                    <a href="#register-modal" class="inline-block py-3 px-8 rounded-full bg-[#E65A15] hover:bg-[#F97316] text-white font-tech font-bold text-sm tracking-wider uppercase transition-all shadow-lg">
                        ENTER THE FOX ADVENTURE &gt;
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER matching Screenshot 3 -->
    <footer class="bg-[#D95A11] text-white py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-white text-[#8A2109] font-tech font-black flex items-center justify-center text-xs">HAU</div>
                <div>
                    <div class="font-tech text-lg font-black uppercase">Holy Angel University</div>
                    <div class="font-tech text-xs text-amber-100 uppercase">School Of Computing • ADF2027</div>
                </div>
            </div>
            <div class="font-mono text-xs text-amber-100 space-y-1 text-center md:text-right">
                <div>📍 #1 Holy Angel Avenue, Sto. Rosario, Angeles City, Philippines 2009</div>
                <div>📞 (63) 045-625-5748</div>
                <div>✉️ Admissions@Hau.Edu.Ph</div>
            </div>
        </div>
    </footer>

</body>
</html>
