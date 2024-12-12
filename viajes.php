    <?php
    class Carrusel
    {
        public $capital;
        public $pais;
        public $imagenes;
        private $apiKey;
        public function __construct($capi, $nacion)
        {
            $this->capital = $capi;
            $this->pais = $nacion;
            $this->apiKey = "c117e00ce536a401";
            $this->imagenes = [];
        }


        function cargarFotos()
        {
            $url = 'http://api.flickr.com/services/feeds/photos_public.gne?';
            $url .= 'api_key=' . $this->apiKey;
            $url .= '&tags=' . $this->pais . "," . $this->capital;
            $url .= '&per_page=' . "10";
            $url .= '&format=json';
            $url .= '&nojsoncallback=1';

            $respuesta = file_get_contents($url);
            $json = json_decode($respuesta);

            if ($json == null) {
                echo "<h3>Error en el archivo JSON recibido</h3>";
            } else {
                echo "<h3> Carrusel de fotos </h3>";
                for ($i = 0; $i < 10; $i++) {
                    $titulo = $json->items[$i]->title;
                    $URLfoto = $json->items[$i]->media->m;
                    $aux =  array("_m.jpg" => "_b.jpg");
                    $URLfoto = strtr($URLfoto, $aux);

                    echo "<img alt='foto carrusel" . $titulo . "' src='" . $URLfoto . "' />";
                }
            }
        }
    }
    class Moneda
    {
        private $monedaLocal;
        private $monedaCambio;
        private $apiKey;
        public function __construct($siglasLocal, $siglasCambio)
        {
            $this->monedaLocal = $siglasLocal;
            $this->monedaCambio = $siglasCambio;
            $this->apiKey = "d5d059a3b1991f73a916d512b0cda62b";
        }

        function getTipoCambio()
        {
            $url = 'https://apilayer.net/api/live?';
            $url .= 'access_key=' . $this->apiKey;
            $url .= '&currencies=' . $this->monedaCambio;
            $url .= '&source=' . $this->monedaLocal;
            $url .= '&format=1';

            $respuesta = file_get_contents($url);
            $json = json_decode($respuesta);

            if ($json == null) {
                echo "<p> Fallo en la llamada para el cambio de la moneda </p>";
            }else{
                $variable = $this->monedaLocal . $this->monedaCambio; 
                $cambio = $json->quotes->$variable; 
                echo "<h3> Tipo de cambio </h2>"; 
                echo "<p> El tipo de cambio actual es de 1 euro por <strong>". $cambio . "</strong> dolares estadounidenses</p>"; 
                
            }
        }
    }

    ?>
<!DOCTYPE HTML>

<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Formula1-Viajes</title>
    <meta name="author" content="David Rodriguez Chanca" />
    <meta name="description" content="Meteorologia de la formula1" />
    <meta name="keywords" content="F1 Formula1 FormulaUno Viajes" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico" sizes="48x48" type="image/vnd.microsoft.icon" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="js/viajes.js"></script>
    
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1> <a href="index.html" title="Inicio"> F1 Desktop </a> </h1>
        <nav>
            <a href="index.html" title="index">Inicio</a>
            <a href="piloto.html" title="piloto">Piloto</a>
            <a href="noticias.html" title="noticias">Noticias</a>
            <a href="calendario.html" title="calendario">Calendario</a>
            <a href="meteorologia.html" title="meteorologia">Meteorologia</a>
            <a href="circuito.html" title="circuito">Circuito</a>
            <a class="active" href="viajes.php" title="viajes">Viajes</a>
            <a href="juegos.html" title="juegos">Juegos</a>
        </nav>
        
    </header>
    <p>Estas en: <a href="index.html" title="inicio">Inicio</a> >> Viajes</p>
    <h2>Viajes para ver los circuitos</h2>
    <main>       
        <button onclick="viaje.solicitarUbicacion()">Obtener mapas</button>
    </main>
    <div></div>
    <section>
        <?php
        $car = new Carrusel("Madrid", "Spain");
        $fotos = $car->cargarFotos();
        ?>
        <button> &gt; </button>
        <button> &lt; </button>
        
        <script>
            introducirCarrusel();
        </script>
    </section>
    <script async="" defer="" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBe5XJXQlR3GEcw181_kq5vrdq301GTIgI&amp;"></script>
    
    <article>
        <?php
            $m = new Moneda("EUR", "USD"); 
            $m->getTipoCambio(); 
        ?>
    </article>


</body>

</html>