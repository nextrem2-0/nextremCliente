class textOver{
    constructor($background,$top,modifier){
        this.$background=$background;
        this.$top=$top;
        this.modifier=modifier;
    }

    draw(){

        let $base = $("<div>", {
            "class": "c-textOver"
        }).append([this.$background.addClass("c-textOver__background"),this.$top.addClass("c-textOver__top")]);
        if(this.modifier!=null){
            $base = $("<div>", {
                "class": "c-textOver c-textOver--"+this.modifier
            }).append([this.$background.addClass("c-textOver__background"),this.$top.addClass("c-textOver__top")]);
        }
        return $base;
    }
}