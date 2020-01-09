let form;
let section;

function goToAccount(action){
    $("#content").empty();
    form=new Form(action);
    let components=[form];
    section=new Section("l-columns", components, action.toUpperCase(), "l-columns--1-columns");
    $("#content").append(section.draw()); 
}