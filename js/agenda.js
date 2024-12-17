class Agenda{
    constructor(url){
        this.url = url; 
    }

    crearEstructura(InfoCarreras){
        InfoCarreras.forEach(carrera => {
            const article = `
                <article>
                    <h3> <a href = ${carrera.url} title= Wikipedia target="_blank"> ${carrera.nombreCarrera} </a></h3>
                    <p><strong>Circuito:</strong> ${carrera.nombreCircuito}</p>
                    <p><strong>Coordenadas:</strong> ${carrera.latitud}, ${carrera.longitud}</p>
                    <p><strong>Fecha:</strong> ${carrera.fecha}</p>
                    <p><strong>Hora:</strong> ${carrera.hora || "No especificada"}</p>
                </article>
            `;
            $("main").append(article);
        });
    }
    contruirCarreras(){       
        if($("main").length > 0){
            $("main").empty(); 
        } 
        $.ajax({
            url: this.url, 
            method: "GET", 
            success: (datos) => {
                let InfoCarreras = []; 
                datos.MRData.RaceTable.Races.forEach(element => {
                    let nombreCarrera = element.raceName; 
                    let nombreCircuito = element.Circuit.circuitName; 
                    let latitud = element.Circuit.Location.lat; 
                    let longitud = element.Circuit.Location.long; 
                    let fecha = element.date; 
                    let hora = element.time.split("Z")[0]; 
                    let url = element.Circuit.url; 
                
                    InfoCarreras.push({nombreCarrera, nombreCircuito, latitud, longitud, fecha, hora,url}); 
                });
                
                this.crearEstructura(InfoCarreras); 
            },
            error : function () {console.log("Da un error"); }
           

        })
    }

}

var age = new Agenda("https://api.jolpi.ca/ergast/f1/current/"); 