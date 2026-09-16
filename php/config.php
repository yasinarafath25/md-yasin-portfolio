<?php
// ============================================================
// InfinityFree MySQL Database Connection Configuration
// Replace the constants below with your actual InfinityFree credentials
// ============================================================

// CORS headers to allow cross-origin requests from your frontend domain
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: application/json; charset=UTF-8');

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// InfinityFree MySQL Credentials (Found in vPanel / Control Panel)
define('DB_HOST', 'sqlXXX.infinityfree.com'); // e.g. sql100.infinityfree.com
define('DB_USER', 'epiz_XXXXXX');            // e.g. epiz_12345678
define('DB_PASS', 'YOUR_INFINITYFREE_PASS'); // Your vPanel / Account Password
define('DB_NAME', 'epiz_XXXXXX_portfolio');  // e.g. epiz_12345678_portfolio

function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Database connection failed: ' . $e->getMessage()
        ]);
        exit();
    }
}
?>
