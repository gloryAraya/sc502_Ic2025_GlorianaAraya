<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>asteriscos</title>
</head>
<body>
    <?php
    $n = 6; 
    //la variable empieza con $
    for ($i = $n; $i > 0; $i--) {
        for ($j = 0; $j < $i; $j++) {//i menor que j
            echo "*";
        }
        echo "<br>";//<br> = \n
    }
    
    ?>

    </form>
    
</body>
</html>