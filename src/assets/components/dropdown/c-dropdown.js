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
            "class": "c-dropdown-content__profile"
        });
        let $line = $("<div>",{
            "class": "c-dropdow-content__line"
        });
        let $link2 = $("<a>", {
            "html": "Config"
        });
        let $link3 = $("<a>", {
            "html": "Desconectar"
        });
        $link3.on("click",logoutAction);
        $base.append($link1);
        $base.append($line)
        $base.append($link2);
        $base.append($link3);

              
        return $base;
    }

    profileDropDown() {
        $('body').click(function (evt) {
            if (evt.target.className == "c-menu__option c-menu__option--register dropdown") {
                var dropdowns = $(".c-dropdown-content");
                dropdowns.toggleClass("show");
            } else {
                $(".c-dropdown-content").removeClass("show");
            }
        });
    }
}