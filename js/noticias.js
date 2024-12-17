class Noticias{
    constructor(){
        var body = document.querySelector('body'); 
        var message = document.createElement('p');
        if (window.File && window.FileReader && window.FileList && window.Blob) 
        {  
            //El navegador soporta el API File

            message.textContent = "Este navegador soporta el API File.";
        }
            else{
                message.textContent = "¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!";
            }    

            body.appendChild(message);
    }
    
    crearNoticia(linea,area) {
        var [titulo, cuerpo, autor] = linea.split('_');
        var article = document.createElement('article');
        var tituloElem = document.createElement('h3');
        var cuerpoElem = document.createElement('p');
        var autorElem = document.createElement('p');

        tituloElem.textContent = titulo;
        cuerpoElem.textContent = cuerpo;
        autorElem.textContent = "Autor: "+autor;


        article.appendChild(tituloElem);
        article.appendChild(autorElem);
        article.appendChild(cuerpoElem);
        area.appendChild(article); 
    }

    readInputFile(archivo){
        var bloc = archivo[0]; 
        var tipoTexto = /text.*/; 
        var area = document.querySelector('main'); 
        if(bloc.type.match(tipoTexto)){
            var lector = new FileReader(); 
            lector.onload = () => {
                var txt = lector.result; 

                var noticias = txt.split("\n"); 

                noticias.forEach((element) => {
                     this.crearNoticia(element, area);
                });
            }
            lector.readAsText(bloc); 
        }else{
            area.innerText = "Error con el formato del archivo"; 
        }
    }
    añadirNoticia(){
    var titulo = document.querySelector('input[type="text"]:nth-of-type(1)').value;
    var cuerpo = document.querySelector('input[type="text"]:nth-of-type(2)').value;
    var autor = document.querySelector('input[type="text"]:nth-of-type(3)').value;


    if(titulo.length == 0 || cuerpo.length == 0 ||autor.length == 0){
        return; 

    }

    var linea = `${titulo}_${cuerpo}_${autor}`;
    var area = document.querySelector('main'); 
    var nuevaNoticia = noti.crearNoticia(linea,area);

    }

}

var noti = new Noticias(); 