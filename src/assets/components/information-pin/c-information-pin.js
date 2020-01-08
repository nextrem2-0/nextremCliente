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
      // "style":"color:#518f7f",
      "style":"color:#7f0707" 
    })));
    $base.append($('<div>', {
        'html' : this.title,
        'class' : 'c-information-pin__title',
    }));
    $base.append($('<div>', {
        'html' : this.content,
        'class' : 'c-information-pin__content',
    }));

   

    $(document).on("mouseover", ".c-information-pin", function () {
      var pin = $(".c-information-pin");
      pin.addClass("blurAnimation");
      $(this).addClass("resaltarAnimation");
      $(this).removeClass("blurAnimation");
        
    });

    $(document).on("mouseout", ".c-information-pin", function () {
      var pin = $(".c-information-pin");
      pin.removeClass("resaltarAnimation");
      pin.removeClass("blurAnimation");
    });

    return $base;
  }
}
