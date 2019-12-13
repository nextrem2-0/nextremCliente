window.onload = function () {
    cargarInicio();
}; 

/* --------- VARIABLES --------- */

/* --------- FUNCIONES --------- */
function deleteContenido() {
    $( "#content" ).empty();
}

function cargarInicio() {
    deleteContenido();

    $("#content").html(
    "<div class='l-columns--1-column'>" +
        "<div class='l-diagonal__item'>" +
            "<div class='c-slider'></div>" +
        "</div>" +

        "<div class='l-columns--1-column__item'>" +
            "<div class='c-section'> " +
                "<div class='c-section__title'>WHAT IS NEXTREM?</div>" +
                "<div class='c-section__content' id='pin' ></div>" +
                "<div class='c-section__mask'></div>" +
            "</div>" +
        "</div>" +
        
        "<div class='c-section__image'>" +
        "</div>" +

        "<div class='l-columns--1-column__item'>" +
            "<div class='c-section'> " +
                "<div class='c-section__title'>RECOMMENDED</div>" +
                "<div class='c-section__content' id='card'></div>" +
                "<div class='c-section__mask'></div>" +
            "</div>" +
        "</div>" +

    "</div>");
    
    cargarSlider();
    cargarPins();
    cargarCards();
}

function cargarPins(){
    $("#pin").html(
        "<div class='l-columns l-columns--3-columns'>" +
            "<div class='l-columns__item'>" +
                "<div class='c-information-pin'>" +
                    "<div class='c-information-pin__image'></div>" +
                    "<div class='c-information-pin__title'></div>" +
                    "<div class='c-information-pin__content'></div>" +
                "</div>" +
            "</div>" +
        "</div>"
    );
}

function cargarCards(){
    $("#card").html(
        "<div class='l-columns l-columns--3-columns'>" +
            "<div class='l-columns__item'>" +
                "<div class='c-card'>" +
                    "<div class='c-card__image'></div>" +
                    "<div class='c-card__title'></div>" +
                    "<div class='c-card__summary'></div>" +
                "</div>" +
            "</div>" +
        "</div>"
    );
}

function cargarSlider(){
    var imgSlider = ["banner2.jpg", "banner3.jpg", "banner4.jpg"];

    $('.c-slider').html(
        "<div id='carouselExampleControls' class='carousel slide' data-ride='carousel'>" +
            "<div class='carousel-inner'></div>" +

            "<a class='carousel-control-prev' href='#carouselExampleControls' role='button' data-slide='prev'>" +
                "<span class='carousel-control-prev-icon' aria-hidden='true'></span>" +
                "<span class='sr-only'>Previous</span>" +
            "</a>" +
            "<a class='carousel-control-next' href='#carouselExampleControls' role='button' data-slide='next'>" +
                "<span class='carousel-control-next-icon' aria-hidden='true'></span>" +
                "<span class='sr-only'>Next</span>" +
            "</a>" +
        "</div>"
    );

    imgSlider.forEach(function (img) {
        $('.carousel-inner').append(
            "<div class='carousel-item'>" +
                "<img class='d-block w-100' src= assets/img/" + img + ">" +
            "</div>"
        );
    });

    $('.carousel-item:first-child').addClass("carousel-item active");
}