class InformationPin {
  constructor(image,title,content,modifier=null) {
    this.image=image;
    this.title=title;
    this.content=content;
    this.modifier=modifier;
  }

  draw(){
    let $card;
    if(this.modifier==null){
      $card=$('<div>', {
          'class' : 'c-information-pin',
      });
    }else{
      $card=$('<div>', {
          'class' : 'c-information-pin'+this.modifier,
      });
    }

    $base.append($('<div>', {
        'class' : 'c-information-pin__image',
    }).append($("<i>",{
      "class":this.image,
      "style":"color:#539400"
    })));
    $base.append($('<div>', {
        'html' : this.title,
        'class' : 'c-information-pin__title',
    }));
    $card.append($('<div>', {
        'html' : this.content,
        'class' : 'c-information-pin__content',
    }));

    return $card;
  }
}
