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

    let $not1 = new Notification("success", "Success!", "Cargado con exito");
    let $not2 = new Notification("danger", "Success!", "Cargado con exito");
    let $not3 = new Notification("info", "Success!", "Cargado con exito");
    let $not4 = new Notification("warning", "Success!", "Cargado con exito");
    
    $("#notificaciones").append($not1.draw());
    $("#notificaciones").append($not2.draw());
    $("#notificaciones").append($not3.draw());
    $("#notificaciones").append($not4.draw());
}

function cargarSportPins() {
    if (Array.isArray(listaSportPins) && listaSportPins.length) {

    } else {

        sports.forEach(function (sport) {
            listaSportPins.push(new SportPin(sport));
        });
    }
    s1 = new Section("l-sport", listaSportPins, null);
    $item1.append(s1.draw());

}

