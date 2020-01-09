class SportPin {
    constructor(sport) {
        this.sport = sport;
    }

    draw() {
        let $base;

        $base = $('<div>', {
            "class": "c-sport-pin c-sport-pin--" + this.sport.toLowerCase()
        });

        $base.append(
            $('<img>', { "class": "c-sport-pin__img", "src": "assets/img/" +this.sport.toLowerCase() + ".jpg" }),
            $('<div>', { "class": "c-sport-pin__content" }).append(
                $('<div>', { "class": "titulo", "html": this.sport }),
                $('<div>', { "class": "subtitulo", "html": "subtitulo provisional" })
            ),
            $('<div>', { "class": "c-sport-pin__mask" })
        );


        return $base; 
    }
}
