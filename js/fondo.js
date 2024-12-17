class Fondo{
    constructor(pais, capital, nombreCircuito){
        this.pais = pais; 
        this.capital = capital; 
        this.nombreCircuito = nombreCircuito; 
    }

    sacarfondo(){
        var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
            $.getJSON(flickrAPI, 
                    {
                        tags: fondo.nombreCircuito + "f1 ",
                        tagmode: "any",
                        format: "json", 
                    })
                .done(function(data) {
                        $.each(data.items, function(i,item ) {
                            var url =  item.media.m.replace("_m.jpg", "_b.jpg")
                            $('body')
                            .css({
                                "background-image" : "url("+url+")",
                                "background-size" : "cover", 

                            })
                            if ( i === 0 ) {
                                    return false;
                            }
                        });
                           
            });
    }
}

var fondo = new Fondo("Spain", "Madrid", "Circuit de Catalunya"); 