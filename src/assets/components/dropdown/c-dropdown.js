class DropDown {

    constructor(type) {
        this.type = type;
    }

    draw() {
        let func = this[this.type + "DropDown"];

        return func.apply();
    }

    profileDropDown() {
        console.log("AAASDAS");

        let $base = $("<div>", {
            "class": "c-dropdown-content",
            "id": "dropDownProfile"
        });
        let $link1 = $("<a>", {
            "html": "Perfil"
        });
        let $link2 = $("<a>", {
            "html": "Config"
        });
        let $link3 = $("<a>", {
            "html": "Desconectar"
        });

        $base.append($link1);
        $base.append($link2);
        $base.append($link3);
        $(function () {
            $("#dropDownProfile").classList.toggle("show");
        })

        console.log($base);
        return $base;
    }
}