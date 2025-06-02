<?php
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = $_POST['usuario'];
    $contrasena = password_hash($_POST['contrasena'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $usuario, $contrasena);

    if ($stmt->execute()) {
        // Redirige al index después del registro exitoso
        header("Location: index.html");
        exit();
    } else {
        echo "Error al registrar: " . $conn->error;
    }
}
?>
