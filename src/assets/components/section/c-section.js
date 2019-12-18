class Section {
  constructor(layout, innerComponents,title,modifier=null) {
    this.layout=layout;
    this.innerComponents=innerComponents;
    this.modifier=modifier;
    this.title=title;
  }

  draw(){
    let $card=$("<div>",{
      "class":"c-section"
    });
    let $title=$("<div>",{
      "html":this.title,
      "class":"c-section__title"
    });
    let $content=$("<div>",{
      "class":"c-section__content"
    });
    let $mask=$("<div>",{
      "class":"c-section__mask"
    });
    let $layout=$("<div>",{
      "class":this.layout
    });
    if(this.modifier!=null){
      $layout=$("<div>",{
        "class":this.layout+" "+this.modifier
      });
    }
    

    for (let component of this.innerComponents) { 
      console.log(this.innerComponents);
           
      let $litem=$("<div>",{
        "class":this.layout+"__item"
      });
      $litem.append(component.draw());
      $layout.append($litem);
    }
    $content.append($layout);

    $card.append($title);
    $card.append($content);
    $card.append($mask);

    return $card;
  }
}
