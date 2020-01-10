class Card {
  constructor(image, title, sport, summary, iconos, level, modifier = null) {
    this.image = image;
    this.title = title;
    this.sport = sport;
    this.summary = summary;
    this.iconos = iconos;
    this.level = level;
    this.modifier = modifier;
  }

  draw() {

    let $base;
    let $card;
    let nivel;
    $base = $('<div>', {
      'class': 'l-card col-md-10 col-sm-6 col-xs-12',
    });

    for (var i = 0; i < this.level; i++) {
      nivel += "$('<i>',{ 'class': 'fa fa-skull'})" + "\n";
    }

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
            $('<i>', { "class": "fa fa-fw fa-star" }),
            $('<span>', { "html": "&nbsp" + this.sport })
          ])
        ])
      ])
    );

    $card.append(
      $('<div>', { 'class': 'c-card__contenido', }).append([
        $('<div>', { "class": "content" }).append([
          $('<div>', { "class": "content__img" }).append([
            $('<img>', { "src": "assets/img/" + this.image })
          ]),
          $('<div>', { "class": "content__description" }).append([
            $('<div>', { "html": this.summary })
          ])
        ])

      ])
    );

    let $btn=$('<div>', { 'class': 'c-card__btn', });
    $btn.append($('<i>', { "class": 'fa fa-bars' }));
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

    // $card.append(
    //   $('<div>', { 'class': 'c-card__btn', }).append([
    //     $('<i>', { "class": 'fa fa-bars' })

    //   ])
    // );

    
    // $(document).on("click", ".c-card__btn", function () {
    //   var todasCartas = $(".c-card");

    //   var card = $(this).parent(".c-card");
    //   var icon = $(this).children("i");
    //   var estaActivado = false;
       

    //   if (card.hasClass("c-card--active")) {
    //     estaActivado = true;
    //   }
    //   cerrarCard(todasCartas, $(".c-card__btn"));

    //   if (!card.hasClass("c-card--active")) {
    //     console.log("activo");
        
    //     card.addClass("c-card--active");

    //     window.setTimeout(function () {
    //       icon
    //         .removeClass("fa-bars")
    //         .addClass("fa-arrow-left");
    //     }, 800);
    //   }

    //   if(estaActivado == true){
    //     console.log("cerrar");
        
    //     cerrarCard(card, $(this));
    //   }
    // });

    function cerrarCard(carta, icono) {
      carta.removeClass("c-card--active");


      window.setTimeout(function () {
        $(icono).children("i")
          .removeClass("fa-arrow-left")
          .addClass("fa-bars");
      }, 800);
    }

    $card.append( 
      $('<div>', { 'class': 'c-card__footer', }).append([
        $('<div>', { "class": "footer" }).append([
          $('<h4>', { "class": 'footer__titulo', "html": 'Features' }),
          $('<div>', { "class": "footer__iconos" }).append([
            $('<a>', {}).append([
              $('<i>', { "class": "fa fa-mountain" })
            ]),
            $('<a>', {}).append([
              $('<i>', { "class": "fa fa-users" })
            ]),
            $('<a>', {}).append([
              $('<i>', { "class": "fa fa-hiking" })
            ])
          ]),
          $('<div>', { "class": "footer__level" }).append([
            $('<i>', { 'class': 'fa fa-skull' }),
            $('<i>', { 'class': 'fa fa-skull' }),
            $('<i>', { 'class': 'fa fa-skull' })
          ])
        ])
      ])
    );

    return $base;
  }

}
