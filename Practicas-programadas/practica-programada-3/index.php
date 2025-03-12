<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css.css">
    <title>Practica-programada-3</title>
</head>
<body>
   <h1> Informe de Transacciones</h1> 
   <form method="post">
   <h2>Detalle</h2>
        <input type="text" name="id" placeholder="ID" required>
        <input type="text" name="desc" placeholder="Descripción" required>
        <input type="number" step="0.01" name="monto" placeholder="Monto" required>
        <button type="submit">Generar</button>
   </form>
   <?php
   $transacciones = [];
   function registrarTransaccion($id, $desc, $monto) {
    global $transacciones;
        $transaccion = [
            "id" => $id,
            "desc" => $desc,
            "monto" => $monto
        ];
    array_push($transacciones, $transaccion);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $desc = $_POST['desc'];
    $monto = floatval($_POST['monto']);
    registrarTransaccion($id, $desc, $monto);
    generarEstadoDeCuenta();
}

function generarEstadoDeCuenta() {
    global $transacciones;
    $montoTotal = 0;
    echo "<h2>Estado de Cuenta</h2>";
    
    foreach ($transacciones as $transaccion) {
        $montoTotal += $transaccion['monto'];
    }
    
    
    $interes = $montoTotal * 0.026;
    $cashback = $montoTotal * 0.001;
    $montoFinal = $montoTotal + $interes - $cashback;
    
    echo "<p>Monto total: ₡".number_format($montoTotal,3,'.')."</p>";
    echo "<p>Intereses (2.6%): ₡".number_format($interes,3,'.')."</p>";
    echo "<p>Cashback (0.1%): ₡".number_format($cashback,3,'.')."</p>";
    echo "<p><strong>Monto final: ₡".number_format($montoFinal,3,'.')."</strong></p>";
    
    $archivo = fopen("estado_cuenta.txt", "w");
    fwrite($archivo, "Estado de Cuenta\n");
    foreach ($transacciones as $transaccion) {
        fwrite($archivo, "ID: {$transaccion['id']}\n");
        fwrite($archivo, "Descripcion: {$transaccion['desc']}\n");
        fwrite($archivo, "Monto: {$transaccion['monto']}\n");
    }
    fwrite($archivo, "\nMonto total de contado: $$montoTotal\n");
    fwrite($archivo, "Intereses (2.6%): ₡$interes\n");
    fwrite($archivo, "Cashback (0.1%): ₡$cashback\n");
    fwrite($archivo, "Monto final a pagar: ₡$montoFinal\n");
    fclose($archivo);
}
?>
</body>
</html>


