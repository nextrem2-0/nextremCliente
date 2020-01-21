let form;
let section;
function goToAccount(action) {
    $("#content").empty();
    form = new Form(action);
    $image = $("<div>", {
        "class": "form-image"
    }).append($("<img>", {
        "class": "form-image__img",
        "src": "assets/img/imgAccount.jpg"
    }));
    
    let components = [form, $image];
    if(action=="register"){
        components=[$image,form];
    }
    
    section = new Section("l-dual", components, null, action.toUpperCase());
    $("#content").append(section.draw());
    window.scrollTo(0, 0);
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
                    location.reload();
                }
            });
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
        error: function(){
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
            localStorage.removeItem('username');
            location.reload();
        }
    });
}
