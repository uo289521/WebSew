class Semaforo {
        levels = [0.2, 0.5, 0.8]; 
        lights = 4; 
        unload_moment = null;
        clic_moment = null;
    
        constructor() {
            this.difAletorio();
            this.createStructure();
        }
    
        difAletorio() {
            const r = Math.floor(Math.random() * 3); 
            this.difficulty = this.levels[r];
        }

        createStructure(){
            const estructura = document.querySelector('main'); 

            const titulo = document.createElement('h2'); 
            titulo.textContent = "Juego de Semaforo"; 
            estructura.appendChild(titulo); 

            for( let i = 0; i < this.lights ; i++){
                const bloque = document.createElement('div'); 
                estructura.appendChild(bloque); 
            }

            const boton1 = document.createElement('button'); 
            const boton2 = document.createElement('button'); 

            boton1.textContent = "Arrancar semaforo";
            boton2.textContent = "Parar semaforo";
            
            boton2.disabled = true; 

            boton1.onclick = () => this.initSequence(boton1, boton2);  
            boton2.onclick = () => this.stopReaction(boton1 ,boton2); 

            estructura.appendChild(boton1); 
            estructura.appendChild(boton2); 

            
        }


        stopReaction(boton1, boton2){
            this.clic_moment = new Date(); 
            
            var difTiempo = this.clic_moment - this.unload_moment; 
            var texto = document.createElement('p'); 
            texto.textContent = "Su tiempo en la reacción es de: " + difTiempo + " millisegundos"; 
            const m = document.querySelector('main');
            
            var posible = m.querySelector('p'); 
            if(posible){
                posible.remove()
            }
            m.appendChild(texto)

            
            m.classList.remove('outload'); 
            m.classList.remove('load'); 
            
            boton2.disabled = true;
            boton1.disabled = false; 
            this.createRecordForm(); 

        }

        initSequence(boton, boton2){
            const m = document.querySelector('main'); 
            m.setAttribute('class','load'); 
            boton.disabled = true; 
            var tiempo  = 1500 +  (this.difficulty * 1000);
            setTimeout(() => { 
                this.unload_moment = new Date()
                this.endSequence(boton2); 
            }, tiempo)
        }

        endSequence(boton2){
            boton2.disabled = false; 
            const m = document.querySelector('main');             
            m.classList.add('outload'); 
        }

        createRecordForm(){
            var existeYa = $('main + section'); 
            if(existeYa){
                existeYa.remove();  
            }
            var nuevaSection = $(`<section> 
                                    <h3> Guardar tiempo </h3>
                                  </section>`)
            var ma = $('main'); 
            ma.after(nuevaSection); 

            var formula = $(`<form method="POST" action = "semaforo.php"> 
                 <label>Nombre: <input type="text" name="nombre" required placeholder = "Ponga su nombre"></label>
                 <label>Apellidos: <input type="text" name="apellidos" required placeholder = "Ponga sus apellidos"></label>
                 <label>Nivel: <input type="text" name="nivel" value="${this.difficulty}" readonly></label>
                 <label>Tiempo de reacción: <input type="text" name="tiempo" value="${(this.clic_moment - this.unload_moment)}" readonly></label>
                 <button type="submit"> Guardar</button>
                </form>`)

            nuevaSection.append(formula); 
        }


}

var sema = new Semaforo(); 

