class Cart{
    constructor(){
        this.listaEventos=new Array();
    }

    draw(){
        let $base=$("<div>",{
            "class":"c-cart"
            
        });
        $base.append($("<div>",{
            "class":"c-cart__icon"
        }).append($("<i>",{
            "class":"fas fa-shopping-cart"
        })));

        $base.on("click",function(){
            verCarrito();
        });

        return $base;
    }

    anyadirEvento(event){
        this.listaEventos.push(event);
    }

    eliminarevento(event){
        this.listaEventos.splice(event);
    }
}