class Card {
  constructor(image, title, sport, summary,price,material, iconos, level, modifier = null) {
    this.image = image;
    this.title = title;
    this.sport = sport;
    this.summary = summary;
    this.iconos = iconos;
    this.level = level;
    this.modifier = modifier;
    this.price=price;
    this.material=material;
  }

  draw() {

    let $base;
    let $card;

    $base = $('<div>', { 
      'class': 'l-card col-md-10 col-sm-6 col-xs-12',
    });

    if (this.modifier == null) {
      $card = $('<article>', {
        'class': 'c-card',
      });
    } else {
      $card = $('<article>', {
        'class': 'c-card' + " c-card--" + this.modifier,
      });
    }

    $base.append($card);

    $card.append( 
      $('<h2>', { 'class': 'c-card__encabezado', }).append([
        $('<div>', { "class": "encabezado" }).append([
          $('<span>', { "class": "encabezado__titulo", "html": this.title }),
          $('<strong>', { "class": "encabezado__subtitulo" }).append([
            $('<i>', { "class": "fa fa-fw fa-star fa--claro" }),
            $('<span>', { "html": "&nbsp" + this.sport })
          ])
        ])
      ])
    );

      var self= this;

      let $cartBtn=$('<div>', { "class": "content__button content__button--" + this.sport});
      $cartBtn.on("click",function(){
        let modal=new Modal("Resumen producto",self.imprimirProducto(),function(){self.comprar();},"Añadir al carrito");
        
        let $mod=modal.draw();
        $("#modal").append($mod);
        $mod.show();
    });

    $card.append(
      $('<div>', { 'class': 'c-card__contenido', }).append([
        $('<div>', { "class": "content" }).append([
          $('<div>', { "class": "content__img" }).append([
            $('<img>', { "src": "assets/img/" + this.image })
          ]),
          $('<div>', { "class": "content__description" }).append([
            $('<div>', { "html": this.summary })
          ]),
          $cartBtn.append([
            $('<i>', { "class": 'fas fa-plus button__icono fa--claro', }),
            $('<p>', { "class": "button-text", "html": '&nbsp Ver más', })
          ])
        ])

      ])
    );

    let $btn=$('<div>', { 'class': 'c-card__btn', });
    $btn.append($('<i>', { "class": 'fa fa-bars fa--claro' }));
    $card.append($btn);

    $btn.on("click", function(){
      var card = $(this).parent(".c-card");
      var icon = $(this).children("i");
      var todasCartas = $(".c-card");

      if(card.hasClass("c-card--active")){
        cerrarCard(card,$(this));

      }else{
        cerrarCard(todasCartas, $(".c-card__btn"));
        card.addClass("c-card--active");

      window.setTimeout(function () {
        icon
          .removeClass("fa-bars")
          .addClass("fa-arrow-left");
      }, 800);
      }
    });
    
    function cerrarCard(carta, icono) {
      carta.removeClass("c-card--active");


      window.setTimeout(function () {
        $(icono).children("i")
          .removeClass("fa-arrow-left")
          .addClass("fa-bars");
      }, 800);
    }

    let $level=$('<div>', { "class": "footer__level" });

    $card.append( 
      $('<div>', { 'class': 'c-card__footer', }).append([
        $('<div>', { "class": "footer" }).append([
          $('<h4>', { "class": 'footer__titulo', "html": 'Features' }),
          $('<div>', { "class": "footer__iconos" }).append([
            $('<a>', {}).append([
              $('<i>', { "class": "fa fa-mountain fa--claro" })
            ]),
            $('<a>', {}).append([
              $('<i>', { "class": "fa fa-users fa--claro" })
            ]),
            $('<a>', {}).append([
              $('<i>', { "class": "fa fa-hiking fa--claro" })
            ])
          ]),
          $level
        ])
      ])
    );

    for (var i = 0; i < this.level; i++) {
      $level.append($('<i>', { 'class': 'fa fa-skull' }));
    }

    return $base;
  }

  imprimirProducto(){
    return "Evento: "+this.title+"<br>"+
           "Deporte: "+this.sport+"<br>"
          +"Incluye material: "+this.material+"<br>"
          +"Precio total: "+this.price+"€";
  }

  comprar(){
    let card=new Card(this.image, this.title, this.sport, this.summary,this.price,this.material, this.iconos, this.level, this.modifier);
    
    carrito.anyadirEvento(card);
  }

}
