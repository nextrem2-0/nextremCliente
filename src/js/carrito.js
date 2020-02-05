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


    if(localStorage.getItem('user_token') != null){
        let id=localStorage.getItem("idUser");
        $token = localStorage.getItem('user_token');
        $.ajax({
            url: rutaPublic+"/cargarCarrito",
            data: { "user_id":id },
            headers: { 'Authorization': 'Bearer ' + $token },
            success: function (dataResult) {
                let card;
                let arrayCards=new Array();
                
                for(let element of dataResult) {
                card = new Card(element.id, element.imagen, element.nombre, null, element.resumen, element.plazas_totales,element.plazas_ocupadas, 1, element.precio, element.material, null, element.dificultad);
                arrayCards.push(card);
                };
                carrito.cargarCarrito(arrayCards);
            },
            error(){
                let $not = new Notification("danger", "Error!", "No se han podido cargar tus articulos");
                $("#notificaciones").append($not.draw());
            }
        });
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