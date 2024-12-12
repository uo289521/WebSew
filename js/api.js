class Api{
    constructor(){
        this.initEvents();
        this.loadStrategy();
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

    simulateRace(){
    var vueltasInput = document.querySelector('section >input');
    var vueltas = parseInt(vueltasInput.value, 10);

    var zonaEstrategia = document.querySelector('main > article > p');
    var tipoNeumatico = zonaEstrategia.textContent.split(': ')[1]; 

    if (!tipoNeumatico) {
        alert('Selecciona un tipo de neumático.');
        return;
    }

    var tiempoVueltaBase = 0;
    if (tipoNeumatico === 'Blandos') {
        tiempoVueltaBase = 1.2; 
    } else if (tipoNeumatico === 'Medios') {
        tiempoVueltaBase = 1.5;
    } else if (tipoNeumatico === 'Duros') {
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
            alert('¡No abanadones una estrategia, es muy importante!');
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