<?php
$host = "localhost";
$user = "root";         // o el usuario que estés usando
$password = "";         // la contraseña si tiene
$db = "plataforma_cursos";

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
