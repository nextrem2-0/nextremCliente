
/* --------- VARIABLES --------- */
let listaCards;
let listaPins;
let categories;
let imgSlider;
let slider;

window.onload = function () {
    categories= new Array();
    listaCards=new Array();
    listaPins=new Array();
    imgSlider=new Array();

    $.ajax({
        url:"http://localhost/nextrem/api/public/api/categoria",
        success: function(dataResult){
            for (let key of dataResult) {
                categories.push(key.nombre);
            }
            menu=new Menu(categories);
            $("#menu").append(menu.draw());
        }
    });

    cargarInicio();
}; 


/* --------- FUNCIONES --------- */
function deleteContenido() {
    $( "#content" ).empty();
}

function cargarInicio() {
    deleteContenido();
    
    $.ajax({
        url:"http://localhost/nextrem/api/public/api/getImages",
        success: function(dataResult){
            for (let key of dataResult) {
                
                imgSlider.push(key);
            }
            cargarSlider();
            $item1.append(slider.draw());
            $('.carousel-item:first-child').addClass("carousel-item active");
        }
    });

    cargarPins();
    cargarCards();

    $layout=$("<div>",{
        "class":"l-columns--1-column"});
    
    $item1=$("<div>",{
        "class":"l-columns__item"
    });
    

    $item2=$("<div>",{
        "class":"l-columns__item"
    });

    $item3=$("<div>",{
        "class":"l-columns__item"
    });
    $item3.append($("<div>",{
        "class":"c-section__image"
    }));

    $item4=$("<div>",{
        "class":"l-columns__item"
    });
    s2=new Section("l-columns",listaCards,"RECOMMENDED","l-columns--3-columns");
    $item4.append(s2.draw());

    $layout.append($item1);
    $layout.append($item2);
    $layout.append($item3);
    $layout.append($item4);

    $("#footer").append($("<div>",{
        "class":"c-footer"
    }));

    $("#content").append($layout);

    
}

function cargarPins(){
    $.ajax({
        url:"http://localhost/nextrem/api/public/api/textInicio",
        success: function(dataResult){
                
            for (let key in dataResult) {
                
                listaPins.push(new InformationPin(dataResult[key].imagen,dataResult[key].titulo,dataResult[key].texto));
                
            }
            s1=new Section("l-horizontal",listaPins,"WHAT NEXTREM IS?");
            $item2.append(s1.draw());
        },
        error: function(error){
            console.log(error);
            
        }
    });
}

function cargarCards(){
    for(i=0;i<3;i++){
        listaCards.push(new Card("image","title","summary"));
    }

}

function cargarSlider(){

    

    slider=new Slider(imgSlider);

    // imgSlider.forEach(function (img) {
    //     $('.carousel-inner').append(
    //         "<div class='carousel-item'>" +
    //             "<img class='d-block w-100' src= http://localhost/nextrem/api/"+img  + ">" +
    //         "</div>"
    //     );
    // });

    
}