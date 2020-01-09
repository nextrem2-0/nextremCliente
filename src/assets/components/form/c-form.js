class Form{
    constructor(type){
        this.type=type;
    }

    draw(){
        let func=this[this.type+"Form"];
        
        return func.apply();
    }

    loginForm(){
        let $base=$("<div>",{
            "class":"c-form"
        });
        let $username=$("<input>",{
            "type":"text",
            "class":"c-form__textbox",
            "placeholder":"username"
        });
        let $password=$("<input>",{
            "type":"password",
            "class":"c-form__textbox",
            "placeholder":"password"
        });
        let $submit=$("<div>",{
            "class":"c-form__button",
            "html":"ok"
        });

        $base.append($username);
        $base.append($password);
        $base.append($submit);

        return $base;
    }

    registerForm(){
        let $base=$("<div>",{
            "class":"c-form"
        });
        let $username=$("<input>",{
            "type":"text",
            "class":"c-form__textbox",
            "placeholder":"username"
        });
        let $password=$("<input>",{
            "type":"password",
            "class":"c-form__textbox",
            "placeholder":"password"
        });
        let $rePassword=$("<input>",{
            "type":"password",
            "class":"c-form__textbox",
            "placeholder":"password"
        });
        let $business=$("<input>",{
            "id":"cbIsbusiness",
            "type":"checkbox",
            "value":"true",
            "name":"isbusiness",
        });
        let $cb=$("<div>",{
            "class":"c-form__checkbox"
        });
        $cb.append($business);
        $cb.append($("<label>",{
            "for":"cbIsbusiness",
            "text":"Empresa"
        }));
        let $avatar=$("<input>",{
            "type":"text",
            "class":"c-form__textbox",
            "placeholder":"avatar"
        });
        let $submit=$("<div>",{
            "class":"c-form__button",
            "html":"ok"
        });

        $base.append($username);
        $base.append($password);
        $base.append($rePassword);
        $base.append($cb);
        $base.append($avatar);
        $base.append($submit);

        return $base;
    }


}