<?php 
            class Record{
                public $server; 
                public $user; 
                public $pass; 
                public $dbname; 

                public function __construct() {
                    $this->server = "localhost"; 
                    $this->user = "DBUSER2024"; 
                    $this->pass = "DBPSWD2024"; 
                    $this->dbname = "records"; 
                }
                public function verificarYCrearDB() {
                    $db = new mysqli($this->server, $this->user, $this->pass);
            
                    if ($db->connect_error) {
                        exit("<h2>ERROR de conexión: " . $db->connect_error . "</h2>");
                    }
            
                    // Verificar si la base de datos existe
                    $resultado = $db->query("SHOW DATABASES LIKE '{$this->dbname}'");
                    if ($resultado->num_rows === 0) {
         
                        $db->query("CREATE DATABASE {$this->dbname}"); 
                            
                    }

                    $db->select_db($this->dbname);

                    $resultado = $db->query("SHOW TABLES LIKE 'registro'");
                    if ($resultado->num_rows === 0) {
                        // Crear la tabla 'registro'
                        $sql = "CREATE TABLE registro (
                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                    nombre VARCHAR(50) NOT NULL,
                                    apellidos VARCHAR(50) NOT NULL,
                                    nivel FLOAT NOT NULL,
                                    tiempo INT NOT NULL
                                )";
                        $db->query($sql); 

                    }
                $db->close();
                }

                public function mostrarMejores(){
                    $db = new mysqli($this->server, $this->user, $this->pass, $this-> dbname); 
                    $resultado = $db->query("select nombre,apellidos,tiempo from registro order by tiempo asc limit 10");
                    if($resultado->num_rows > 0){
                        echo "<section>"; 
                        echo "<h3>Los mejores resultados</h3>"; 
                        echo "<ol>"; 
                        while($row = $resultado->fetch_assoc()) {
                            echo "<li>". $row['nombre'] . " - " . $row['apellidos']." - ". $row['tiempo']."</li>";
                        }
                        echo "</ol>"; 
                        echo "</section>"; 
                    }else{
                        echo "<p>La tabla esta vacia </p>"; 
                    }
                    $db->close(); 
                }
            }

    if (count($_POST)>0) 
    {   
        $re = new Record(); 
        $re->verificarYCrearDB();
        $formularioPOST  = $_POST;
        try {

            $nombre = $formularioPOST["nombre"]; 
            $apellidos = $formularioPOST["apellidos"]; 
            $nivel = floatval($formularioPOST["nivel"]); 
            $tiempo = intval($formularioPOST["tiempo"]); 

            $db = new mysqli($re->server, $re->user, $re->pass, $re-> dbname); 
            if($db->connect_error) {
                exit ("<h2>ERROR de conexión:".$db->connect_error."</h2>");
            }
            $consultaPre = $db->prepare("INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?,?,?,?)");
            $consultaPre->bind_param('ssdi',
                                        $nombre,$apellidos, $nivel, $tiempo);

             $consultaPre->execute();
             $consultaPre->close();
             $db->close();
        
             
        }
        catch (Exception $e) {
            $resultado = "Error: " .$e->getMessage();
        }  
    }


        ?>
<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Formula1-Juegos</title>
    <meta name="author" content="David Rodriguez Chanca"/>
    <meta name ="description" content="Meteorologia de la formula1"/>
    <meta name ="keywords" content="F1 Formula1 FormulaUno Juegos"/>
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css"/>
    <link rel="stylesheet" type="text/css" href="estilo/layout.css"/>
    <link rel="stylesheet" type="text/css" href="estilo/semaforo.css"/>
    <link rel="icon" href="multimedia/imagenes/favicon.ico" sizes="48x48" type = "image/vnd.microsoft.icon"/>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
</head>

<body>

    <header>
        <h1> <a href="index.html" title="Inicio"> F1 Desktop </a> </h1>
        <nav>
            <a href="index.html" title="index">Inicio</a>
            <a href="piloto.html" title="piloto">Piloto</a>
            <a href="noticias.html" title="noticias">Noticias</a>
            <a href="calendario.html" title="calendario">Calendario</a>
            <a href="meteorologia.html" title="meteorologia">Meteorologia</a>
            <a href="circuito.html" title="circuito">Circuito</a>
            <a href="viajes.php" title="viajes">Viajes</a>
            <a class= "active" href="juegos.html" title="juegos">Juegos</a>
        </nav>
    </header>
    <p>Estas en: <a href="index.html" title="inicio">Inicio</a> >> <a href = "juegos.html" title ="Juegos">Juegos</a>>> Juego de Semaforo</p>
    <h2>Juegos sobre la Formula1</h2>
    <section>
        <h3>Menu de juegos:  </h3>
        <nav>
            <p> <a href= "memoria.html" title = "Juego memoria">Juego de memoria</a><p> 
            <p> <a href= "semaforo.php" title = "Juego semaforo">Juego del semaforo</a></p>
            <p> <a href= "api.html" title = "API">Estrategia circuitos (API)</a></p>
            <p> <a href = "php/api.php" title = "Simulador economico php"> Simulador economico php </a></p>
        </nav>     
    </section>
    
    <main>
        <script src = "js/semaforo.js"></script>       
    </main>

    <?php 
         if (count($_POST)>0) 
         {   
             $re = new Record(); 
             $re->mostrarMejores(); 
             $_POST = [];  
         }
    ?>
</body>