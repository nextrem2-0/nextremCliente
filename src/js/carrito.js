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

function verCarrito(eventos){
    $("#content").empty();
    let columnas=["Producto","Precio","Plazas","Subtotal",""];
    
    let listarProductos= new ListView(columnas,eventos,[{"class":"button button--shop","icon":"fa fa-angle-left","html": "◀  Seguir comprando"},{"class":"total-price"},{"class":"button button--buy","icon":"fa fa-angle-right","html": "Comprar  ▶"}]);
    let section = new Section("l-columns",[listarProductos],null,"l-columns--1-columns");
    $("#content").append(section.draw());

    window.scrollTo(0,0);
    $("#cart").hide();
}