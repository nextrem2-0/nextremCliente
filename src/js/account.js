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
    section = new Section("l-dual", components, null, action.toUpperCase());
    $("#content").append(section.draw());
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


function logoutAction() {
    let $token = localStorage.getItem('user_token');
    $.ajax({
        url: "http://localhost/nextrem/api/public/logout",
        data: { api_token: $token },
        headers: { 'Authorization': 'Bearer ' + $token },
        success: function () {
            localStorage.removeItem('user_token');
            location.reload();
        }
    });
}
function profileDropDown(action) {
    var dropdowns = $(".c-dropdown-content");
    dropdowns.toggleClass("show");
}