class Circuito{
    constructor(){
        
    }


    leerArchivo(file){
        var archivo = file[0];
        var nombre = "Nombre archivo : "+archivo.name; 
        var tamaño = "Tamaño archivo : "+archivo.size + " (bytes) "; 
        var ultimaMod = "Ultima modificacion : "+ archivo.lastModifiedDate;
        $('article').empty();
        var datosMeta = `            <p>Nombre del archivo: ${archivo.name}</p>
            <p>Tamaño del archivo: ${archivo.size} bytes</p>
            <p>Tipo del archivo: ${archivo.type}</p>
            <p>Fecha de la última modificación: ${archivo.lastModifiedDate}</p>`; 

        $('article').before(datosMeta)
        
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) {
            var lector = new FileReader();
            lector.onload = function () {
                $('article').text(lector.result);
            };

            lector.readAsText(archivo);
        } else {
            $('article').append('<p>Error: ¡¡¡ Archivo no válido !!!</p>');
        }
    }

    kmlToMap(file){
        var mapDiv = $("div");
        mapDiv.removeAttr('hidden'); 
        var archivo = file[0]; 
        var lector = new FileReader();
        lector.onload = function (event) {
        var mapa = new google.maps.Map(mapDiv[0], { 
            center: {lat : 41.56466885543131, lng: 2.256699730797056 }, 
            zoom: 15,
            mapTypeId: 'satellite'
        });
        var lineaPuntos = []
        var coord = event.target.result.split('<coordinates>')[1]; 
        var soloCoordenadas = coord.split('</coordinates>')[0].split("\n"); 
        soloCoordenadas.forEach(element => {
            if(element.trim() === ""){

            }else{
                var l = element.split(','); 
                var lati = parseFloat(l[1]); 
                var lngi = parseFloat(l[0]); 
                var punto = {lat: lati, lng: lngi}; 
                lineaPuntos.push(punto); 
                var marcador = new  google.maps.Marker({
                    position : punto, 
                    map: mapa,
                    title: 'Coordernada'
        
                }); 
            }
        });
        var auxLinea = new google.maps.Polyline({
            path: lineaPuntos, 
            geodesic: true,
            strokeColor: '#FF0000', 
            strokeOpacity: 1.0, 
            strokeWeight: 2 
        })
        auxLinea.setMap(mapa); 
        

    };
    lector.readAsText(archivo);
    }


    leerSvg(files){
        var archivo = files[0];
        var lector = new FileReader(); 

        lector.onload = function(event) {
            var svg = event.target.result; 
            $('input').eq(2).after(svg); 
        }; 

        lector.readAsText(archivo); 
    }
}


var cir = new Circuito(); 