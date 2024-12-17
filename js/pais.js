class Pais{
    constructor(nombre,capital, cantidadPoblacion){
            this.nombre = nombre; 
            this.capital = capital;  
            this.cantidadPoblacion = cantidadPoblacion; 
            this.nombreCircuitoF1 = null; 
            this.apiKey = "31387f8d8de1ebeff04c36d1f15bf7b4"; 
        }

    rellenar (nombreCircuitoF1, formaGobierno, latitud, longitud, religion){
        this.nombreCircuitoF1 = nombreCircuitoF1; 
        this.formaGobierno = formaGobierno; 
        this.latitud = latitud;
        this.longitud = longitud;  
        this.religion = religion; 
    }


    get nombrePais(){
        return "<p> "+this.nombre+" <p>"; 
    }

    informacionSecundaria() {
        return `
            <ul>
                <li>Circuito de F1: ${this.nombreCircuitoF1}</li>
                <li>Población: ${this.cantidadPoblacion}</li>
                <li>Forma de Gobierno: ${this.formaGobierno}</li>
                <li>Religión: ${this.religion}</li>
                <li>Coordenadas linea meta: ${this.latitud}, ${this.longitud}</li> 
            </ul>
        `;
    }

    construirUrl(){
        var aux = "https://api.openweathermap.org/data/2.5/forecast?lat="+this.latitud+"&lon="+this.longitud+"&appid="+this.apiKey+"&units=metric+&mode=xml&units=metric&lang=es"; 
        return aux; 
    }

    escribirCoordenadas(){
        var info = `<h2> Informacion del País </h2>`
        info += `<p> País:  ${this.nombre} </p> `; 
        info += `<p> Capital: ${this.capital} </p> `; 
        var lista = this.informacionSecundaria(); 
        window.document.write("<section>  "+info+"   "+lista+"</section >"); 
    }


    crearArticle(pronosticos){
        let main = $("main");
        if (main.length === 0) {
            main = $("<main>");
            $("body").append(main);
        }
        pronosticos.forEach(pronostico => { 
            const article = `
            <article>
                <h3>${pronostico.fecha}</h3>
                <p>Temperatura máxima: ${pronostico.temp_max}K</p>
                <p>Temperatura mínima: ${pronostico.temp_min}K</p>
                <p>Humedad: ${pronostico.humidity}%</p>
                <p>Lluvia: ${pronostico.rain}mm</p>
                <img src="https://openweathermap.org/img/wn/${pronostico.icon}.png" alt="Icono del clima">
            </article>
        `;
            
            $("main").append(article); 
        }); 

    }
    llamadaApi(){
        
      $.ajax({
           url : this.construirUrl(), 
           dataType: "xml", 
           method : "GET", 
           success :  (data) => {
                let pronotico5dias = [];
                let lastDay = "";
                $(data).find("time").each(function () {
                    const fecha = $(this).attr("from").split("T")[0];  
                    const hora = $(this).attr("from").split("T")[1].split(":")[0];
                    if (hora === "12" && fecha !== lastDay && pronotico5dias.length < 5) {
                        pronotico5dias.push({
                            fecha: fecha,
                            temp_max: $(this).find("temperature").attr("max"),
                            temp_min: $(this).find("temperature").attr("min"),
                            humidity: $(this).find("humidity").attr("value"),
                            icon: $(this).find("symbol").attr("var"),
                            rain: $(this).find("precipitation").attr("value") || 0  
                        });
                        lastDay = fecha;
                    }
                });
                this.crearArticle(pronotico5dias); 

           }
           
           , 
           error:function(){
            
           }
      })
    }
}

var p = new Pais("Spain", "Madrid","48797875"); 
p.rellenar("Circuit de Barcelona-Catalunya", "Monarquia parlamentaria","41.57","2.26","Cristianismo");  
