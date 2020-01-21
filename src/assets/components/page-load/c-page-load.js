class PageLoad {
    constructor() {
    }

    draw() {
        let $loading = $("<div>", {
            "class": "c-page-load"
        }).append(
            $("<img>",{
                "class": "c-page-load__img",
                "src": "assets/img/loadpage.gif" 
            })
        );

        return $loading; 
    }

    removeLoader(){
        $( ".c-page-load" ).fadeOut(500, function() {
          $( ".c-page-load" ).remove(); 
      });  
    }
}