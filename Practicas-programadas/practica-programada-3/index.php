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
   <form method="post"><!--POST: enviar datos internamente..GET: envia datos mediante URL-->
   <h2>Detalle</h2>
        <input type="text" name="desc" placeholder="Descripción" required>
        <input type="number" name="monto" placeholder="Monto" required>
        <button type="submit" name="generar">Generar</button>  
   </form>

   <?php
   session_start();
   
   $_SESSION['transacciones'] = [];//para no sobreescribir el txt

   if(!isset($_SESSION['transacciones'])) {//si no existe transacciones, crear transacciones
       $_SESSION['transacciones'] = [];
       $_SESSION['contador']='1';//contador de id
   }

   if (isset($_POST['generar'])){
    $id=$_SESSION['contador'];
    $desc= $_POST['desc'];
    $monto= $_POST['monto'];
    registrarTransaccion($id, $desc, $monto);//ingreasa los datos en function
   }

   function registrarTransaccion($id, $desc, $monto) {
      $global= $transaccion= [
           "id" => $id,
           "desc" => $desc,
           "monto" => $monto
       ];
       array_push($_SESSION['transacciones'], $transaccion);
       $_SESSION['contador']++;
   }

   function generarEstadoDeCuenta($transacciones){
    $montoTotal = 0;
        foreach ($transacciones as $transaccion) {
            $montoTotal += $transaccion['monto'];
        }

    $interes = $montoTotal * 0.026;
    $cashback = $montoTotal * 0.001;
    $montoFinal = $montoTotal + $interes - $cashback;

    $archivo = fopen("estadodecuenta.txt", "w");//w:write, r: read
    fwrite($archivo, "Estado de cuenta\n");
    foreach ($transacciones as $transaccion) {
        fwrite($archivo, "ID: {$transaccion['id']}\n");
        fwrite($archivo, "Descripcion: {$transaccion['desc']}\n");
        fwrite($archivo, "Monto: {$transaccion['monto']}\n");}

    fwrite($archivo, "Monto total de contado: $$montoTotal\n");
    fwrite($archivo, "Intereses (2.6%): ₡$interes\n");
    fwrite($archivo, "Cashback (0.1%): ₡$cashback\n");
    fwrite($archivo, "Monto final a pagar: ₡$montoFinal\n");
    fclose($archivo);

    return [
        "montoTotal" => $montoTotal,
        "interes" => $interes,
        "cashback" => $cashback,
        "montoFinal" => $montoFinal
    ];
   }

   $estadoDeCuenta = generarEstadoDeCuenta($_SESSION['transacciones']);//mostrar la transaccion
   ?>

    <h2>Estado de Cuenta</h2>
    <?php
    foreach ($_SESSION['transacciones'] as $transaccion) {//$_SESSION leer transacciones
        echo "<p>ID: {$transaccion['id']}</p>";
        echo "<p>Descripcion: {$transaccion['desc']}</p>";
        echo "<p>Monto Total: ₡{$transaccion['monto']}</p>";
    }
    ?>

    <p>Intereses (2.6%): ₡<?php echo number_format($estadoDeCuenta ["interes"],2);?></p>
    <p>Cashback (0.1%): ₡<?php echo number_format($estadoDeCuenta["cashback"],2);?></p>
    <p> Monto final: ₡<?php echo number_format($estadoDeCuenta["montoFinal"],2);?></p>
    
</body>
</html>