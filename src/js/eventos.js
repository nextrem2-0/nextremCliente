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

        } else {
            var descrip = "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.";
            var iconos = ['fa fa-mountain', 'fa fa-users', 'fa fa-hiking'];
            recomendedCards.push(new Card(1000,"evento1.jpg", "Liga de escuelas", "Escalada", descrip,7,null, 12, 1, iconos, 3, 'escalada'));
            recomendedCards.push(new Card(2000,"evento2.jpg", "Torneo de Surf", "Surf", descrip,7,null, 15, 1, iconos, 2, 'surf'));
            recomendedCards.push(new Card(3000,"evento3.jpg", "Clases de Esqui", "Esqui", descrip,7,null, 10, 0, iconos, 3, 'esqui'));
        }
        section = new Section("l-horizontal", recomendedCards, "RECOMENDADOS","c-section--recomendados", "l-horizontal--to-rows@mobile");
    } else if (type == "todas") {
        if (Array.isArray(listaCards) && listaCards.length) {
            $load = 0;
            section = new Section("l-columns", listaCards, null, "c-section--evento", "l-columns--3-columns", "l-columns--long");
            $item1.append(section.draw());
        } else {
            $.ajax({
                url: "http://localhost/nextrem/api/public/eventos",
                success: function (dataResult) {
                    var iconos = ['fa fa-mountain', 'fa fa-users', 'fa fa-hiking'];

                    dataResult.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0)); 

                    for (let key of dataResult) {

                        let deporte = sports.filter(function (sport) {
                            return sport.id == key.deporte_id;
                        })[0];


                        listaCards.push(new Card(key.id,"evento3.jpg", key.nombre, deporte.nombre, key.resumen,key.capacidad,null, key.precio, key.material, iconos, key.dificultad, deporte.nombre.toLowerCase()));

                    }
                    section = new Section("l-columns", listaCards, null,"c-section--evento", "l-columns--3-columns", "l-columns--long","l-columns--1-columns@mobile");
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
            url: "http://localhost/nextrem/api/public/deportes/" + type + "/eventos",
            success: function (dataResult) {
                dataResult.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0)); 
                var iconos = ['fa fa-mountain', 'fa fa-users', 'fa fa-hiking'];

                for (let key of dataResult) {

                    let deporte = sports.filter(function (sport) {
                        return sport.id == key.deporte_id;
                    })[0];


                    listaDeportesCards.push(new Card(key.id,"evento3.jpg", key.nombre, deporte.nombre, key.resumen,key.capacidad,null, key.precio, key.material, iconos, key.dificultad, deporte.nombre.toLowerCase()));

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