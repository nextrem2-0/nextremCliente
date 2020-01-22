class textOver{
    constructor($background,$top){
        this.$background=$background;
        this.$top=$top;
    }

    draw(){
        let $base = $("<div>", {
            "class": "c-textOver"
        }).append([this.$background.addClass("c-textOver__background"),this.$top.addClass("c-textOver__top")]);
        return $base;
    }
}