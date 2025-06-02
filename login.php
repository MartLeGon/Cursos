<?php
session_start(); // Iniciar sesión
include("conexion.php");

$usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];

// Buscar el usuario en la base de datos
$sql = "SELECT contrasena FROM usuarios WHERE usuario='$usuario'";
$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    $row = $resultado->fetch_assoc();
    // Verificar la contraseña
    if (password_verify($contrasena, $row['contrasena'])) {
        $_SESSION['usuario'] = $usuario;
        header("Location: main.html"); // Redirigir a la página principal
        exit();
    } else {
        echo "<script>alert('Contraseña incorrecta'); window.location.href = 'auth.html';</script>";
    }
} else {
    echo "<script>alert('Usuario no encontrado'); window.location.href = 'auth.html';</script>";
}

$conn->close();
?>
