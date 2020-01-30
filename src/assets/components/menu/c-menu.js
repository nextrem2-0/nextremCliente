class Menu {
  constructor(categories, sports, events) {
    this.categories = categories;
    this.sp = sports;
    this.events = events;
  }

  draw() {
    let self = this;
    let logged=false;
    let $base = $('<div>', {
      'class': 'c-menu',
    });
    $base.hover(function(){},function(){
      if($(".c-menu__hamburguer").css("display")!="none"){
      $(".c-menu__option-container").hide();
        $base.removeClass("c-menu--extended");
      }
    });
    let $optionContainer=$("<div>",{
      "class": "c-menu__option-container"
    });
    
    for (let i = 0; i < this.categories.length; i++) {
      let $option = $('<i>', {
        'class': 'fas fa-search c-menu__option',
      });

      if (i == 1) {
        if (this.categories[i].toLowerCase() == "buscar") {
          $option.addClass("c-menu__option--right");
        } else {
          $option = $('<div>', {
            'html': this.categories[i],
            'class': 'c-menu__option c-menu__option--right',
          });
        }

      } else if (this.categories[i].toLowerCase() == "inicio") {
        $option = $('<img>', {
          "src": "assets/img/nextrem.png",
          'class': 'c-menu__option c-menu__option--inicio',
        });
        $option.on("click", function () {
          cargarInicio();
        });
      } else if (this.categories[i].toLowerCase() == "entrar") {
        if (localStorage.getItem('user_token') == null) {
          $option = $('<div>', {
            'html': this.categories[i],
            'class': 'c-menu__option c-menu__option--login',
          });
          $option.on("click", function () {
            goToAccount("login");
            self.hideMenuMobile();
          });
        } else {
          $option = $('<div>', {
            'html': ""
          });
        }


      } else if (this.categories[i].toLowerCase() == "registrar") {
        if (localStorage.getItem('user_token') != null) {
          logged=true;
          $option = $('<div>', {
            'class': 'c-menu__option c-menu__option--register c-menu__option--registrado',
          }).append(
            $('<img>',{
              'class': "c-menu__imgPerfil dropdown",
              'src': 'http://localhost/nextrem/api/public/storage/avatars/' + localStorage.getItem('avatar')
            })
          );

          let drop = new DropDown("profile");
          $option.append(drop.draw());

          drop.profileDropDown();

        } else {
          $option = $('<div>', {
            'html': this.categories[i],
            'class': 'c-menu__option c-menu__option--register',
          });
          $option.on("click", function () {
            goToAccount("register");
            self.hideMenuMobile();
          });
        }
      } else {
        $option = $('<div>', {
          'html': this.categories[i],
          'class': 'c-menu__option',
        });
      }

      if ($option.html().toLowerCase() == "deportes") {
        let $submenu = this.drawSports();
        $base.append($submenu);
        $option = $('<div>', {
          'html': this.categories[i],
          'class': 'c-menu__option c-menu__option--deportes',
        });
        $option.hover(function () {
          if (!$base.hasClass("c-menu--extended")) {
            $(".c-submenu--sports").css("display","flex");
            $base.addClass("c-menu--extended");
          }
        }, function () {
          
            if (!$(".c-submenu--sports").is(":hover") && $(".c-menu__hamburguer").css("display")=="none") {    
              $base.removeClass("c-menu--extended");
              $(".c-submenu--sports").hide();
            }
          
          
        });

        $submenu.hover(function () {
          if (!$base.hasClass("c-menu--extended")) {
            $(".c-submenu--sports").css("display","flex");
            $base.addClass("c-menu--extended");
          }
        }, function () {
          
          
            if (!$option.is(":hover") && $(".c-menu__hamburguer").css("display")=="none") {
              $base.removeClass("c-menu--extended");
              $(".c-submenu--sports").hide();
            }
         
        });

        $option.on("click", function(){
          cargarDeportes();
          self.hideMenuMobile();
        });

      } else if ($option.html().toLowerCase() == "eventos") {
        // $base.append(this.drawEvents($base));
        // $option.on("mouseover",function(){
        //   $(".c-submenu--events").show();
        //   $base.toggleClass("c-menu--extended");
        // });
        // $option.on("mouseout",function(){
        //   $(".c-submenu--events").hide();
        //   $base.toggleClass("c-menu--extended");
        // });
        $option.on("click", cargarEventos);
      }

      
      if (this.categories[i].toLowerCase() == "inicio"){
        $base.append($option);
      }else if(logged && this.categories[i].toLowerCase() == "registrar"){
        $base.append($optionContainer);
        $base.append($option);
      }else{
        $optionContainer.append($option);
      }
    }
    let $hamburguer=$("<div>",{
      "class":"c-menu__hamburguer fas fa-bars"
    });
    $hamburguer.on("click",function(){
      if (!$base.hasClass("c-menu--extended")) {
        $(".c-menu__option-container").css("display","flex");
        $base.addClass("c-menu--extended");
      }else{
        $base.removeClass("c-menu--extended");
              $(".c-menu__option-container").hide();
      }
      
    });
    
    $base.append($hamburguer);
    $(".c-submenu--sports").hide();
    $(".c-submenu--events").hide();
    return $base;
  }

  drawSports() {
    let $submenu = $("<div>", {
      "class": "c-submenu c-submenu--sports"
    });
    for (const key of this.sp) {
      let $sportId = key.id;
      let $subOpt = $("<div>", {
        "html": key.nombre,
        "class": "c-submenu__option"
      });

      $subOpt.on("click", function () {
        cargarEventosDeporte($sportId);
      });

      $submenu.append($subOpt);
    }

    return $submenu;
  }

  drawEvents($base) {
    let $submenu = $("<div>", {
      "class": "c-submenu c-submenu--events"
    });
    for (const key of this.events) {
      let $subOpt = $("<div>", {
        "html": key,
        "class": "c-submenu__option"
      });
      $submenu.append($subOpt);
    }

    return $submenu;
  }

  cambiarDropTitulosPerfil($option) {
    let username = localStorage.getItem('username');
    console.log(username);

  }

  hideMenuMobile(){
    if($(".c-menu__hamburguer").css("display")!="none"){
      $(".c-menu").removeClass(".c-menu--extended");
      $(".c-menu__option-container").hide();
    }
  }
}
