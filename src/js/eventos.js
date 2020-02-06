let $load;

function cargarEventos() {
    deleteContenido();


    $layout = $("<div>", {
        "class": "l-columns--1-columns"
    });

    $item1 = $("<div>", {
        "class": "l-columns__item"
    });

    cargarCards("todas");

    $layout.append($item1);

    $("#content").append($layout);
    if ($load != 0) {
        $load = new PageLoad();
        $("#content").append($load.draw());
    }
    window.scrollTo(0, 0);
}

function cargarEventosDeporte(idDeporte) {
    deleteContenido();

    $layout = $("<div>", {
        "class": "l-columns--1-columns"
    });

    $item1 = $("<div>", {
        "class": "l-columns__item"
    });

    cargarCards(idDeporte);

    $layout.append($item1);

    $("#content").append($layout);

    $load = new PageLoad();
    $("#content").append($load.draw());
    window.scrollTo(0, 0);
}


function cargarCards(type) {
    let section;

    if (type == "recomended") {
        if (Array.isArray(recomendedCards) && recomendedCards.length) {
            recomendedCards = []
        }
            $.ajax({
                url: rutaPublic+"eventosRecomendados",
                success: function (dataResult) {
                    
                    for (let key of dataResult) {
                        var iconos = [];
                        let iconoDeporte = "";
                        let deporte = sports.filter(function (sport) {
                           if(sport.id == key.deporte_id){
                                iconoDeporte = sport.icono;
                                return sport;
                           } 
                        })[0];                        
                        
                        let iconoMaterial="fa fa-tools";
                        if(key.material==0){
                            iconoMaterial="fa fa-ban"
                        }

                        iconos.push(iconoDeporte, iconoMaterial);
                        recomendedCards.push(new Card(key.id,key.imagen, key.nombre, deporte.nombre, key.resumen,key.plazas_totales,key.plazas_ocupadas, null, key.precio, key.material, iconos, key.dificultad, deporte.nombre.toLowerCase()));
                    }
                   section = new Section("l-horizontal", recomendedCards, "RECOMENDADOS","c-section--recomendados", "l-horizontal--to-slide@mobile");
                    $item4.append(section.draw());

                },
                error: function (error) {
                    console.log(error);
                }
            });
                
    } else if (type == "todas") {
        if (Array.isArray(listaCards) && listaCards.length) {
            $load = 0;
            section = new Section("l-columns", listaCards, null, "c-section--eventos", "l-columns--3-columns", "l-columns--long");
            $item1.append(section.draw());
        } else {
            $.ajax({
                url: rutaPublic+"eventos",
                success: function (dataResult) {
                    

                    dataResult.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0)); 

                    for (let key of dataResult) {
                        var iconos = [];
                        let iconoDeporte = "";
                        let deporte = sports.filter(function (sport) {
                           if(sport.id == key.deporte_id){
                                iconoDeporte = sport.icono;
                                return sport;
                           } 
                        })[0];                        
                        
                        let iconoMaterial="fa fa-tools";
                        if(key.material==0){
                            iconoMaterial="fa fa-ban"
                        }

                        iconos.push(iconoDeporte, iconoMaterial);
                        listaCards.push(new Card(key.id,key.imagen, key.nombre, deporte.nombre, key.resumen,key.plazas_totales,key.plazas_ocupadas,null, key.precio, key.material, iconos, key.dificultad, deporte.nombre.toLowerCase()));

                    }
                    section = new Section("l-columns", listaCards, null,"c-section--eventos", "l-columns--3-columns", "l-columns--long","l-columns--1-columns@mobile");
                    $item1.append(section.draw());

                    $load.removeLoader();
                },
                error: function (error) {
                    console.log(error);
                }
            });

        }

    } else if (typeof type == 'number') {
        if (Array.isArray(listaDeportesCards) && listaDeportesCards.length) {
            listaDeportesCards = [];
            $load = 0;
        }
        $.ajax({
            url: rutaPublic+"deportes/" + type + "/eventos",
            success: function (dataResult) {
                dataResult.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0)); 
                var iconos = ['fa fa-mountain', 'fa fa-users', 'fa fa-hiking'];

                for (let key of dataResult) {

                    let deporte = sports.filter(function (sport) {
                        return sport.id == key.deporte_id;
                    })[0];
                    let iconoMaterial="fa fa-tools";
                    if(key.material==0){
                        iconoMaterial="fa fa-ban"
                    }

                    listaDeportesCards.push(new Card(key.id,key.imagen, key.nombre, deporte.nombre, key.resumen,key.plazas_totales,key.plazas_ocupadas,null, key.precio, key.material, [deporte.icono,iconoMaterial], key.dificultad, deporte.nombre.toLowerCase()));

                }
                /* for (let key of dataResult) {
                    listaDeportesCards.push(new Card("evento3.jpg", key.nombre, "deporte", key.resumen, iconos, 3, 'buceo'));
                } */
                section = new Section("l-columns", listaDeportesCards, null, "c-section--evento", "l-columns--3-columns", "l-columns--long");
                $item1.append(section.draw());

                $load.removeLoader();
            }
        });


    }
    
    return section;
}