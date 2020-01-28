function cargarDeportes() {
    deleteContenido();

    $layout = $("<div>", {
        "class": "l-columns--1-columns"
    });

    $item1 = $("<div>", {
        "class": "l-columns__item"
    });

    cargarSportPins();

    $layout.append($item1);

    $("#content").append($layout);
    window.scrollTo(0,0);
}

function cargarSportPins() {
    if (Array.isArray(listaSportPins) && listaSportPins.length) {

    } else {

        sports.forEach(function (sport) {
            listaSportPins.push(new SportPin(sport));
        });
    }
    s1 = new Section("l-sport", listaSportPins, null,"c-section--evento");
    $item1.append(s1.draw());

}

