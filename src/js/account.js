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

    section = new Section("l-dual", components, null, "c-section--account",action.toUpperCase());
    $("#content").append(section.draw());
    window.scrollTo(0, 0);
    $("#cart").hide();
}

function loginAction() {
    let $token;
    $.ajax({
        url: rutaPublic+"login",
        data: { login: $("#user_login").val(), password: $("#pass_login").val() },
        success: function (dataResult) {
            Storage.setItem('user_token', dataResult.token);
            $token = localStorage.getItem('user_token');
            console.log($token);
            $.ajax({
                url: rutaPublic+"userLogged",
                headers: { 'Authorization': 'Bearer ' + $token },
                success: function (dataResult) {
                    localStorage.setItem('username', dataResult.user.username);
                    localStorage.setItem('idUser', dataResult.user.id);
                    localStorage.setItem('avatar', dataResult.user.avatar);
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
    
    let $boolBusiness = $("#cbIsbusiness:checkbox:checked").length > 0 == true ? 1 : 0;
    //$("#fileRegister")[0].files[0];

    // var form = $('form')[0]; 
    var formData = new FormData();
    formData.append('isbusiness',$boolBusiness);
    formData.append('username',$("#user").val());
    formData.append('email',$("#email").val()); 
    formData.append('password',$("#pass_register").val());
    formData.append('password_confirmation',$("#pass_confirm_register").val());
    formData.append('avatar',$("#fileRegister")[0].files[0]);

    console.log(formData);
    
    
    $.ajax({
        url: rutaPublic+"register",
        //data: { isbusiness: $boolBusiness, username: $("#user").val(), email: $("#email").val(), password: $("#pass_register").val(), password_confirmation: $("#pass_confirm_register").val(), avatar: $("#fileRegister")[0].files[0] },
        type: 'post',
        dataType : 'json',
        contentType: false,
        processData: false,
        data: formData,
        success: function (dataResult) {
            localStorage.setItem('user_token', dataResult.token);
            localStorage.setItem('username', dataResult.user.username);
            localStorage.setItem('idUser', dataResult.user.id);
            localStorage.setItem('avatar', dataResult.user.avatar);
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
        url: rutaPublic+"logout",
        data: { api_token: $token },
        headers: { 'Authorization': 'Bearer ' + $token },
        success: function () {
            localStorage.removeItem('user_token');
            localStorage.removeItem('idUser');
            localStorage.removeItem('username');
            localStorage.removeItem('avatar');
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

function datosPerfil(){
    $token = localStorage.getItem('user_token');
    $.ajax({
        url: rutaPublic+"userLogged",
        headers: { 'Authorization': 'Bearer ' + $token },
        success: function (dataResult) { 
            cargarElementosPerfil(dataResult.user);
        }
    });
}

function datosPerfilEventos(){
    $token = localStorage.getItem('user_token');
    $id = localStorage.getItem('idUser');
    let arrayCards = new Array();
    $.ajax({
        url: rutaPublic+"user/" + $id + "/eventos",
        headers: { 'Authorization': 'Bearer ' + $token },
        success: function (dataResult) { 
            let card;
            dataResult.forEach(element => {
                card = new Card(element.id, element.imagen, element.nombre, null, element.resumen, element.plazas_totales,1, element.precio, element.material, null, element.dificultad);
                arrayCards.push(card);
            });
            setEvents(arrayCards);
        }
    });
}