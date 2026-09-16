<?php
// ============================================================
// Booking Submission API Endpoint for InfinityFree Hosting
// Accepts POST JSON payload and saves booking to MySQL database
// ============================================================

require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Only POST requests allowed']);
    exit();
}

// Parse incoming JSON request or standard Form Data
$input = json_decode(file_get_contents('php://input'), true);

$name         = isset($input['name']) ? trim($input['name']) : (isset($_POST['name']) ? trim($_POST['name']) : '');
$email        = isset($input['email']) ? trim($input['email']) : (isset($_POST['email']) ? trim($_POST['email']) : '');
$topic        = isset($input['topic']) ? trim($input['topic']) : (isset($_POST['topic']) ? trim($_POST['topic']) : '');
$selectedTime = isset($input['selectedTime']) ? trim($input['selectedTime']) : (isset($_POST['selectedTime']) ? trim($_POST['selectedTime']) : '');
$message      = isset($input['message']) ? trim($input['message']) : (isset($_POST['message']) ? trim($_POST['message']) : '');

// Validation
if (empty($name) || empty($email) || empty($topic)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Please provide name, email, and topic.']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address provided.']);
    exit();
}

try {
    $pdo = getDBConnection();
    
    $stmt = $pdo->prepare("INSERT INTO `bookings` (`name`, `email`, `topic`, `selected_time`, `message`) VALUES (:name, :email, :topic, :selected_time, :message)");
    
    $stmt->execute([
        ':name'          => $name,
        ':email'         => $email,
        ':topic'         => $topic,
        ':selected_time' => $selectedTime,
        ':message'       => $message
    ]);

    http_response_code(200);
    echo json_encode([
        'status'  => 'success',
        'message' => 'Booking request recorded successfully in MySQL database.',
        'booking_id' => $pdo->lastInsertId()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Failed to save booking: ' . $e->getMessage()
    ]);
}
?>
