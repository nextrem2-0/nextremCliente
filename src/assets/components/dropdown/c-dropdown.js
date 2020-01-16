class DropDown {
    constructor(type) {
        this.type = type;
    }

    draw() {
        let func = this[this.type + "Drop"];
        return func.apply();
    }

    profileDrop() {

        let $base = $("<div>", {
            "class": "c-dropdown-content",
            "id": "dropDownProfile"
        });
        let $link1 = $("<a>", {
            "html": localStorage.getItem('username'),
            "class": "c-dropdown-content__profile",
            "style": "padding: 0; padding-left:15px"

        });
        let $link2 = $("<a>", {
            "html": "Config"
        });
        let $link3 = $("<a>", {
            "html": "Desconectar"
        });
        $link3.on("click",logoutAction);
        $base.append($link1);
        $base.append($link2);
        $base.append($link3);
        
        return $base;
    }
}