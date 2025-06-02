<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include 'conexion.php';

$sql = "SELECT * FROM cursos";
$result = mysqli_query($conn, $sql);

if (!$result) {
    die("Error en la consulta: " . mysqli_error($conn));
}

$cursos = [];

while ($row = mysqli_fetch_assoc($result)) {
    // Solo si no tienes el campo imagen en la BD
    if (!isset($row['imagen'])) {
        $row['imagen'] = 'img/curso1.jpg';
    }
    $cursos[] = $row;
}

header('Content-Type: application/json');
echo json_encode($cursos);
?>
