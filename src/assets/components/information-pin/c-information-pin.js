class InformationPin {
  constructor(image,title,content,modifier=null) {
    this.image=image;
    this.title=title;
    this.content=content;
    this.modifier=modifier;
  }

  draw(){
    let $base;
    if(this.modifier==null){
      $base=$('<div>', {
          'class' : 'c-information-pin',
      });
    }else{
      $base=$('<div>', {
          'class' : 'c-information-pin'+this.modifier,
      });
    }

    $base.append($('<img>', {
        'href' : '../../img/' + this.image,
        'class' : 'c-information-pin__image',
    }));
    $base.append($('<div>', {
        'html' : this.title,
        'class' : 'c-information-pin__title',
    }));
    $base.append($('<div>', {
        'html' : this.content,
        'class' : 'c-information-pin__content',
    }));

    return $base;
  }
}
