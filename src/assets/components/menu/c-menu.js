class Menu {
  constructor() {
    this.categories=categories;
  }

  draw(){
    base=$('<div>', {
        'class' : 'c-menu',
    });
    for (var category in this.categories) {
      base.append($('<div>', {
          'html' : category,
          'class' : 'c-menu__opcion',
      }););
    }

  }
}
