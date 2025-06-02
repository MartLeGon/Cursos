-- Crear base de datos
CREATE DATABASE IF NOT EXISTS plataforma_cursos;
USE plataforma_cursos;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL
);

-- Tabla de cursos con campos adicionales
CREATE TABLE IF NOT EXISTS cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    precio_descuento DECIMAL(10,2) DEFAULT 15.00,
    descripcion TEXT,
    imagen VARCHAR(255) DEFAULT 'img/curso1.jpg'
);

