class Memoria{
   constructor(){

    this.hasFlippedcard = false; 

    this.lockBoard = false; 
    this.firstCard = null; 
    this.secondCard = null; 
    
   
   this.elements = [
        {element : "RedBull", source : "multimedia/imagenes/Red_Bull_Racing_logo.svg"},
        {element : "RedBull", source : "multimedia/imagenes/Red_Bull_Racing_logo.svg"},        
        
        {element : "McLaren", source : "multimedia/imagenes/McLaren_Racing_logo.svg"}, 
        {element : "McLaren", source : "multimedia/imagenes/McLaren_Racing_logo.svg"}, 
        
        {element : "Alpine", source : "multimedia/imagenes/Alpine_F1_Team_2021_Logo.svg"},
        {element : "Alpine", source : "multimedia/imagenes/Alpine_F1_Team_2021_Logo.svg"},
        
        {element : "AstonMartin", source : "multimedia/imagenes/Aston_Martin_Aramco_Cognizant_F1.svg"},
        {element : "AstonMartin", source : "multimedia/imagenes/Aston_Martin_Aramco_Cognizant_F1.svg"},
        
        {element : "Ferrari", source : "multimedia/imagenes/Scuderia_Ferrari_Logo.svg"},
        {element : "Ferrari", source : "multimedia/imagenes/Scuderia_Ferrari_Logo.svg"},
        
        {element : "Mercedes", source : "multimedia/imagenes/Mercedes_AMG_Petronas_F1_Logo.svg"},
        {element : "Mercedes", source : "multimedia/imagenes/Mercedes_AMG_Petronas_F1_Logo.svg"}
    ]

    this.shuffleElements(); 
    this.createElements(); 
    this.addEventListeners(); 



}


    shuffleElements(){
        var listaMezclada = []
        var listaOriginal = this.elements.slice(); 
        while(listaOriginal.length > 0){
            let posicion = Math.floor(Math.random() * listaOriginal.length); 
            let auxiliar = listaOriginal.splice(posicion, 1)[0]; 
            listaMezclada.push(auxiliar); 
        }

        this.elements = listaMezclada; 
    }

    unflipCards(carta1, carta2){
        this.lockBoard = true; 
        setTimeout(() => {
            carta1.removeAttribute('data-state');
            carta2.removeAttribute('data-state'); 
        }, 500);
    
        
    }

    flipCard(carta){
        if(carta.getAttribute('data-state') == 'revealed')
            return; 
        if(this.lockBoard)
            return; 
        if(this.firstCard == carta)
            return; 

        carta.setAttribute('data-state', 'flip');

        if(this.hasFlippedcard){
            this.secondCard = carta; 
            this.checkForMarch(this.firstCard, this.secondCard); 
        }else{
            this.hasFlippedcard = true;     
            this.firstCard = carta; 
        }
    }
    disableCards(carta1, carta2){
        carta1.setAttribute('data-state','revealed');
        carta2.setAttribute('data-state','revealed'); 
    }
    resetBoard(){
        this.firstCard = null; 
        this.secondCard = null; 
        this.hasFlippedcard = false; 
        this.lockBoard = false; 
    }
    
    checkForMarch(carta1,carta2){
        if( this.firstCard.getAttribute('data-element') == this.secondCard.getAttribute('data-element')){
            console.log("iguales"); 
            this.disableCards(carta1,carta2); 
        }else{
            this.unflipCards(carta1,carta2) 
        }
        this.resetBoard(); 

    }

    createElements(){
        const tablero = document.querySelector('main'); 

        this.elements.forEach(aux => {
                const articulo = document.createElement("article"); 
                articulo.setAttribute("data-element", aux.element); 
                
                const img = document.createElement("img"); 
                img.src = aux.source;
                img.alt = aux.element; 
                
                const titu = document.createElement('h3'); 
                titu.textContent = "Tarjeta de memoria"; 
                
                articulo.appendChild(titu); 

                articulo.appendChild(img); 
                
            
                articulo.onclick = function() {
                
              
            };

            tablero.appendChild(articulo); 
        });
    }

    addEventListeners(){
        var cartas = document.querySelectorAll('article'); 

        cartas.forEach(carta => {
            carta.onclick =() => {
               const func = this.flipCard.bind(this,carta); 
               func(); 
            }
        }); 
    }


        
}




