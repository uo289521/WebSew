class Api{
    constructor(){
        this.initEvents();
        this.loadStrategy();
        if(localStorage.getItem('raceStrategy')){
            var aux = document.querySelector('section + article  button ')
            aux.disabled = false; 
        }
        this.dragEnMoviles(); 
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
        const strategyZone = document.querySelector('main > p');
        strategyZone.textContent = `Has seleccionado neumáticos: ${tireType}`;
        var bot = document.querySelector('main > button')
        bot.disabled = false; 
    }
    dragEnMoviles() {
        var imgs = document.querySelectorAll('img'); 
        var dropZone = document.querySelector('main');

        var currentImg = null;
        var originalX = 0;
        var originalY = 0;

        imgs.forEach(img => {
            img.addEventListener('touchstart', (e) => {
                currentImg = e.target;
                originalX = currentImg.offsetLeft;
                originalY = currentImg.offsetTop;
            });

            img.addEventListener('touchmove', (e) => {
                e.preventDefault();             
            });
            img.addEventListener('touchend', (e) => {
                e.preventDefault();
                var finalTouch = e.changedTouches[0];
                var finalX = finalTouch.clientX;
                var finalY = finalTouch.clientY;

                var dropZoneRect = dropZone.getBoundingClientRect();
                if (finalX >= dropZoneRect.left && finalX <= dropZoneRect.right &&
                    finalY >= dropZoneRect.top && finalY <= dropZoneRect.bottom) {                   
                    this.handleMobileDrop(currentImg.alt);
                } 
                currentImg = null;
            });
        });
    }

    handleMobileDrop(tireType) {
        const strategyZone = document.querySelector('main > p');
        strategyZone.textContent = `Has seleccionado neumáticos: ${tireType}`;
        var bot = document.querySelector('main > button')
        bot.disabled = false; 
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
    var vueltasInput = document.querySelector('section > input');
    var vueltas = parseInt(vueltasInput.value, 10);

    var zonaEstrategia = document.querySelector('main > p');
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

  
    var elementoResultado = document.querySelector('section:last-of-type > p');

    elementoResultado.textContent = `Neumaticos: ${tipoNeumatico}, vueltas: ${vueltas}, paradas en pits: ${paradasPits}, tiempo total estimado: ${tiempo} minutos.`;
    this.saveStrategy( vueltas, tipoNeumatico, tiempo );


    var botonLimpiar = document.querySelector('section + article  button'); 
    botonLimpiar.disabled = false;
    }

    saveStrategy(vueltas, tipoNeumatico, tiempo) {
        let nombre = document.querySelector(`main > input`).value; 
        if(nombre){
            let tituloResultado = document.querySelector('section:last-of-type > h2'); 
            tituloResultado.textContent = `Analisis ${nombre}`
            localStorage.setItem(nombre, `${vueltas},${tipoNeumatico},${tiempo}`);
        }
        localStorage.setItem('raceStrategy', `${vueltas},${tipoNeumatico},${tiempo}`);
        
    }
    loadStrategy() {
        var strategy = localStorage.getItem('raceStrategy');
    
        if (strategy) {
            var [vueltas, tipoNeumatico, tiempo] = strategy.split(',');
            var strategyZone = document.querySelector('main > p');
            strategyZone.textContent = `Has seleccionado neumáticos: ${tipoNeumatico}`;
            var resultElement = document.querySelector('section:last-of-type > p');
            resultElement.textContent = `Neumaticos: ${tipoNeumatico}, vueltas: ${vueltas}, paradas en pits: ${this.calcularParadasPits(vueltas, tipoNeumatico)}, tiempo total estimado: ${tiempo} minutos.`;

            var tituloResultado = document.querySelector('section:last-of-type > h2'); 
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
        localStorage.clear(); 
        var tituloResultado = document.querySelector('section:last-of-type > h2'); 
        tituloResultado.textContent = 'Analisis'; 

        var analisisResultado = document.querySelector('section:last-of-type > p'); 
        analisisResultado.textContent  = "Aqui se mostrara el resultado de la simulacion"; 

        var zonaEstrategiaTexto = document.querySelector('main > p'); 
        zonaEstrategiaTexto.textContent = "Deberas arrastar aqui los neumaticos para escoger la estrategia"; 

    }

    cargarEstrategiaAntigua(){
        var nombreEstrategia = document.querySelector('section + article input'); 
        var estrategia = localStorage.getItem(nombreEstrategia.value); 
        if (estrategia) {
            var [vueltas, tipoNeumatico, tiempo] = estrategia.split(',');
            var strategyZone = document.querySelector('main > p');
            strategyZone.textContent = `Has seleccionado neumáticos: ${tipoNeumatico}`;
            var resultElement = document.querySelector('section:last-of-type > p');
            resultElement.textContent = `Neumaticos: ${tipoNeumatico}, vueltas: ${vueltas}, paradas en pits: ${this.calcularParadasPits(vueltas, tipoNeumatico)}, tiempo total estimado: ${tiempo} minutos.`;

            var tituloResultado = document.querySelector('section:last-of-type > h2'); 
            tituloResultado.textContent = `Analisis ${nombreEstrategia.value}`
        }
    }
}


var p = new Api()