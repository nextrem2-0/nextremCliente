class Cart {
    constructor() {
        this.listaEventos = new Array();
        this.idEventosyPlazas = new Array();
        this.precioTotal = 0;
    }

    draw() {
        var self = this;
        let $base = $("<div>", {
            "class": "c-cart"
        });
        $base.append($("<div>", {
            "class": "c-cart__icon"
        }).append(
            $("<i>", {
                "class": "fas fa-shopping-cart"
            }),
            $("<div>", {
                "id": "numCart",
                "html": 0
            })
        ));

        $base.on("click", function () {
            // let events="";
            // let total=0;
            // for(let ev of self.listaEventos){
            //     events+=ev.title+"<br>";
            //     total+=parseFloat(ev.price);
            // }
            // events+="<br>Total: "+total+"€";
            // let modal=new Modal("Carrito",events,null,"Aceptar");

            // let $mod=modal.draw();
            // $("#modal").append($mod);
            // $mod.show();
            if (self.listaEventos.length == 0) {
                let $not = new Notification("info", "Hey!", "El carrito está vacio");
                $("#notificaciones").append($not.draw());
            } else {
                verCarrito(self.listaEventos);
            }

        });

        return $base;
    }

    anyadirEvento(event) {
        if (this.existeEvento(event.id) != true) {
            this.listaEventos.push(event);

            this.aumentarCarrito();
            this.getEventosyPlazas();
            this.getPrecioTotal();

            $.ajax({
                url: rutaPublic + "addCarrito",

                data: { idUsuario: localStorage.getItem('idUser'), precio: this.precioTotal, confirmado: 0, eventos: [{ "id_evento": event.id, "plazas": event.plazas }] },
                //data: datos,
                headers: { 'Content-Type': 'application/json' },
                success: function (dataResult) {
                    let $not = new Notification("success", "Completado!", "Añadido correctamente");
                    $("#notificaciones").append($not.draw());
                },
                error: function (error) {
                    let $not = new Notification("danger", "Error!", "No se ha podido guardar");
                    $("#notificaciones").append($not.draw());
                }
            });

        } else {
            let $not = new Notification("danger", "Error!", "Este evento ya está en el carrito");
            $("#notificaciones").append($not.draw());
        }
    }

    eliminarEvento(event) {
        var deleteElement = this.listaEventos.indexOf(event);
        this.listaEventos.splice(deleteElement, 1);
        this.restarCarrito();
    }

    eliminarTodosEvento() {
        this.listaEventos.length = 0;
        $("#numCart").html(0);
    }

    numEventos() {
        return this.listaEventos.length;
    }

    getEventosyPlazas() {
        this.idEventosyPlazas.length = 0;
        for (const event of this.listaEventos) {
            this.idEventosyPlazas.push({ "idEvento": event.id, "plazas": event.plazas });
        }
    }
    getPrecioTotal() {
        this.precioTotal = 0;
        for (const event of this.listaEventos) {
            this.precioTotal += parseFloat(event.price) * parseInt(event.plazas);
        }
    }

    existeEvento(id) {
        let existe = false;
        this.listaEventos.forEach(evento => {

            if (evento.id == id) {
                existe = true;
            }
        })
        return existe;
    }

    aumentarCarrito() {
        let nCarrito = $("#numCart").html();
        let nCarritoFloat = parseInt(nCarrito);
        nCarritoFloat++;

        $("#numCart").html(nCarritoFloat);
    }
    restarCarrito() {
        let nCarrito = $("#numCart").html();
        let nCarritoFloat = parseInt(nCarrito);
        nCarritoFloat--;

        $("#numCart").html(nCarritoFloat);
    }
    cargarCarrito(listaEvents){
        this.listaEventos=listaEvents;
        $("#numCart").html(this.listaEventos.length);
    }
}