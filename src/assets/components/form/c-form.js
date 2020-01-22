class Form {
    constructor(type) {
        this.type = type;
    }

    draw() {
        let func = this[this.type + "Form"];

        return func.apply();
    }

    loginForm() {
        let $base = $("<div>", {
            "class": "c-form",
            "id": "login"
        });

        let $title = $("<div>", {
            "class": "c-form__title",
            "html": "ACCOUNT LOGIN"
        });

        let $campos = $("<div>", {
            "class": "c-form__campos c-form__campos--login",
        });

        let $textbox = $("<div>", {
            "class": "c-form__textbox c-form__textbox--login"
        });

        let $username = $("<input>", {
            "type": "text",
            "id": "user_login",
            "class": "textbox",
            "placeholder": "User name or Email"
        });

        let $password = $("<input>", {
            "type": "password",
            "id": "pass_login",
            "class": "textbox",
            "placeholder": "Password"
        });

        let $msg = $("<div>", {
            "class": "c-form__msg",
            "html": "Welcome back! Ready for your new dare?"
        });

        let $submit = $("<div>", {
            "class": "c-form__button",
            "html": "sign in"
        });


        

        $base.append($title);

        $textbox.append($username);
        $textbox.append($password);
        $textbox.append($msg);

        $campos.append($textbox);
        
        $base.append($campos)
        $base.append($submit);

        $(function () {
            $('.c-form__button').on("click", loginAction);
        })

        return $base;
    }

    registerForm() {
        let $base = $("<div>", {
            "class": "c-form",
            "id": "register"
        });

        let $title = $("<div>", {
            "class": "c-form__title",
            "html": "ACCOUNT REGISTER"
        });

        let $campos = $("<div>", {
            "class": "c-form__campos",
        });

        let $textbox = $("<div>", {
            "class": "c-form__textbox"
        });

        let $username = $("<input>", {
            "type": "text",
            "id": "user",
            "class": "textbox",
            "placeholder": "User name"
        });
        let $password = $("<input>", {
            "type": "password",
            "id": "pass_register",
            "class": "textbox",
            "placeholder": "Password"
        });
        let $rePassword = $("<input>", {
            "type": "password",
            "id": "pass_confirm_register",
            "class": "textbox",
            "placeholder": "Confirm password"
        });
        let $email = $("<input>", {
            "type": "text",
            "id": "email",
            "class": "textbox",
            "placeholder": "Email"
        });
        let $business = $("<input>", {
            "id": "cbIsbusiness",
            "type": "checkbox",
            "name": "isbusiness",
        });
        let $cb = $("<div>", {
            "class": "c-form__checkbox"
        });
        $cb.append($business);
        $cb.append($("<label>", {
            "for": "cbIsbusiness",
            "html": '&nbsp' + "Cuenta de empresa"
        }));

        let $avatar = $("<div>", {
            "class": "c-form__avatar"
        });

        let $btnAvatar = $("<button>", {
            "class": "btn-avatar",
            "html": "Upload a file"
        });

        let $inputAvatar = $("<input>", {
            "type": "file",
            "class": "input-avatar",
            "placeholder": "avatar"
        });
        let $submit = $("<div>", {
            "class": "c-form__button",
            "html": "Sign up"
        });

       

        $base.append($title);

        $textbox.append($username);
        $textbox.append($password);
        $campos.append($textbox);
        $campos.append($rePassword);
        $campos.append($email);
        $campos.append($cb);
        $avatar.append($inputAvatar)
        $avatar.append($btnAvatar);
        $campos.append($avatar);

        $base.append($campos);
        $base.append($submit);
        

        $(function () {
            $('.c-form__button').on("click", registerAction);
        });

        return $base;
    }

    changeSide() {
        
        if(this.type=="register"){
            let $item1 = $(".l-dual__item--izquierda");
            let $item2 = $(".l-dual__item--derecha");

            console.log($item1.css("transform"));
            // if($item1.css("transform")=="none"){
            //     $item1.css("transform","translateX(100%)");
            //     $item2.css("transform","translateX(-100%)");
            // }else{
            //     $item1.css("transform","translateX(0%)");
            //     $item2.css("transform","translateX(0%)");
            // }
            // setTimeout(() => {
            //     $item1.removeClass("l-dual__item--izquierda");
            // $item2.removeClass("l-dual__item--derecha");
            //     $item1.addClass("l-dual__item--derecha");
            //     $item2.addClass("l-dual__item--izquierda");
            // }, 1000);
            // $item1.on("webkitTransitionEnd",()=>{
                $item1.removeClass("l-dual__item--izquierda").addClass("l-dual__item--derecha");
                $item2.removeClass("l-dual__item--derecha").addClass("l-dual__item--izquierda");
            // });
            
            

            let cambio = new Form("login");
            this.type="login";
            $("#register").parent().empty().append(cambio.draw());
        }else if(this.type=="login"){
            let $item1 = $(".l-dual__item--izquierda");
            let $item2 = $(".l-dual__item--derecha");
            console.log($item1.css("transform"));
            $item1.removeClass("l-dual__item--izquierda").addClass("l-dual__item--derecha");
            $item2.removeClass("l-dual__item--derecha").addClass("l-dual__item--izquierda");
            // if($item1.css("transform")=="none"){
            //     $item1.css("transform","translateX(100%)");
            //     $item2.css("transform","translateX(-100%)");
            // }else{
            //     $item1.css("transform","translateX(0%)");
            //     $item2.css("transform","translateX(0%)");
            // }
    
            let cambio = new Form("register");
            this.type="register";
            $("#login").parent().empty().append(cambio.draw());
        }
    }


}
