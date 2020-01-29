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
          'class' : 'c-information-pin c-information-pin--no-borders@mobile c-information-pin--size-s@mobile',
      });
    }else{
      $base=$('<div>', {
          'class' : 'c-information-pin'+this.modifier,
      });
    }

    $base.append($('<div>', {
        'class' : 'c-information-pin__image',
    }).append($("<i>",{
      "class":this.image 
    })));
    $base.append($('<div>', {
        'html' : this.title,
        'class' : 'c-information-pin__title c-information-pin__title--font-size-xs@mobile',
    }));
    $base.append($('<div>', {
        'html' : this.content,
        'class' : 'c-information-pin__content c-information-pin__content--font-size-xs@mobile',
    }));

   

    $(document).on("mouseover", ".c-information-pin", function () {
      var pin = $(".c-information-pin");
      pin.addClass("blurAnimation blurAnimation@mobile");
      $(this).addClass("resaltarAnimation resaltarAnimation@mobile");
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
