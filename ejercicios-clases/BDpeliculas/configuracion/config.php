<?php
$host='localhost';
$dbname='Peliculasbd';
$user='root';
$pass='';

try {
    $pdo = new PDO("mysql:host=$host;port=3307;dbname=$dbname", $user, $pass,);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error en la conexión: " . $e->getMessage());
}

?>