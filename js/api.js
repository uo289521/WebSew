class Api{
    constructor(){
        this.initEvents();
        this.loadStrategy();
        this.initTouchEvents(); 
        this.touchedElement = null; // Elemento que se está tocando
        this.startX = 0; // Coordenada X inicial
        this.startY = 0; // Coordenada Y inicial
        this.elementStartX = 0; 
        this.elementStartY = 0; // Posición Y inicial del elemento
        if(localStorage.getItem('raceStrategy')){
            var aux = document.querySelector('section > button ')
            aux.disabled = false; 
        }
    }

    initEvents() {
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    }

    drop(event) {
        event.preventDefault();
    }

    dragStart(rueda) {
        rueda.dataTransfer.setData('text', rueda.target.alt);
    }

    handleDrop(event) {
        event.preventDefault();
        const tireType = event.dataTransfer.getData('text'); 
        const strategyZone = document.querySelector('main > article > p');
        strategyZone.textContent = `Has seleccionado neumáticos: ${tireType}`;
        var bot = document.querySelector('main > button')
        bot.disabled = false; 
    }
    handleTouchStart(event) {
        event.preventDefault();
        this.touchedElement = event.target; // Guardar el elemento tocado
        const rect = this.touchedElement.getBoundingClientRect(); // Obtener posición inicial del elemento

        // Guardar posición inicial del elemento y del toque
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
        this.elementStartX = rect.left;
        this.elementStartY = rect.top;

        // Aplicar estilos para mover
        this.touchedElement.style.position = 'absolute';
        this.touchedElement.style.zIndex = 1000;
        this.touchedElement.style.left = `${rect.left}px`;
        this.touchedElement.style.top = `${rect.top}px`;
    }
    handleTouchMove(event) {
        event.preventDefault();
        if (!this.touchedElement) return;

        // Calcular desplazamiento
        const deltaX = event.touches[0].clientX - this.startX;
        const deltaY = event.touches[0].clientY - this.startY;

        // Mover el elemento
        this.touchedElement.style.left = `${this.elementStartX + deltaX}px`;
        this.touchedElement.style.top = `${this.elementStartY + deltaY}px`;
    }
    
    
    handleTouchEnd(event) {
        event.preventDefault();
        if (!this.touchedElement) return;

        const touch = event.changedTouches[0];
        const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
        const expectedArticle = document.querySelector('main > article');

        if (dropTarget && dropTarget === expectedArticle) {
            const strategyZone = expectedArticle.querySelector('p');
            const tireType = this.touchedElement.alt; // Obtener el tipo de neumático
            strategyZone.textContent = `Has seleccionado neumáticos: ${tireType}`;
            const button = document.querySelector('main > button');
            button.disabled = false; // Habilitar el botón de simulación
        } else {
            // Restaurar posición inicial si no es una zona válida
            this.touchedElement.style.left = `${this.elementStartX}px`;
            this.touchedElement.style.top = `${this.elementStartY}px`;
        }

        // Limpiar estilos y referencia
        this.touchedElement.style.position = '';
        this.touchedElement.style.zIndex = '';
        this.touchedElement = null;
    }
    
    
    initTouchEvents() {
        const draggableElements = document.querySelectorAll('picture > img'); 
        draggableElements.forEach((element) => {
            console.log(element)
            element.addEventListener('touchstart', (event) => this.handleTouchStart(event));
            element.addEventListener('touchmove', (event) => this.handleTouchMove(event));
            element.addEventListener('touchend', (event) => this.handleTouchEnd(event));
        });
    }
    calcularParadasPits(vueltas, tipoNeumatico) {
        var paradasPits = 0;
    
        if (tipoNeumatico === 'Blandos') {
            paradasPits = Math.floor(vueltas / 15); 
        } else if (tipoNeumatico === 'Medios') {
            paradasPits = Math.floor(vueltas / 25); 
        } else if (tipoNeumatico === 'Duros') {
            paradasPits = Math.floor(vueltas / 35); 
        }
    
        return paradasPits;
    }
    generarMusica(volumen) {
        var ctx = new window.AudioContext();
        var gainNode = ctx.createGain();
        gainNode.gain.value = volumen;
        gainNode.connect(ctx.destination); 
    
        fetch('multimedia/audios/sonidoFormula.mp3')
            .then(data => data.arrayBuffer())
            .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
            .then(buffer => {
                var source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(gainNode); 
                source.start();
            })
    }
    
    simulateRace(){
    var vueltasInput = document.querySelector('section >input');
    var vueltas = parseInt(vueltasInput.value, 10);

    var zonaEstrategia = document.querySelector('main > article > p');
    var tipoNeumatico = zonaEstrategia.textContent.split(': ')[1]; 

    if (!tipoNeumatico) {
        return;
    }


    
    var tiempoVueltaBase = 0;
    if (tipoNeumatico === 'Blandos') {
        this.generarMusica(0.3)
        tiempoVueltaBase = 1.2; 
    } else if (tipoNeumatico === 'Medios') {
        this.generarMusica(0.6)

        tiempoVueltaBase = 1.5;
    } else if (tipoNeumatico === 'Duros') {
        this.generarMusica(1)

        tiempoVueltaBase = 1.8;
    }

    var tiempoTotalVueltas = tiempoVueltaBase * vueltas;


    var paradasPits = this.calcularParadasPits(vueltas, tipoNeumatico);
    var tiempoPits = paradasPits * 20; 


    var tiempo = tiempoTotalVueltas + tiempoPits;

  
    var elementoResultado = document.querySelector('section > article > p');

    elementoResultado.textContent = `Neumaticos: ${tipoNeumatico}, vueltas: ${vueltas}, paradas en pits: ${paradasPits}, tiempo total estimado: ${tiempo} minutos.`;
    this.saveStrategy( vueltas, tipoNeumatico, tiempo );

    var botonLimpiar = document.querySelector('section > button'); 
    botonLimpiar.disabled = false;
    }
    saveStrategy(vueltas, tipoNeumatico, tiempo) {
        var nombre = document.querySelector(`main > input`).value; 
        if(nombre){
            localStorage.setItem(nombre, `${vueltas},${tipoNeumatico},${tiempo}`);
        }
        localStorage.setItem('raceStrategy', `${vueltas},${tipoNeumatico},${tiempo}`);
        
    }
    loadStrategy() {
        var strategy = localStorage.getItem('raceStrategy');
    
        if (strategy) {
            var [vueltas, tipoNeumatico, tiempo] = strategy.split(',');
            var strategyZone = document.querySelector('main > article > p');
            strategyZone.textContent = `Has seleccionado neumáticos: ${tipoNeumatico}`;
            var resultElement = document.querySelector('section > article > p');
            resultElement.textContent = `Neumaticos: ${tipoNeumatico}, vueltas: ${vueltas}, paradas en pits: ${this.calcularParadasPits(vueltas, tipoNeumatico)}, tiempo total estimado: ${tiempo} minutos.`;

            var tituloResultado = document.querySelector('section > article > h2'); 
            tituloResultado.textContent = 'Analisis anterior'
        }
    }

    handleVisibilityChange() {
        if (document.visibilityState === 'hidden') {
            document.title = '⚠️ Estrategia en pausa ⚠️';
        }else{
            document.title = "Formula1-Juegos"
        }
    }

    limpiarMemoria(){
        localStorage.removeItem('raceStrategy'); 
        var tituloResultado = document.querySelector('section > article > h2'); 
        tituloResultado.textContent = 'Analisis'; 

        var analisisResultado = document.querySelector('section > article > p'); 
        analisisResultado.textContent  = "Aqui se mostrara el resultado de la simulacion"; 

        var zonaEstrategiaTexto = document.querySelector('main > article > p'); 
        zonaEstrategiaTexto.textContent = "Deberas arrastar aqui los neumaticos para escoger la estrategia"; 

    }

    cargarEstrategiaAntigua(){
        var nombreEstrategia = document.querySelector('h3 + p + input')
        var estrategia = localStorage.getItem(nombreEstrategia.value); 
        if (estrategia) {


            var [vueltas, tipoNeumatico, tiempo] = estrategia.split(',');
            var strategyZone = document.querySelector('main > article > p');
            strategyZone.textContent = `Has seleccionado neumáticos: ${tipoNeumatico}`;
            var resultElement = document.querySelector('section > article > p');
            resultElement.textContent = `Neumaticos: ${tipoNeumatico}, vueltas: ${vueltas}, paradas en pits: ${this.calcularParadasPits(vueltas, tipoNeumatico)}, tiempo total estimado: ${tiempo} minutos.`;

            var tituloResultado = document.querySelector('section > article > h2'); 
            tituloResultado.textContent = `Analisis ${nombreEstrategia.value}`
        }
    }
}


var p = new Api()