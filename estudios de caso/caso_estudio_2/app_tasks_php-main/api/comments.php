<?php
session_start();

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'No autorizado']);
    exit;
}

$userId = $_SESSION['user_id'];

// Obtener el método de la solicitud
$method = $_SERVER['REQUEST_METHOD'];

// Lee el cuerpo de la solicitud 
$data = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        // Obtener todos los comentarios del usuario
        $stmt = $conn->prepare("SELECT id, description FROM comments WHERE taskId = ?");
        $stmt->bind_param("i", $taskId);
        $stmt->execute();
        $result = $stmt->get_result();
        $tasks = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($comments);
        break;

    case 'POST':
        $taskId = $data['taskId'] ?? '';
        $description = $data['description'] ?? '';

        if ($description) {
            $stmt = $conn->prepare("INSERT INTO comments (taskId, description, create_at) VALUES (?, ?, ?, ?, NOW())");
            $stmt->bind_param("is", $taskId,$description);
            $stmt->execute();
            echo json_encode(['success' => true, 'task_id' => $stmt->insert_id]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Campos incompletos']);
        }
        break;

    case 'DELETE':
        $id = $data['id'] ?? null;

        if ($id) {
            $stmt = $conn->prepare("DELETE FROM comments WHERE id = ?");//tasks a comments
            $stmt->bind_param("ii", $id, $taskId);
            $stmt->execute();
            echo json_encode(['success' => true]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'ID no proporcionado']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}
