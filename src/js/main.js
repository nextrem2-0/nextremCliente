/* --------- VARIABLES --------- */
let listaCards = new Array();
let recomendedCards = new Array();
let listaDeportesCards = new Array();
let listaPins = new Array();
let listaSportPins = new Array();
let categories = new Array();
let imgSlider = new Array();
let imgBanner = new Array();
let sports = new Array();
let events = new Array();
let carrito = new Cart();

/* --------- FUNCIONES --------- */
$(".l-page").hide();
cargarInicio();

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

    $ban = $("<div>", {
        "class": "c-section__image"
    });

    $item3.append($ban);

    $item4 = $("<div>", {
        "class": "l-columns__item"
    });
    cargarPins();
    s2 = cargarCards("recomended");

    if (Array.isArray(categories) && categories.length && Array.isArray(sports) && sports.length) {

    } else {
        $.ajax({
            url: "http://localhost/nextrem/api/public/categorias",
            success: function (dataResult) {
                for (let key of dataResult) {
                    categories.push(key.nombre);
                }

                let footer = new Footer(categories);
                $("#footer").append(footer.draw());
                $.ajax({
                    url: "http://localhost/nextrem/api/public/deportes",
                    success: function (dataResult) {
                        for (let key of dataResult) {
                            sports.push(key);
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
        var rutaBanner = "http://localhost/nextrem/api" + imgBanner[0];
        $ban.css('background-image', 'url(' + rutaBanner + ')');
        console.log(rutaBanner);
    } else {
        $.ajax({
            url: "http://localhost/nextrem/api/public/images",
            success: function (dataResult) {
                for (let key of dataResult) {
                    if (key.includes("slider")) {
                        imgSlider.push(key);
                    } else {
                        imgBanner.push(key);
                    }
                }

                var rutaBanner = "http://localhost/nextrem/api" + imgBanner[0];
                $ban.css('background-image', 'url(' + rutaBanner + ')');

                let slider = new Slider(imgSlider);
                $item1.append(slider.draw());
                $('.carousel').carousel({
                    interval: 5000,
                    "data-pause":false
                });

            }
        });
    }


    $item4.append(s2.draw());

    $layout.append($item1);
    $layout.append($item2);
    $layout.append($item3);
    $layout.append($item4);

    cargarCarrito();

    $("#content").append($layout);

    window.scrollTo(0,0);
}

function cargarPins() {
    if (Array.isArray(listaPins) && listaPins.length) {
        // array exists and is not empty   
        listaPins = [];
    }

    $.ajax({
        url: "http://localhost/nextrem/api/public/textInicio",
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

function cargarCarrito(){
    if(carrito instanceof Cart){
        if($("#cart").children().length > 0){

        }else{
            $("#cart").append(carrito.draw());
        }
        
    }else{
        carrito= new Cart();
        $("#cart").append(carrito.draw());
    }
}