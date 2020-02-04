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
    cargarElementos();
    datosPerfil();

    $layout.append($item1);

    $("#content").append($layout);
    window.scrollTo(0, 0);
    $("#cart").hide();
}

function cargarElementos() {
    if (Array.isArray(listaElementosPerfil) && listaElementosPerfil.length) {

    } else {
        let $imgPerfil = $("<div>", {
            "class": "perfil-img"
        }).append($("<img>", {
            "src": rutaPublic + 'storage/avatars/' + localStorage.getItem('avatar')
        }));

        let $contentPerfil = $("<div>", {
            "class": "perfil-content"
        });

        let $gestionPerfil = $("<div>", {
            "class": "perfil-gestion"
        }).append(
            $("<div>", {
                "class": "perfil-gestion__btn perfil-gestion__btn--eventos",
                "html": "Mis eventos"
            }).on("click", function () {
                cargarMisEventos();
            }),
            $("<div>", {
                "class": "perfil-gestion__btn perfil-gestion__btn--editar",
                "html": "Editar"
            }).on("click", function () {
                datosPerfil();
            }),
            $("<div>", {
                "class": "perfil-gestion__btn perfil-gestion__btn--logout",
                "html": "Cerrar sesión"
            }).on("click", logoutAction),
        );

        let $tituloPerfil = $("<div>", {
            "class": "perfil-titulo",
            "html": "Perfil " + localStorage.getItem('username')
        });

        listaElementosPerfil.push($imgPerfil, $gestionPerfil, $tituloPerfil, $contentPerfil);
    }
    s1 = new Section("l-perfil", listaElementosPerfil, null, "c-section--perfil");
    $item1.append(s1.draw());
}

function cargarElementosPerfil(usuario) {
    deleteContent();
    $(".perfil-content").css("width", "90%");

    $(".perfil-content").append(
        $('<input>', {
            "class": "perfil-content__info perfil-content__info--nombre",
            "disabled": true,
            "value": usuario.username
        }),
        $('<input>', {
            "class": "perfil-content__info perfil-content__info--email",
            "disabled": true,
            "value": usuario.email
        }),
        $('<input>', {
            "type": "password",
            "class": "perfil-content__info perfil-content__info--password",
            "disabled": true,
            "placeholder": "Old password"
        }),
        $('<input>', {
            "type": "password",
            "class": "perfil-content__info perfil-content__info--newPassword",
            "disabled": true,
            "placeholder": "New password"
        }),
        $('<div>', {
            "class": "perfil-content__editar"
        }).append(
            $("<i>", {
                "class": "fas fa-user-edit"
            })
        ).on("click", function () {
            activarEditar();
        })
    )

    let $botonesPerfil = $("<div>", {
        "class": "perfil-botones"
    }).append(
        $('<div>', {
            "class": "perfil-botones__btn perfil-botones__btn--acept",
            "html": "Aceptar"
        }).on("click", function () {
            guardarCambios(usuario);
        }),
        $('<div>', {
            "class": "perfil-botones__btn perfil-botones__btn--cancel",
            "html": "Cancelar"
        }).on("click", function () {
            cerrarEditar(usuario);
        })
    ).css('display', 'none');

    $(".perfil-content").append($botonesPerfil);
}


function cerrarEditar(usuario) {
    $(".perfil-content__info").css("padding", "2%");

    let $nombre = $(".perfil-content__info--nombre");
    let $email = $(".perfil-content__info--email");
    let $password = $(".perfil-content__info--password");
    let $newPassword = $(".perfil-content__info--newPassword");

    $(".perfil-botones").css('display', 'none');
    $nombre.attr("disabled", true);
    $email.attr("disabled", true);
    $password.attr("disabled", true);
    $newPassword.attr("disabled", true);

    $nombre.val(usuario.username);
    $email.val(usuario.email);
    $password.val("");
    $newPassword.val("");
}

function guardarCambios(usuario) {
    let $nombre = $(".perfil-content__info--nombre").val();
    let $email = $(".perfil-content__info--email").val();
    let $password = $(".perfil-content__info--password").val();
    let $newPassword = $(".perfil-content__info--newPassword").val();

    let $token = localStorage.getItem('user_token');
    console.log(localStorage.getItem('idUser'));

    console.log($token);
    $.ajax({
        url: rutaPublic + "editarPerfil",
        headers: { 'Authorization': 'Bearer ' + $token },
        data: { id: localStorage.getItem('idUser'), nombre: $nombre, email: $email, password: $password, newPassword: $newPassword },
        success: function (dataResult) {
            location.reload();
        },
        error: function () {
            let $not = new Notification("danger", "Error!", "No se han podido guardar los cambios");
            $("#notificaciones").append($not.draw());
        }
    });

}

function deleteContent() {
    $(".perfil-content").empty();
}

function activarEditar() {
    $(".perfil-content__info").css("padding", "1%");

    $(".perfil-content__info--nombre").attr("disabled", false);
    $(".perfil-content__info--email").attr("disabled", false);
    $(".perfil-content__info--password").attr("disabled", false);
    $(".perfil-content__info--newPassword").attr("disabled", false);
    $(".perfil-botones").css('display', 'flex');
}

function cargarMisEventos() {
    deleteContent();
    datosPerfilEventos();
}

function setEvents(eventos) {
    if (eventos.length == 0) {
        let $not = new Notification("warning", "Hey!", "Todavía no has comprado ningún evento");
        $("#notificaciones").append($not.draw());
        datosPerfil();
    } else {
        //$(".perfil-content").css("width", "100%");

        let columnas = ["Producto", "Precio", "Plazas", "Subtotal", "perfil"];
        let listarProductos = new ListView(null, columnas, eventos, [null, null, null], "c-listView--perfil");

        $(".perfil-content").append(listarProductos.draw());
    } 

}