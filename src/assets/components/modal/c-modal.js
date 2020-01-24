class Modal{
    constructor(title,body,action,confirmMsg){
        this.title=title;
        this.body=body;
        this.action=action;
        this.confirmMsg=confirmMsg;
    }

    draw(){
        var self=this;
        let $base=$("<div>",{
            "class":"c-modal"
        });

        $base.click(function (evt) {
            if (evt.target.className == "c-modal") {
                $("#modal").empty();
            } 
        });

        let $dialog=$("<div>",{
            "class":"c-modal__dialog"
        });
        let $content=$("<div>",{
            "class":"content"
        });
        let $header=$("<div>",{
            "class":"content__header"
        });
        let $close=$("<div>",{
            "class":"button--close",
            "html":"&times;"
        });

        $close.on("click",function(){
            $("#modal").empty();
        });
        
        let $title=$("<div>",{
            "class":"content__title",
            "html": this.title
        });
        let $body=$("<div>",{
            "class":"content__body",
            "html":this.body
        });
        let $footer=$("<div>",{
            "class":"content__footer"
        });
        let $accept=$("<div>",{
            "class":"button button--highlight",
            "html":this.confirmMsg
        });

        $accept.on("click",function(){
            self.action();
        });

        let $cancel=$("<div>",{
            "class":"button",
            "html":"Cancelar"
        });

        $cancel.on("click",function(){
            $("#modal").empty();
        });

        $header.append($close);
        $footer.append([$cancel,$accept]);
        $content.append([$header,$title,$body,$footer]);
        $dialog.append($content);
        $base.append($dialog);

        return $base;
    }
}