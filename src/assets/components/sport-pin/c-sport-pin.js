class SportPin {
    constructor(sport) {
        this.sport = sport;
    }

    draw() {
        
        let $base;
        let $sportName = this.sport.nombre;
        let $sportId = this.sport.id;
        
        $base = $('<div>', {
            "class": "c-sport-pin c-sport-pin--" + $sportName.toLowerCase()
        });

        $base.append(
            $('<img>', { "class": "c-sport-pin__img", "src": "assets/img/" + $sportName.toLowerCase() + ".jpg" }),
            $('<div>', { "class": "c-sport-pin__content" }).append(
                $('<div>', { "class": "titulo", "html": $sportName }),
                $('<div>', { "class": "subtitulo", "html": "subtitulo provisional" })
            ),
            $('<div>', { "class": "c-sport-pin__mask" })
        );

        $base.on("click", function(){
            cargarEventosDeporte($sportId);
        });

        return $base; 
    }
}
