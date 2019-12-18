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

    $base.append($('<div>', {
        'class' : 'c-information-pin__image',
    }).append($("<i>",{
      "class":this.image,
      "style":"color:#518f7f"
    })));
    $base.append($('<div>', {
        'html' : this.title,
        'class' : 'c-information-pin__title',
    }));
    $base.append($('<div>', {
        'html' : this.content,
        'class' : 'c-information-pin__content',
    }));

    $(".c-information-pin").mouseover(function(){
      $(".c-information-pin").removeClass("resaltarAnimation");
      setTimeout(function(){
        $(".c-information-pin").addClass("resaltarAnimation");
      },100
      )
    })

    return $base;
  }
}
