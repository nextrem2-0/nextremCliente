class Cart{
    constructor(){
        this.listaEventos=new Array();
    }

    draw(){
        var self = this;
        let $base=$("<div>",{
            "class":"c-cart"
            
        });
        $base.append($("<div>",{
            "class":"c-cart__icon"
        }).append($("<i>",{
            "class":"fas fa-shopping-cart"
        })));

        $base.on("click",function(){
            let events="";
            let total=0;
            for(let ev of self.listaEventos){
                events+=ev.title+"<br>";
                total+=parseFloat(ev.price);
            }
            events+="<br>Total: "+total+"€";
            let modal=new Modal("Carrito",events);
        
            let $mod=modal.draw();
            $("#modal").append($mod);
            $mod.show();
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