
/* --------- VARIABLES --------- */
let listaCards;
let listaPins;
let categories;
let imgSlider;
let slider;
let sports;
let events;
 
$(".l-page").hide();

window.onload = function () {
    setTimeout(function () {
        finPaginaCarga();
    }, 1200);
};


/* --------- FUNCIONES --------- */
categories = new Array();
listaCards = new Array();
listaPins = new Array();
imgSlider = new Array();
sports = new Array();
events = ["bbbbb", "bbbbb", "bbbbb", "bbbbb", "bbbbb"];

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
                menu = new Menu(categories, sports, events);
                $("#menu").append(menu.draw());
                $(".c-submenu").hide();
            }
        });
    }
});

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

    $.ajax({
        url: "http://localhost/nextrem/api/public/api/getImages",
        success: function (dataResult) {
            for (let key of dataResult) {

                imgSlider.push(key);
            }
            cargarSlider();
            $item1.append(slider.draw());
            $('.carousel-item:first-child').addClass("carousel-item active");
        }
    });

    cargarPins();
    cargarCards();

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
    s2 = new Section("l-columns", listaCards, "RECOMMENDED", "l-columns--3-columns");
    $item4.append(s2.draw());

    $layout.append($item1);
    $layout.append($item2);
    $layout.append($item3);
    $layout.append($item4);



    $("#content").append($layout);

    
}

function cargarPins() {
    $.ajax({
        url: "http://localhost/nextrem/api/public/api/textInicio",
        success: function (dataResult) {

            for (let key in dataResult) {

                listaPins.push(new InformationPin(dataResult[key].imagen, dataResult[key].titulo, dataResult[key].texto));

            }
            s1 = new Section("l-horizontal", listaPins, "WHAT NEXTREM IS?");
            $item2.append(s1.draw());
        },
        error: function (error) {
            console.log(error);

        }
    });
}

function cargarCards() {
    var descrip = "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.";
    var iconos = ['fa fa-mountain', 'fa fa-users', 'fa fa-hiking'];
    listaCards.push(new Card("evento1.jpg", "Liga de escuelas", "Escalada", descrip, iconos, 3, 'escalada'));
    listaCards.push(new Card("evento2.jpg", "Torneo de Surf", "Surf", descrip, iconos, 2, 'surf'));
    listaCards.push(new Card("evento3.jpg", "Clases de ski", "Snow", descrip, iconos, 3, 'nieve'));

}

function cargarSlider() {
    slider = new Slider(imgSlider);
}