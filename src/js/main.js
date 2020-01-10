
/* --------- VARIABLES --------- */
let listaCards = new Array();
let listaPins = new Array();
let listaSportPins = new Array();
let categories = new Array();
let imgSlider = new Array();
let imgBanner = new Array();
let sports = new Array();
let events = ["bbbbb", "bbbbb", "bbbbb", "bbbbb", "bbbbb"];




/* --------- FUNCIONES --------- */

$(".l-page").hide();

window.onload = function () {
    setTimeout(function () {
        finPaginaCarga();
    }, 1200);
};

cargarInicio();

function finPaginaCarga() {
    $(".c-load").hide("slow");
    setTimeout(function () {
        $(".l-page").show();
    }, 500);
}

function deleteContenido() {
    $("#content").empty();
}

function cargarInicio() {
    deleteContenido();

    $layout = $("<div>", {
        "class": "l-columns--1-column"
    });

    $item1 = $("<div>", {
        "class": "l-columns__item"
    });

    $item2 = $("<div>", {
        "class": "l-columns__item"
    });

    $item3 = $("<div>", {
        "class": "l-columns__item"
    });

    $item3.append($("<div>", {
        "class": "c-section__image"
    }));

    $item4 = $("<div>", {
        "class": "l-columns__item"
    });
    cargarPins();
    cargarCards();

    if (Array.isArray(categories) && categories.length && Array.isArray(sports) && sports.length) {

    } else {
        $.ajax({
            url: "http://localhost/nextrem/api/public/api/categoria",
            success: function (dataResult) {
                for (let key of dataResult) {
                    categories.push(key.nombre);
                }

                let footer = new Footer(categories);
                $("#footer").append(footer.draw());
                $.ajax({
                    url: "http://localhost/nextrem/api/public/api/getDeportes",
                    success: function (dataResult) {
                        for (let key of dataResult) {
                            sports.push(key.nombre);
                        }
                        let menu = new Menu(categories, sports, events);
                        $("#menu").append(menu.draw());
                        $(".c-submenu").hide();
                    }
                });
            }
        });
    }

    if (Array.isArray(imgSlider) && imgSlider.length) {
        let slider = new Slider(imgSlider);
        $item1.append(slider.draw());
        var rutaBanner = "http://localhost/nextrem/api/" + imgBanner[0];
        $(".c-section__image").css('background-image', 'url(' + rutaBanner + ')');
        console.log(rutaBanner);
    } else {
        $.ajax({
            url: "http://localhost/nextrem/api/public/api/getImages",
            success: function (dataResult) {
                for (let key of dataResult) {
                    if (key.includes("slider")) {
                        imgSlider.push(key);
                    } else {
                        imgBanner.push(key);
                    }
                }

                var rutaBanner = "http://localhost/nextrem/api/" + imgBanner[0];
                $(".c-section__image").css('background-image', 'url(' + rutaBanner + ')');

                let slider = new Slider(imgSlider);
                $item1.append(slider.draw());
                $('.carousel-item:first-child').addClass("carousel-item active");
            }
        });
    }

    $item4.append(s2.draw());

    $layout.append($item1);
    $layout.append($item2);
    $layout.append($item3);
    $layout.append($item4);



    $("#content").append($layout);


}

function cargarDeportes() {
    deleteContenido();

    $layout = $("<div>", {
        "class": "l-columns--1-column"
    });

    $item1 = $("<div>", {
        "class": "l-columns__item"
    });

    cargarSportPins();

    $layout.append($item1);

    $("#content").append($layout);
}



function cargarPins() {
    if (Array.isArray(listaPins) && listaPins.length) {
        // array exists and is not empty   
        listaPins = [];
    }

    $.ajax({
        url: "http://localhost/nextrem/api/public/api/textInicio",
        success: function (dataResult) {

            for (let key in dataResult) {

                listaPins.push(new InformationPin(dataResult[key].imagen, dataResult[key].titulo, dataResult[key].texto));

            }
            s1 = new Section("l-horizontal", listaPins, "¿QUÉ ES NEXTREM?");
            $item2.append(s1.draw());
        },
        error: function (error) {
            console.log(error);

        }
    });
}

function cargarCards() {
    if (Array.isArray(listaCards) && listaCards.length) {

    } else {
        var descrip = "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.";
        var iconos = ['fa fa-mountain', 'fa fa-users', 'fa fa-hiking'];
        listaCards.push(new Card("evento1.jpg", "Liga de escuelas", "Escalada", descrip, iconos, 3, 'escalada'));
        listaCards.push(new Card("evento2.jpg", "Torneo de Surf", "Surf", descrip, iconos, 2, 'surf'));
        listaCards.push(new Card("evento3.jpg", "Clases de ski", "Snow", descrip, iconos, 3, 'nieve'));
    }
    s2 = new Section("l-columns", listaCards, "RECOMENDADOS", "l-columns--3-columns");

}

function cargarSportPins() {
    if (Array.isArray(listaSportPins) && listaSportPins.length) {

    } else {
        for (let i = 0; i < sports.length; i++) {
            listaSportPins.push(new SportPin(sports[i]));
        }
    }
    s1 = new Section("l-sport", listaSportPins, null);
    $item1.append(s1.draw());

}
