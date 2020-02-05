class Card {
  constructor(id, image, title, sport, summary, capacidad,plazasOcupadas, plazas = 1, price, material, iconos, level, modifier = null) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.sport = sport;
    this.summary = summary;
    this.iconos = iconos;
    this.level = level;
    this.modifier = modifier;
    this.price = price;
    this.material = material;
    this.plazas = plazas;
    this.capacidad = capacidad;
    this.plazasOcupadas = plazasOcupadas;
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

    var self = this;

    let $cartBtn = $('<div>', { "class": "content__button content__button--" + this.sport });
    $cartBtn.on("click", function () {
      if (localStorage.getItem('user_token') != null) {

        let modal = new Modal("Resumen producto", self.imprimirProducto(), function () {

          self.plazas = parseInt($("#plazas").val());


          self.comprar();

        }, "Añadir al carrito");

        let $mod = modal.draw();
        $("#modal").append($mod);
        $mod.show();

      } else {
        let modal = new Modal("¿Aún no te has registrado?", "Registrate ahora y disfruta de nuestros eventos de riesgo", function () {
          goToAccount("register");
        }, "Registrarse");

        let $mod = modal.draw();
        $("#modal").append($mod);
        $mod.show();

        let $not = new Notification("warning", "Hey!", "Todavía no te has registrado");
        $("#notificaciones").append($not.draw());
      }
    });

    $card.append(
      $('<div>', { 'class': 'c-card__contenido', }).append([
        $('<div>', { "class": "content" }).append([
          $('<div>', { "class": "content__img" }).append([
            $('<img>', { "src": rutaImages + "eventos/" + this.image })
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

    let $btn = $('<div>', { 'class': 'c-card__btn', });
    $btn.append($('<i>', { "class": 'fa fa-bars fa--claro' }));
    $card.append($btn);

    $btn.on("click", function () {
      var card = $(this).parent(".c-card");
      var icon = $(this).children("i");
      var todasCartas = $(".c-card");

      if (card.hasClass("c-card--active")) {
        cerrarCard(card, $(this));

      } else {
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

    let $level = $('<div>', { "class": "footer__level" });
    let $iconos=$('<div>', { "class": "footer__iconos" });
    $iconos.append($('<a>', {}).append([
      $('<img>', { "src": rutaImages+"iconos/"+this.iconos[0],
                    "class": "c-card__icono-deporte" 
                  })
    ]));
    $iconos.append($('<a>', {}).append([
      $('<i>', { "class": this.iconos[1] })
    ]));
    $iconos.append($('<a>', {}).append([
      $('<div>', { "html": this.plazasOcupadas+"/"+this.capacidad })
    ]));
    $card.append(
      $('<div>', { 'class': 'c-card__footer', }).append([
        $('<div>', { "class": "footer" }).append([
          $('<h4>', { "class": 'footer__titulo', "html": 'Features' }),
          $iconos,
          $level
        ])
      ])
    );

    for (var i = 0; i < this.level; i++) {
      $level.append($('<i>', { 'class': 'fa fa-skull' }));
    }

    return $base;
  }

  imprimirProducto() {
    return "Evento: " + this.title + "<br>" +
      "Deporte: " + this.sport + "<br>"
      + "Incluye material: " + this.material + "<br>" +
      "Plazas: <input type='number' value=1 id='plazas' min=1 max=" + this.capacidad + "></input><br>"
      + "Precio total: " + this.price + "€";
  }

  comprar() {
    let card = new Card(this.id, this.image, this.title, this.sport, this.summary, this.capacidad,this.plazasOcupadas, this.plazas, this.price, this.material, this.iconos, this.level, this.modifier);

    carrito.anyadirEvento(card);
  }

}
