class Card {
  constructor(image,title,summary,modifier=null) {
    this.image=image;
    this.title=title;
    this.summary=summary;
    this.modifier=modifier;
  }

  draw(){
    let $base;
    if(this.modifier==null){
      $base=$('<div>', {
          'class' : 'c-card',
      });
    }else{
      $base=$('<div>', {
          'class' : 'c-card'+this.modifier,
      });
    }

    $base.append($('<img>', {
        'href' : '../../img/' + this.image,
        'class' : 'c-card__image',
    }));
    $base.append($('<div>', {
        'html' : this.title,
        'class' : 'c-card__title',
    }));
    $base.append($('<div>', {
        'html' : this.content,
        'class' : 'c-card__summary',
    }));

    return $base;
  }
}
