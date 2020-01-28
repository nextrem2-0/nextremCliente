let form;
let section;
function goToAccount(action) {
    $("#content").empty();
    form = new Form(action);
    let other = "register";
    let txt = "¿Ya tienes una cuenta?";
    if (action == other) {
        other = "Log In";
    } else {
        txt = "¿Aun no tienes una cuenta?";
    }

    let $changeButton = $("<div>", {
        "class": "button",
        "html": other,
        "id": "changebutton"
    });

    let $background = $("<img>", {
        "class": "c-textOver__background",
        "src": "assets/img/account.jpg"
    });
    let $top = $("<div>", {}).append([$("<div>", {
        "class": "text",
        "id": "textChange",
        "html": txt
    }), $changeButton]);

    let txtOver=new textOver($background,$top,"form");


    $changeButton.on("click", function () {
        form.changeSide();
        if (form.type == "register") {
            other = "Log In";
            txt = "¿Ya tienes una cuenta?";
        } else if (form.type == "login") {
            other = "Register";
            txt = "¿Aun no tienes una cuenta?";
        }
        $("#textChange").html(txt);
        $("#changebutton").html(other);
    });

    let components = [form, txtOver];
    if (action == "register") {
        components = [txtOver, form];
    }

    section = new Section("l-dual", components, null, "c-section--evento",action.toUpperCase());
    $("#content").append(section.draw());
    window.scrollTo(0, 0);
    $("#cart").hide();
}

function loginAction() {
    let $token;
    $.ajax({
        url: "http://localhost/nextrem/api/public/login",
        data: { login: $("#user_login").val(), password: $("#pass_login").val() },
        success: function (dataResult) {
            localStorage.setItem('user_token', dataResult.token);
            $token = localStorage.getItem('user_token');
            console.log($token);
            $.ajax({
                url: "http://localhost/nextrem/api/public/userLogged",
                headers: { 'Authorization': 'Bearer ' + $token },
                success: function (dataResult) {
                    localStorage.setItem('username', dataResult.user.username);
                    localStorage.setItem('idUser', dataResult.user.id);
                    console.log(dataResult);
                    
                    cargarDatosPerfil(dataResult);
                    location.reload();
                }
            });
        },
        error(){
            let $not = new Notification("danger", "Error!", "Usuario o contraseña erroneo");
            $("#notificaciones").append($not.draw());
            limpiarCampos();
        }
    });
}

function registerAction() {
    var boolBusiness = $("#cbIsbusiness:checkbox:checked").length > 0 == true ? 1 : 0;
    $.ajax({
        url: "http://localhost/nextrem/api/public/register",
        data: { isbusiness: boolBusiness, username: $("#user").val(), email: $("#email").val(), password: $("#pass_register").val(), password_confirmation: $("#pass_confirm_register").val() },
        headers: { 'Content-Type': 'application/json' },
        success: function (dataResult) {
            localStorage.setItem('user_token', dataResult.token);
            localStorage.setItem('username', dataResult.user.username);
            location.reload();
        },
        error: function () {
            let $not = new Notification("danger", "Error!", "No se ha podido registrar");
            $("#notificaciones").append($not.draw());
        }
    });

}

function logoutAction() {
    let $token = localStorage.getItem('user_token');
    $.ajax({
        url: "http://localhost/nextrem/api/public/logout",
        data: { api_token: $token },
        headers: { 'Authorization': 'Bearer ' + $token },
        success: function () {
            localStorage.removeItem('user_token');
            localStorage.removeItem('idUser');
            localStorage.removeItem('username');
            location.reload();
        }
    });
}

function notificacionBienvenida() {
    let $not = new Notification("success", "Bienvenido!", "Descubre tu próximo reto " + localStorage.getItem('username'));
    $("#notificaciones").append($not.draw());
}

function limpiarCampos(){
    $("#user_login").val("");
    $("#pass_login").val("");

    $("#user_login").css("border-color", "red");
    $("#pass_login").css("border-color", "red");
    $("#user_login").on("click",function(){
        $("#user_login").css("border-color", "#b9b9b9");
    });
    $("#pass_login").on("click",function(){
        $("#pass_login").css("border-color", "#b9b9b9");
    })
}