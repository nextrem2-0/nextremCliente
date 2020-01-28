function cargarPerfil() {
    deleteContenido();

    $layout = $("<div>", {
        "class": "l-columns--1-columns"
    });

    $item1 = $("<div>", {
        "class": "l-columns__item"
    });

    $item1.append($("<div>", {
        "class": "c-section__image c-section__image--profile"
    }).append($("<img>", {
        "src": "assets/img/perfilBanner.jpg"
    })));
    cargarElementosPerfil();

    $layout.append($item1);

    $("#content").append($layout);
    window.scrollTo(0, 0);
}

function cargarElementosPerfil() {
    if (Array.isArray(listaElementosPerfil) && listaElementosPerfil.length) {

    } else {
        let $imgPerfil = $("<div>", {
            "class": "perfil-img"
        }).append($("<img>", {
            "src": "assets/img/avatar.png"
        }));

        let $contentPerfil = $("<div>", {
            "class": "perfil-content"
        }).append(
            $('<input>', {
                "class": "perfil-content__info perfil-content__info--nombre",
                "disabled": true,
                "value": localStorage.getItem('username')
            }),
            $('<input>', {
                "class": "perfil-content__info perfil-content__info--email",
                "disabled": true,
                "value": "email"
            }),
            $('<input>', {
                "class": "perfil-content__info perfil-content__info--password",
                "disabled": true,
                "value": "password"
            }),
        );

        let $botonesPerfil = $("<div>", {
            "class": "perfil-botones"
        }).append(
            $('<div>', {
                "class": "perfil-botones__btn perfil-botones__btn--acept",
                "html": "Aceptar"
            }),
            $('<div>', {
                "class": "perfil-botones__btn perfil-botones__btn--cancel",
                "html": "Cancelar"
            }).on("click", function () {
                cerrarEditar();
            })
        ).css('display', 'none');

        let $gestionPerfil = $("<div>", {
            "class": "perfil-gestion"
        }).append(
            $("<div>", {
                "class": "perfil-gestion__btn perfil-gestion__btn--eventos",
                "html": "Mis eventos"
            }),
            $("<div>", {
                "class": "perfil-gestion__btn perfil-gestion__btn--editar",
                "html": "Editar"
            }).on("click", function () {
                $(".perfil-content__info--nombre").attr("disabled", false);
                $(".perfil-content__info--email").attr("disabled", false);
                $(".perfil-content__info--password").attr("disabled", false);
                $botonesPerfil.css('display', 'flex');
            }),
            $("<div>", {
                "class": "perfil-gestion__btn perfil-gestion__btn--logout",
                "html": "Cerrar sesión"
            }).on("click",logoutAction),
        );

        let $tituloPerfil = $("<div>", {
            "class": "perfil-titulo",
            "html": "Perfil " + localStorage.getItem('username')
        });

        listaElementosPerfil.push($imgPerfil, $gestionPerfil, $tituloPerfil, $contentPerfil, $botonesPerfil);
    }
    s1 = new Section("l-perfil", listaElementosPerfil, null, "c-section--perfil");
    $item1.append(s1.draw());
}


function cerrarEditar() {
    $(".perfil-botones").css('display', 'none');
    $(".perfil-content__info--nombre").attr("disabled", true);
    $(".perfil-content__info--email").attr("disabled", true);
    $(".perfil-content__info--password").attr("disabled", true);
}