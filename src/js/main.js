/* --------- VARIABLES --------- */
let rutaApi = "http://api.nextrem.pve2.fpmislata.com";
//let rutaApi = "192.268.59.104/nextrem/api"; 
let rutaImages=rutaApi+"/storage/app/public/";
let rutaPublic = rutaApi+"/public/";
let listaCards = new Array();
let recomendedCards = new Array();
let listaDeportesCards = new Array();
let listaPins = new Array();
let listaSportPins = new Array();
let listaElementosPerfil = new Array();
let categories = new Array();
let imgSlider = new Array();
let imgBanner = new Array();
let sports = new Array();
let events = new Array();
let carrito = new Cart();
let numPeticiones = 3;
let numPeticionesHechas = 0;
let imgPerfilPorDefecto = "user.png";

/* --------- FUNCIONES --------- */
window.onload = function () {
    numPeticionesHechas = 0;
};
// document.addEventListener("scroll",function(eve){
//     console.log($(document).scrollTop());

//     if($(document).scrollTop()==0){
//         console.log("aaa");

//         $("html, body").animate({
//             scrollTop: 700
//         }, 10);
//     }
// });

$(".l-page").hide();
cargarInicio();

function deleteContenido() {
    $("#content").empty();
    $("#cart").show();
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

    if (Array.isArray(categories) && categories.length && Array.isArray(sports) && sports.length) {
        s2 = cargarCards("recomended");
    } else {
        $.ajax({
            url: rutaPublic + "categorias",
            success: function (dataResult) {
                for (let key of dataResult) {
                    categories.push(key.nombre);
                }

                let footer = new Footer(categories);
                $("#footer").append(footer.draw());
                $.ajax({
                    url: rutaPublic + "deportes",
                    success: function (dataResult) {
                        numPeticionesHechas++;
                        for (let key of dataResult) {
                            sports.push(key);
                        }
                        let menu = new Menu(categories, sports, events);
                        $("#menu").append(menu.draw());
                        $(".c-submenu").hide();
                        s2 = cargarCards("recomended");

                        comprobarPeticiones();
                    }
                });
            }
        });
    }

    if (Array.isArray(imgSlider) && imgSlider.length) {
        let slider = new Slider(imgSlider);
        let $btnMas = $("<div>", {
            "class": "button-saber-mas",
            "html": "Saber más"
        });

        $btnMas.on("click", function () {
            window.scrollTo({
                top: 700,
                behavior: "smooth"
            });
        });
        window.scroll({
            top: 2500,
            left: 0,
            behavior: 'smooth'
        });
        cargarPortadaMovil();
        let $over = $("<div>", {
            "class": "c-textOver__top--small"
        }).append([$("<img>", {
            "src": "assets/img/sloganOver.png",
            "class": "image-over-slider"
        }), $btnMas.append($("<i>", {
            "class": "fa fa-angle-down button-saber-mas__icon"
        }))]);
        let overSlider = new textOver(slider.draw(), $over);
        $item1.append(overSlider.draw());
        var rutaBanner = rutaImages + "/"+imgBanner[0];
        $ban.css('background-image', 'url(' + rutaBanner + ')');

    } else {
        $.ajax({
            url: rutaPublic + "images",
            success: function (dataResult) {
                numPeticionesHechas++;
                for (let key of dataResult) {
                    if (key.includes("slider")) {
                        imgSlider.push(key);
                    } else {
                        imgBanner.push(key);
                    }
                }

                var rutaBanner = rutaImages + "/"+imgBanner[0];
                $ban.css('background-image', 'url(' + rutaBanner + ')');

                let slider = new Slider(imgSlider);
                let $btnMas = $("<div>", {
                    "class": "button-saber-mas",
                    "html": "Saber más"
                });

                $btnMas.on("click", function () {
                    window.scrollTo(0, 700);
                });

                let $over = $("<div>", {
                    "class": "c-textOver__top--small"
                }).append([$("<img>", {
                    "src": "assets/img/sloganOver.png",
                    "class": "image-over-slider"
                }), $btnMas.append($("<i>", {
                    "class": "fa fa-angle-down button-saber-mas__icon"
                }))]);
                let overSlider = new textOver(slider.draw(), $over);
                $item1.append(overSlider.draw());
                $('.carousel').carousel({
                    interval: 5000,
                    "data-pause": false
                });
                comprobarPeticiones();
            }
        });
        cargarPortadaMovil();
    }


    $layout.append($item1);
    $layout.append($item2);
    $layout.append($item3);
    $layout.append($item4);

    cargarCarrito();

    $("#content").append($layout);

    window.scrollTo(0, 0);
}

function comprobarPeticiones() {
    if (numPeticiones == numPeticionesHechas) {
        finPaginaCarga();
    }
}

function cargarPins() {
    if (Array.isArray(listaPins) && listaPins.length) {
        // array exists and is not empty   
        listaPins = [];
    }

    $.ajax({
        url: rutaPublic + "textInicio",
        success: function (dataResult) {
            numPeticionesHechas++;
            for (let key in dataResult) {

                listaPins.push(new InformationPin(dataResult[key].imagen, dataResult[key].titulo, dataResult[key].texto));

            }
            s1 = new Section("l-horizontal", listaPins, "¿QUÉ ES NEXTREM?", null, "l-horizontal--to-rows@mobile");
            $item2.append(s1.draw());
            comprobarPeticiones();
        },
        error: function (error) {
            console.log(error);

        }
    });
}
function cargarPortadaMovil() {
    let $btnMas = $("<div>", {
        "class": "button-saber-mas",
        "html": "Saber más"
    });
    $btnMas.on("click", function () {
        window.scrollTo({
            top: 700,
            behavior: "smooth"
        });
    });
    let $background = $("<img>", {
        "src": "assets/img/fondoMovil.jpg"
    });
    let $over = $("<div>", {
        "class": "c-textOver__top--small"
    }).append([$("<div>", {
        "class": "c-textOver__image-container"
    }).append($("<img>", {
        "src": "assets/img/sloganOver.png",
        "class": "image-over-slider"
    })), $btnMas.append($("<i>", {
        "class": "fa fa-angle-down button-saber-mas__icon"
    }))]);
    let overMovil = new textOver($background, $over);
    let $portadaMovil = $("<div>", {
        "class": "c-portada-movil"
    });
    $portadaMovil.append(overMovil.draw());
    $item1.append($portadaMovil);
}
