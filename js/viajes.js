class Viajes {
    constructor() {
        this.longitud = null;
        this.latitud = null;
        this.precision = null;
        this.altitud = null;
        this.precisionAltitud = null;
        this.rumbo = null;
        this.velocidad = null;
        this.API = "AIzaSyBe5XJXQlR3GEcw181_kq5vrdq301GTIgI";
    }

    solicitarUbicacion() {
        var boton = document.querySelector("main > button");
        boton.setAttribute('hidden', ''); 
        navigator.geolocation.getCurrentPosition(
            this.getPosicion.bind(this),
            this.verErrores.bind(this)
        );
    }

    getPosicion(posicion) {
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;
        this.mostrarMapaDinamico(this.latitud, this.longitud);
        this.mostrarMapaEstatico();
    }

    verErrores(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "El usuario no permite la petición de geolocalización";
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información de geolocalización no disponible";
                break;
            case error.TIMEOUT:
                this.mensaje = "La petición de geolocalización ha caducado";
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido";
                break;
        }
        this.mostrarMensajeError();
    }

    mostrarMensajeError() {
        const ubicacion = document.querySelector("main");
        ubicacion.innerHTML = `<p>${this.mensaje}</p>`;
    }

    mostrarMapaEstatico() {
        var ubicacion = document.querySelector('main');
        var apiKey = "&key=" + this.API;
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom = "&zoom=15";
        var tamaño = "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false";
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        var imgMapa = document.createElement('img');
        imgMapa.src = this.imagenMapa;
        imgMapa.alt = "Mapa estático de google en tu zona";
        ubicacion.appendChild(imgMapa);
    }

    mostrarMapaDinamico(latitud, longitud) {
        if (isNaN(latitud) || isNaN(longitud)) {
            console.error("Las coordenadas no son válidas");
            return;
        }
        const divMapa = document.querySelector('div');
        const centro = { lat: latitud, lng: longitud };
        const mapaGeoposicionado = new google.maps.Map(divMapa, {
            zoom: 14,
            center: centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        const infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
    
            infoWindow.setPosition(centro);
            infoWindow.setContent('Localización encontrada');
            mapaGeoposicionado.setCenter(centro);
    
        } else {
            console.log("no se puede cargar el mapa dinamico")
        }
        infoWindow.open(mapaGeoposicionado);
    }

    introducirCarrusel(imagenes) {
        const slides = document.querySelectorAll("main + div + section > img");
        const nextSlide = document.querySelector("main + div + section > button:nth-of-type(1)");
    
        // current slide counter
        let curSlide = 9;
        // maximum number of slides
        let maxSlide = slides.length - 1;
    
        nextSlide.addEventListener("click", function () {

            if (curSlide === maxSlide) {
                curSlide = 0;
            } else {
                curSlide++;
            }

            slides.forEach((slide, indx) => {
                var trans = 100 * (indx - curSlide);
                $(slide).css('transform', 'translateX(' + trans + '%)')
            });
        });
    
        const prevSlide = document.querySelector("main + div + section > button:nth-of-type(2)");
    
        prevSlide.addEventListener("click", function () {
            if (curSlide === 0) {
                curSlide = maxSlide;
            } else {
                curSlide--;
            }
    
            //   move slide by 100%
            slides.forEach((slide, indx) => {
                var trans = 100 * (indx - curSlide);
                $(slide).css('transform', 'translateX(' + trans + '%)')
            });
        });
    }

}

const viaje = new Viajes();


