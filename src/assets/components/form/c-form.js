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

        let $textbox = $("<div>", {
            "class": "c-form__textbox"
        });

        let $username = $("<input>", {
            "type": "text",
            "id": "user_login",
            "class": "textbox",
            "placeholder": "user name or email"
        });
        let $password = $("<input>", {
            "type": "password",
            "id": "pass_login",
            "class": "textbox",
            "placeholder": "password"
        });
        let $submit = $("<div>", {
            "class": "c-form__button",
            "html": "sign in"
        });

        let $undertext = $("<p>", {
            "class": "c-form__undertext",
            "html": "sign up ⏵"
        });

        $undertext.on("click", function () {
            let $item1 = $(".l-dual__item--izquierda");
            let $item2 = $(".l-dual__item--derecha");

            $item1.removeClass("l-dual__item--izquierda").addClass("l-dual__item--derecha");
            $item2.removeClass("l-dual__item--derecha").addClass("l-dual__item--izquierda");

            let cambio = new Form("register");
            $("#login").parent().empty().append(cambio.draw());

        });

        $base.append($title);
        $textbox.append($username);
        $textbox.append($password);
        $base.append($textbox);
        $base.append($submit);
        $base.append($undertext);

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

        let $undertext = $("<p>", {
            "class": "c-form__undertext",
            "html": "sign in ⏵"
        });

        $undertext.on("click", function () {
            let $item1 = $(".l-dual__item--izquierda");
            let $item2 = $(".l-dual__item--derecha");

            $item1.removeClass("l-dual__item--izquierda").addClass("l-dual__item--derecha");
            $item2.removeClass("l-dual__item--derecha").addClass("l-dual__item--izquierda");

            let cambio = new Form("login");
            $("#register").parent().empty().append(cambio.draw());

        });

        $base.append($title);
        $textbox.append($username);
        $textbox.append($password);
        $base.append($textbox);
        $base.append($rePassword);
        $base.append($email);
        $base.append($cb);
        $avatar.append($inputAvatar)
        $avatar.append($btnAvatar);
        $base.append($avatar);
        $base.append($submit);
        $base.append($undertext);

        $(function () {
            $('.c-form__button').on("click", registerAction);
        });

        return $base;
    }

    changeSide() {
        let $item1 = $(".l-dual__item--izquierda");
        let $item2 = $(".l-dual__item--derecha");

        $item1.removeClass(".l-dual__item--izquierda");
        $item1.addClass(".l-dual__item--derecha");

        $item2.removeClass(".l-dual__item--derecha");
        $item2.addClass(".l-dual__item--izquierda");
    }


}
