let form;
let section;

function goToAccount(action){
    $("#content").empty();
    form=new Form(action);
    $image=$("<div>",{
        "class":"form-image",
        "style":"background-image:url('assets/img/rafting.jpg');"
    });
    let components=[form,$image];
    section=new Section("l-dual", components, action.toUpperCase());
    $("#content").append(section.draw()); 
}