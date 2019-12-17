class Menu {
  constructor() {
    this.categories=categories;
  }

  draw(){
    let $base=$('<div>', {
        'class' : 'c-menu',
    });
    for(i=0;i<this.categories.length;i++){
      let $option;
      if(i==1){
        $option=$('<div>', {
          'html' : this.categories[i],
          'class' : 'c-menu__opcion c-menu__opcion--right',
        });
      }else{
        $option=$('<div>', {
          'html' : this.categories[i],
          'class' : 'c-menu__opcion',
        });
      }
      $option.on("mouseover",function(){
        $base.toggleClass("c-menu--extended");
      });
      $option.on("mouseout",function(){
        $base.toggleClass("c-menu--extended");
      });
      $base.append($option);
    }
    for (var category of this.categories) {
      
    }
    return $base;
  }
}
