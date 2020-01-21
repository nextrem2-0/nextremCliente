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
    
    let listarProductos= new ListView(columnas,eventos,[{"class":"button--shop","icon":"fa fa-sopping-cart"},{"class":"total-price"},{"class":"button--buy","icon":"fa fa-sopping-cart"}]);
    let section = new Section("l-columns",[listarProductos],null,"l-columns--1-columns");
    $("#content").append(section.draw());
}