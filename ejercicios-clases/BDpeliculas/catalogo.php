<?php
include 'configuracion/config.php';
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Películas</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Películas</h1>
        <div class="row">
            <?php
            try {
                $sql = "SELECT codigo_pelicula, titulo, foto, sinopsis, protagonistas, ano_estreno FROM movies";
                $stmt = $pdo->query($sql);

                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    echo '<div class="col-md-4 mb-4">';
                    echo '  <div class="card">';
                    echo '      <img src="' . htmlspecialchars($row['foto']) . '" class="card-img-top" alt="' . htmlspecialchars($row['titulo']) . '">';
                    echo '      <div class="card-body">';
                    echo '          <h2 class="card-title">' . htmlspecialchars($row['titulo']) . '</h3>';
                    echo '          <p class="card-text"><strong>Sinopsis:</strong> ' . htmlspecialchars($row['sinopsis']) . '</p>';
                    echo '          <p class="card-text"><strong>Protagonista:</strong> ' . htmlspecialchars($row['protagonistas']) . '</p>';
                    echo '          <p class="card-text"><strong>Año de Estreno:</strong> ' . htmlspecialchars($row['ano_estreno']) . '</p>';
                    echo '      </div>';
                    echo '  </div>';
                    echo '</div>';
                }
            
            } catch (PDOException $e) {
                echo '<div class="col-12 text-center">';
                echo '<p class="text-danger">Error al obtener los datos: ' . htmlspecialchars($e->getMessage()) . '</p>';
                echo '</div>';
            }
            ?>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>