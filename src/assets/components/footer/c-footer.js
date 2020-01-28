class Footer {
  constructor(categories) {
    this.categories = categories;
  }

  draw() {
    let $base;
    let currentYear = (new Date).getFullYear();

    $base = $('<div>', {
      'class': 'c-footer c-footer--size@mobile'
    });

    var $links = $('<p>', { "class": "links links--font-size-xxs@mobile" });

    this.categories.forEach(function (categ) {
      $links.append(
        $('<a>', { "html": categ + "&nbsp" })
      );
    });

    $base.append(
      $('<div>', { 'class': 'l-footer', }).append([
        $('<div>', { 'class': 'l-footer__item--right', }).append([
          $('<div>', { 'class': 'c-footer__right', }).append([
            $('<a>', { "class": "rrss" }).append([
              $('<i>', { "class": "fab fa-facebook-f" })
            ]),
            $('<a>', { "class": "rrss" }).append([
              $('<i>', { "class": "fab fa-twitter" })
            ]),
            $('<a>', { "class": "rrss", "href": "https://www.instagram.com/nextremspain/?hl=es" }).append([
              $('<i>', { "class": "fab fa-instagram" })
            ]),
            $('<a>', { "class": "rrss", "href": "https://github.com/nextrem2-0" }).append([
              $('<i>', { "class": "fab fa-github" })
            ])
          ])
        ]),
        $('<div>', { 'class': 'l-footer__item--left', }).append([
          $('<div>', { 'class': 'c-footer__left', }).append([
            $links,
            $('<p>', { "class": "copyright", "html": "&nbsp Nextrem © " + currentYear })
          ])
        ])
      ])
    );
    return $base; 
  }
}
