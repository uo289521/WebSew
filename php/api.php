    <?php
    class adminDb
    {
        public $server;
        public $user;
        public $pass;
        public $dbname;

        public function __construct()
        {
            $this->server = "localhost";
            $this->user = "DBUSER2024";
            $this->pass = "DBPSWD2024";
            $this->dbname = "aplicacionPhp";
        }

        public function crearTablas()
        {
            $db = new mysqli($this->server, $this->user, $this->pass);
            $sqlCreateDb = "CREATE DATABASE IF NOT EXISTS {$this->dbname}";
            $db->query($sqlCreateDb);
            $db->select_db($this->dbname);
            $tablas = [];
            $circuitoTable = "
                CREATE TABLE IF NOT EXISTS Circuito (
                    nombre VARCHAR(255) PRIMARY KEY, -- El nombre es clave primaria
                    n_vueltas INT NOT NULL
                )";
            $tablas[] = $circuitoTable;
            $empresaGasolinaTable = "
                CREATE TABLE IF NOT EXISTS Empresa_Venta_Gasolina (
                    nombre VARCHAR(255) PRIMARY KEY, -- El nombre es clave primaria
                    precio_por_litro DECIMAL(5, 2) NOT NULL
                )";
            $tablas[] = $empresaGasolinaTable;
            $escuderiaTable = "
                CREATE TABLE IF NOT EXISTS Escuderia (
                    nombre VARCHAR(255) PRIMARY KEY, -- El nombre es clave primaria
                    empresa_nombre VARCHAR(255) NOT NULL, -- Relación con la tabla Empresa_Venta_Gasolina
                           FOREIGN KEY (empresa_nombre) REFERENCES Empresa_Venta_Gasolina(nombre)
                )";
            $tablas[] = $escuderiaTable;
            $patrocinadorTable = "
                CREATE TABLE IF NOT EXISTS Patrocinador (
                    nombre VARCHAR(255) PRIMARY KEY, -- El nombre es clave primaria
                    monto_aportado DECIMAL(10, 2) NOT NULL,
                    escuderia_nombre VARCHAR(255) NOT NULL, -- Relación con la tabla Escuderia
                    FOREIGN KEY (escuderia_nombre) REFERENCES Escuderia(nombre)
                )";
            $tablas[] = $patrocinadorTable;
            $f1Table = "
                CREATE TABLE IF NOT EXISTS F1 (
                    modelo VARCHAR(255) PRIMARY KEY, -- El modelo es clave primaria
                    consumo_vuelta DECIMAL(5, 2) NOT NULL,
                    escuderia_nombre VARCHAR(255) NOT NULL, -- Relación con la tabla Escuderia
                    FOREIGN KEY (escuderia_nombre) REFERENCES Escuderia(nombre)
                )";
            $tablas[] = $f1Table;
            foreach ($tablas as $tabla) {
                $db->query($tabla);
                            
            }

            $db->close();
        }

        public function existeCircuito($nombre)
        {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            $sql = "SELECT 1 FROM Circuito WHERE nombre = ?";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("s", $nombre);
            $stmt->execute();
            $result = $stmt->get_result();
            $existe = $result->num_rows > 0;
            $stmt->close();
            $db->close();
            return $existe;
        }
        public function insertarEnCircuito($nombre, $n_vueltas)
        {
            if (!$this->existeCircuito($nombre)) {
                $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
                $sql = "INSERT INTO Circuito (nombre, n_vueltas) VALUES (?, ?)";
                $stmt = $db->prepare($sql);
                $stmt->bind_param("si", $nombre, $n_vueltas);
                $stmt->execute();
                $stmt->close();
                $db->close();
            }
        }
        public function existeEmpresaGasolina($nombre)
        {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            $sql = "SELECT 1 FROM Empresa_Venta_Gasolina WHERE nombre = ?";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("s", $nombre);
            $stmt->execute();
            $result = $stmt->get_result();
            $existe = $result->num_rows > 0;
            $stmt->close();
            $db->close();
            return $existe;
        }
        public function insertarEnEmpresaGasolina($nombre, $precio_por_litro)
        {
            if (!$this->existeEmpresaGasolina(($nombre))) {

                $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
                $sql = "INSERT INTO Empresa_Venta_Gasolina (nombre, precio_por_litro) VALUES (?, ?)";
                $stmt = $db->prepare($sql);
                $stmt->bind_param("sd", $nombre, $precio_por_litro);
                $stmt->execute();
                $stmt->close();
                $db->close();
            }
        }
        public function existeEscuderia($nombre)
        {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            $sql = "SELECT 1 FROM Escuderia WHERE nombre = ?";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("s", $nombre);
            $stmt->execute();
            $result = $stmt->get_result();
            $existe = $result->num_rows > 0;
            $stmt->close();
            $db->close();
            return $existe;
        }
        public function insertarEnEscuderia($nombre, $empresaNombre)
        {
            if (!$this->existeEscuderia(($nombre))) {

                $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
                $sql = "INSERT INTO Escuderia (nombre, empresa_nombre) VALUES (?, ?)";
                $stmt = $db->prepare($sql);
                $stmt->bind_param("ss", $nombre, $empresaNombre);
                $stmt->execute();
                $stmt->close();
                $db->close();
            }
        }
        public function existePatrocinador($nombre)
        {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            $sql = "SELECT 1 FROM Patrocinador WHERE nombre = ?";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("s", $nombre);
            $stmt->execute();
            $result = $stmt->get_result();
            $existe = $result->num_rows > 0;
            $stmt->close();
            $db->close();
            return $existe;
        }
        public function insertarEnPatrocinador($nombre, $montoAportado, $escuderiaNombre)
        {
            if (!$this->existePatrocinador($nombre)) {

                $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
                $sql = "INSERT INTO Patrocinador (nombre, monto_aportado, escuderia_nombre) VALUES (?, ?, ?)";
                $stmt = $db->prepare($sql);
                $stmt->bind_param("sds", $nombre, $montoAportado, $escuderiaNombre);
                $stmt->execute();
                $stmt->close();
                $db->close();
            }
        }

        public function existeF1($modelo)
        {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            $sql = "SELECT * FROM F1 WHERE modelo = ?";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("s", $modelo);
            $stmt->execute();
            $result = $stmt->get_result();
            $existe = $result->num_rows > 0;
            $stmt->close();
            $db->close();
            return $existe;
        }
        public function insertarEnF1($modelo, $consumoVuelta, $escuderiaNombre)
        {
            if (!$this->existeF1($modelo)) {

                $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
                $sql = "INSERT INTO F1 (modelo, consumo_vuelta, escuderia_nombre) VALUES (?, ?, ?)";
                $stmt = $db->prepare($sql);
                $stmt->bind_param("sds", $modelo, $consumoVuelta, $escuderiaNombre);
                $stmt->execute();
                $stmt->close();
                $db->close();
            }
        }


        public function insertarDatosDePrueba()
        {

            $this->insertarEnCircuito("Circuito de Mónaco", 78);
            $this->insertarEnCircuito("Silverstone", 52);

            $this->insertarEnEmpresaGasolina("Shell", 1.50);
            $this->insertarEnEmpresaGasolina("Petronas", 1.60);

            $this->insertarEnEscuderia("Ferrari", "Shell");
            $this->insertarEnEscuderia("Mercedes", "Petronas");

            $this->insertarEnPatrocinador("Philip Morris", 100, "Ferrari");
            $this->insertarEnPatrocinador("Petronas Sponsorship", 6000000, "Mercedes");


            $this->insertarEnF1("Ferrari SF21", 2.8, "Ferrari");
            $this->insertarEnF1("Mercedes W12", 2.7, "Mercedes");
            $this->insertarEnF1("Ferrari SF21", 2.8, "Ferrari");
            $this->insertarEnF1("Ferrari SF90", 3.0, "Ferrari");
            $this->insertarEnF1("Ferrari SF71H", 2.9, "Ferrari");
            $this->insertarEnF1("Ferrari SF70H", 2.7, "Ferrari");
            $this->insertarEnF1("Ferrari F2004", 2.5, "Ferrari");
            $this->insertarEnF1("Ferrari F2002", 2.6, "Ferrari");
        }
        private function getNumeroVueltas($nombreCircuito)
        {

            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            $sql = "SELECT n_vueltas from circuito where nombre = ?";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("s", $nombreCircuito);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $stmt->close();
                $db->close();
                return  $row['n_vueltas'];
            } else {
                echo "<p> no se ha encontrado ningun circuito con ese nombre";
                $stmt->close();
                $db->close();
                return -1; 
            }

        }
        private function getDineroEscuderia($nombreEscuderia)
        {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            $sql = "SELECT monto_aportado from patrocinador where escuderia_nombre = ?";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("s", $nombreEscuderia);
            $stmt->execute();
            $result = $stmt->get_result();
            $acumulador = 0.0;
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $acumulador +=  (float) $row['monto_aportado'];
                }
                $stmt->close();
                $db->close();
                return $acumulador;
            } else {
                echo "<p> no se ha encontrado ninguna escuderia con ese nombre " . $nombreEscuderia . "</p>";
                $stmt->close();
                $db->close();
                return -1; 
                
            }
            $stmt->close();
            $db->close();
            return $acumulador;
        }

        private function getPrecioLitroGasolina($nombreEscuderia)
        {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            $sql = "SELECT precio_por_litro from empresa_venta_gasolina where nombre = (select empresa_nombre from escuderia where escuderia.nombre = ?)";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("s", $nombreEscuderia);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $stmt->close();
                $db->close();
                return (float)$row["precio_por_litro"];
            } else {
                echo "<p> No se ha encontrada ninguan valor de empresas de gasolina para " . $nombreEscuderia;
                $stmt->close();
                $db->close();
                return -1; 
            }
        }
        private function obtenerBalance($numeroVueltas, $dineroEscuderia, $precioLitroGasolina, $nombreEscuderia)
        {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            $sql = "SELECT consumo_vuelta from f1 where escuderia_nombre = ?";
            $stmt = $db->prepare($sql);
            $stmt->bind_param("s", $nombreEscuderia);
            $stmt->execute();
            $acumulador = 0.0;
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $acumulador += (float)$row["consumo_vuelta"] * $numeroVueltas * $precioLitroGasolina;
                }
            } else {
                echo "<p> No se han encontrado formula1 asociados a la escuderia " . $nombreEscuderia . " </p>";
                return -1; 
            }

            return $dineroEscuderia - $acumulador;
        }
        public function esRentableEscuderiaEnCircuito($nombreCircuito, $nombreEscuderia)
        {
            echo "<article>"; 
            echo "<h3> Balance </h3>"; 
            $numeroVueltas = $this->getNumeroVueltas($nombreCircuito);
            if($numeroVueltas != -1){
                echo "<p> El numero de vueltas del circuito es de " . $numeroVueltas . ".</p>";
            }

            $dineroEscuderia = $this->getDineroEscuderia($nombreEscuderia);
            if($dineroEscuderia != -1){
                echo "<p> El presupuesto de " . $nombreEscuderia . " es de " . $dineroEscuderia . "€ .</p>";
            }

            $precioLitroGasolina = $this->getPrecioLitroGasolina($nombreEscuderia);
            if($dineroEscuderia != -1){
                echo "<p> el costo de la gasolina para" . $nombreEscuderia . " es de " . $precioLitroGasolina . "€</p>";     
            }


            $resultado = $this->obtenerBalance($numeroVueltas, $dineroEscuderia, $precioLitroGasolina, $nombreEscuderia);
            if($resultado != -1){
                echo "<p> El balance de la escuderia " . $nombreEscuderia . " en el circuito " . $nombreCircuito
                    . " es de <strong>" . $resultado."</strong></p>";

            }
                
             echo "</article>"; 
        }

        public function exportarCSV($tabla, $columnas, $nombreArchivo)
        {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            $sql = "SELECT * FROM $tabla";
            $result = $db->query($sql);

            // Limpiar salida previa
            ob_clean();

            // Cabeceras HTTP
            header('Content-Type: text/csv; charset=utf-8');
            header("Content-Disposition: attachment;filename={$nombreArchivo}.csv");


            $fp = fopen('php://output', 'w');

            fputcsv($fp, $columnas);

            // Escribir filas
            while ($fila = $result->fetch_assoc()) {
                $datos = [];
                foreach ($columnas as $columna) {
                    $datos[] = $fila[$columna];
                }
                fputcsv($fp, $datos);
            }

            fclose($fp);
            $db->close();
            exit();
        }
    }
        $adminphp = new adminDb();
        $adminphp->crearTablas();
        if (count($_POST) > 0) {
            if (isset($_POST['submitCircuito'])) {
                $archivo = $_FILES['circuito'];
                $fp = fopen($_FILES['circuito']['tmp_name'], 'rb');
                fgets($fp);

                while (($linea = fgets($fp)) !== false) {
                    $partes = explode(",", $linea);
                    $adminphp->insertarEnCircuito($partes[0], intval($partes[1]));
                }
                fclose($fp);
            }

            if (isset($_POST['submitEmpresaGasolina'])) {
                $archivo = $_FILES['empresaGasolina'];
                $fp = fopen($archivo['tmp_name'], 'rb');
                fgets($fp);

                while (($linea = fgets($fp)) !== false) {
                    $partes = explode(",", trim($linea));
                    $adminphp->insertarEnEmpresaGasolina($partes[0], floatval($partes[1]));
                }
                fclose($fp);
            }

            if (isset($_POST['submitEscuderia'])) {
                $archivo = $_FILES['escuderia'];
                $fp = fopen($archivo['tmp_name'], 'rb');
                fgets($fp);

                while (($linea = fgets($fp)) !== false) {
                    $partes = explode(",", trim($linea));
                    $adminphp->insertarEnEscuderia($partes[0], $partes[1]);
                }
                fclose($fp);
            }

            if (isset($_POST['submitPatrocinador'])) {
                $archivo = $_FILES['patrocinador'];
                $fp = fopen($archivo['tmp_name'], 'rb');
                fgets($fp);
                while (($linea = fgets($fp)) !== false) {
                    $partes = explode(",", trim($linea));
                    $adminphp->insertarEnPatrocinador($partes[0], floatval($partes[1]), $partes[2]);
                }
                fclose($fp);
            }

            if (isset($_POST['submitF1'])) {
                $archivo = $_FILES['f1'];
                $fp = fopen($archivo['tmp_name'], 'rb');
                fgets($fp);

                while (($linea = fgets($fp)) !== false) {
                    $partes = explode(",", trim($linea));
                    $adminphp->insertarEnF1($partes[0], floatval($partes[1]), $partes[2]);
                }
                fclose($fp);
            }

            if (isset($_POST['submitEscuderiaCsv'])) {
                $adminphp->exportarCSV('Escuderia', ['nombre', 'empresa_nombre'], 'escuderias');
            }

            if (isset($_POST['submitCircuitoCsv'])) {
                $adminphp->exportarCSV('Circuito', ['nombre', 'n_vueltas'], 'circuitos');
            }

            if (isset($_POST['submitEmpresaGasolinacsv'])) {
                $adminphp->exportarCSV('Empresa_Venta_Gasolina', ['nombre', 'precio_por_litro'], 'empresas_gasolina');
            }

            if (isset($_POST['submitPatrocinadorcsv'])) {
                $adminphp->exportarCSV('Patrocinador', ['nombre', 'monto_aportado', 'escuderia_nombre'], 'patrocinadores');
            }
            if (isset($_POST['submitCochesF1csv'])) {
                $adminphp->exportarCSV('F1', ['modelo', 'consumo_vuelta', 'escuderia_nombre'], 'f1');
            }
        }



        ?>
    <!DOCTYPE HTML>

    <html lang="es">

    <head>
        <!-- Datos que describen el documento -->
        <meta charset="UTF-8" />
        <title>Formula1-Juegos</title>
        <meta name="author" content="David Rodriguez Chanca" />
        <meta name="description" content="Meteorologia de la formula1" />
        <meta name="keywords" content="F1 Formula1 FormulaUno Juegos" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
        <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
        <link rel="stylesheet" type="text/css" href=api.css />
        <link rel="icon" href="../multimedia/imagenes/favicon.ico" sizes="48x48" type="image/vnd.microsoft.icon" />
        <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    </head>

    <body>

        <header>
            <h1> <a href="../index.html" title="Inicio"> F1 Desktop </a> </h1>
            <nav>
                <a href="../index.html" title="index">Inicio</a>
                <a href="../piloto.html" title="piloto">Piloto</a>
                <a href="../noticias.html" title="noticias">Noticias</a>
                <a href="../calendario.html" title="calendario">Calendario</a>
                <a href="../meteorologia.html" title="meteorologia">Meteorologia</a>
                <a href="../circuito.html" title="circuito">Circuito</a>
                <a href="../viajes.php" title="viajes">Viajes</a>
                <a class="active" href="../juegos.html" title="juegos">Juegos</a>
            </nav>
        </header>
        <p>Estas en: <a href="../index.html" title="inicio">Inicio</a> >> <a href="../juegos.html" title="Juegos">Juegos</a>> JuegoPHP</p>
        <h2>Juegos sobre la Formula1</h2>
    <section>
        <h3>Diferentes juegos de la Formula1: </h3>
        <nav>
            <p> <a href= "../memoria.html" title = "Juego memoria">Juego de memoria</a><p> 
            <p> <a href= "../semaforo.php" title = "Juego semaforo">Juego del semaforo</a></p>
            <p> <a href= "../api.html" title = "API">Estregia circuitos (API)</a></p>
            <p> <a href = "api.php" title = "Juego Php"> Juego php </a></p>
        </nav>     
    </section>
        <main>
            <section>
                <h2>Circuito</h2>
                <form method="POST" enctype='multipart/form-data'>
                    <label for="csvCircuitoLighthouse">Selecciona un archivo CSV de Circuitos:</label>
                    <input type='file' name='circuito' id = "csvCircuitoLighthouse"/>
                    <input type='submit' name='submitCircuito' value='Enviar' />
                </form>

                <form method="POST" enctype='multipart/form-data'>
                    <label for="csvCircuitoExpLighthouse">Exportar datos circuito en un csv</label>
                    <input type='submit' name='submitCircuitoCsv' value='Exportar' id = "csvCircuitoExpLighthouse"/>
                </form>

            </section>

            <section>
                <h2>Empresa de Gasolina</h2>
                <form method="POST" enctype='multipart/form-data'>
                    <label for="csvEmpresaGasolinaLighthouse">Selecciona un archivo CSV de Empresas de Gasolina:</label>
                    <input type='file' name='empresaGasolina' id="csvEmpresaGasolinaLighthouse" />
                    <input type='submit' name='submitEmpresaGasolina' value='Enviar' />
                </form>

                <form method="POST" enctype='multipart/form-data'>
                    <label for="csvEmpresaGasolinaExpLighthouse">Exportar datos empresa gasolina en un csv</label>
                    <input type='submit' name='submitEmpresaGasolinacsv' id = "csvEmpresaGasolinaExpLighthouse" value='Exportar' />
                </form>
            </section>

            <section>
                <h2>Escudería</h2>
                <form method="POST" enctype='multipart/form-data'>
                    <label for="csvEscuderiaLighthouse">Selecciona un archivo CSV de Escuderías:</label>
                    <input type='file' name='escuderia' id="csvEscuderiaLighthouse" />
                    <input type='submit' name='submitEscuderia' value='Enviar' />
                </form>

                <form method="POST" enctype='multipart/form-data'>
                    <label for="csvEscuderiaExpLighthouse">Exportar datos escuderia en un csv</label>
                    <input type='submit' name='submitEscuderiaCsv' value='Exportar' id = "csvEscuderiaExpLighthouse"/>
                </form>

            </section>

            <section>
                <h2>Patrocinador</h2>
                <form method="POST" enctype='multipart/form-data'>
                    <label for="csvPatrocinadorLighthouse">Selecciona un archivo CSV de Patrocinadores:</label>
                    <input type='file' name='patrocinador' id="csvPatrocinadorLighthouse" />
                    <input type='submit' name='submitPatrocinador' value='Enviar' />
                </form>

                <form method="POST" enctype='multipart/form-data'>
                    <label for="csvPatrocinadorLighthouseExp">Exportar datos patrocinadores en un csv</label>
                    <input type='submit' name='submitPatrocinadorcsv' value='Exportar' id = "csvPatrocinadorLighthouseExp"/>
                </form>
            </section>

            <section>
                <h2>Coche F1</h2>
                <form method="POST" enctype='multipart/form-data'>
                    <label for="csvF1Lighthouse">Selecciona un archivo CSV de Coches F1:</label>
                    <input type='file' name='f1' id="csvF1Lighthouse" />
                    <input type='submit' name='submitF1' value='Enviar' />
                </form>

                <form method="POST" enctype='multipart/form-data'>
                    <label for = "csvF1ExpLighthouse">Exportar datos coches F1 en un csv</label>
                    <input type='submit' name='submitCochesF1csv' value='Exportar' id = "csvF1ExpLighthouse"/>
                </form>
            </section>
        </main>
        <section>
            <h2>Verificar Rentabilidad</h2>
            <form method="POST">
                <label>Nombre del Circuito:</label>
                <input type="text"  name="nombreCircuito" placeholder="Ej: Silverstone    (Case Sensitive)" required>

                <label>Nombre de la escuderia:</label>
                <input type="text" name="nombreEmpresa" placeholder="Ej: Ferrari    (Case Sensitive)" required>

                <input type="submit" name="verificarRentabilidad" value="Verificar Rentabilidad">
            </form>
        </section>
        

        <?php
            if (count($_POST) > 0) {
                if (isset($_POST['verificarRentabilidad'])) {
                    $nombreCircuito = $_POST['nombreCircuito'];
                    $nombreEmpresa = $_POST['nombreEmpresa'];

                    $adminphp->esRentableEscuderiaEnCircuito($nombreCircuito,$nombreEmpresa); 
                }

            }

        ?>


    </body>
    </html>