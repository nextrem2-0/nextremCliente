class Notification {

    constructor(mod, titulo, mensaje) {
        this.mod = "c-notification--" + mod;
        this.titulo = titulo;
        this.mensaje = mensaje;

        if (mod == "success") {
            this.icon = "far fa-thumbs-up";
        } else if (mod == "info") {
            this.icon = "fas fa-info-circle";
        } else if (mod == "warning") {
            this.icon = "fas fa-exclamation-triangle";
        } else if (mod == "danger") {
            this.icon = "fas fa-exclamation-circle";
        }
    }

    draw() {
        let $base = $("<div>", {
            "class": "c-notification " + this.mod
        });

        let $text = $("<div>", {
            "class": "c-notification__content"
        }).append(
            $("<i>", {
                "class": this.icon
            }),
            $("<div>", {
                "class": "title",
                "html": '&nbsp&nbsp' + this.titulo
            }),
            $("<div>", {
                "class": "body",
                "html": '&nbsp' + this.mensaje
            })
        );


        let $btn = $("<div>", {
            "class": "c-notification__btn"
        }).append(
            $("<i>", {
                "class": "fas fa-times"
            })
        );

        $btn.on("click", function () {
            $btn.parent().fadeOut(500, function () {
                $btn.parent().remove();
            });

        });

        $base.append($text);
        $base.append($btn);

        return $base;
    }

}
/* 
setTimeout(function () {
    if ($('#notification').children()) {
        $('#notification div:first-child').remove();
    }
}, 5000); */