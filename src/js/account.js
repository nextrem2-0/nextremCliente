let form;
let section;

function goToAccount(action){
    $("#content").empty();
    form=new Form(action);
    $image=$("<div>",{
        "class":"form-image"
    }).append($("<img>",{
        "class":"form-image__img",
        "src": "assets/img/imgAccount.jpg"
    }));
    let components=[form,$image];
    section=new Section("l-dual", components, null, action.toUpperCase());
    $("#content").append(section.draw()); 
}