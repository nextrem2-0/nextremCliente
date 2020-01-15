let form;
let section;
let drop;
function goToAccount(action) {
    $("#content").empty();
    form = new Form(action);
    $image=$("<div>",{
        "class":"form-image"
    }).append($("<img>",{
        "class":"form-image__img",
        "src": "assets/img/imgAccount.jpg"
    }));
    let components = [form, $image];
    section=new Section("l-dual", components, null, action.toUpperCase());
    $("#content").append(section.draw());
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
    //console.log(action);
    drop = new DropDown(action);
    console.log(drop);
    $(".dropdown").append(drop);

    $(function () {
        
        $('.dropdown').click(function () {

            var dropdowns = $(".c-dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }

        })
    }) 
}