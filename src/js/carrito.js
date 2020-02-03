function cargarCarrito() {
    if (carrito instanceof Cart) {
        if ($("#cart").children().length > 0) {

        } else {
            $("#cart").append(carrito.draw());
        }

    } else {
        carrito = new Cart();
        $("#cart").append(carrito.draw());
    }
}

function verCarrito(eventos) {
    $("#content").empty();
    let columnas = ["Producto", "Precio", "Plazas", "Subtotal", ""];

    let listarProductos = new ListView(carrito, columnas, eventos, [{ "class": "button button--shop", "id": "seguirComprando", "html": "◀  Seguir comprando" }, { "class": "total-price" }, { "class": "button button--buy", "id": "tramitarPedido", "html": "Tramitar Pedido  ▶" }], "c-listView--carrito");
    let section = new Section("l-columns", [listarProductos], null, "c-section--carrito", "l-columns--1-columns");
    $("#content").append(section.draw());

    window.scrollTo(0, 0);
    $("#cart").hide();
}

function notificacionCompra() {
    let $not = new Notification("success", "Éxito!", "Has realizado el pedido");
    $("#notificaciones").append($not.draw());
}