class Section {
  constructor(layout, innerComponents, title, sectionModifier = null,...modifier) {
    this.layout = layout;
    this.innerComponents = innerComponents;
    this.modifier = modifier;
    this.sectionModifier = sectionModifier;
    this.title = title;
  }

  draw() {
    let $base = $("<div>", {
      "class": "c-section"
    });

    if(this.sectionModifier != null){
      
      $base = $("<div>", {
        "class": "c-section " + this.sectionModifier
      });
    }

    let $title;
    if (this.title != null) {
      $title = $("<div>", {
        "html": this.title,
        "class": "c-section__title c-section__title--font-size-m@mobile"  
      });
      
    }

    let $content = $("<div>", {
      "class": "c-section__content"
    });
    let $mask = $("<div>", {
      "class": "c-section__mask"
    });
    let $layout = $("<div>", {
      "class": this.layout
    });
    if (this.modifier.length != 0) {
      let clas = this.layout;
      this.modifier.forEach(mod => {
        clas += " " + mod;
      });

      $layout = $("<div>", {
        "class": clas
      });
    }

    if (this.layout == "l-dual") {

      let $item1 = $("<div>", {
        "class": "l-dual__item l-dual__item--derecha",
      });
      let $item2 = $("<div>", {
        "class": "l-dual__item l-dual__item--izquierda",
      });

      let comp1 = this.innerComponents[0];
      if (comp1 instanceof jQuery) {
        $item1.append(comp1);
      } else {
        $item1.append(comp1.draw());

      }

      let comp2 = this.innerComponents[1];
      if (comp2 instanceof jQuery) {
        $item2.append(comp2);

      } else {
        $item2.append(comp2.draw());
      }

      $layout.append($item1, $item2);

    } else if (this.layout == "l-perfil") {

      for (let component of this.innerComponents) {
        let $litem = $("<div>", {
          "class": this.layout + "__item"
        });

        if (component.hasClass("perfil-img")) {
          $litem = $("<div>", {
            "class": this.layout + "__item " + this.layout + "__item--img"
          });
        } else if (component.hasClass("perfil-gestion")) {
          $litem = $("<div>", {
            "class": this.layout + "__item " + this.layout + "__item--gestion"
          });
        }else if (component.hasClass("perfil-titulo")) {
          $litem = $("<div>", {
            "class": this.layout + "__item " + this.layout + "__item--titulo"
          });
        }else if (component.hasClass("perfil-content")) {
          $litem = $("<div>", {
            "class": this.layout + "__item " + this.layout + "__item--content"
          });
        }

        $litem.append(component);
        $layout.append($litem);
      }

      

    }else if(this.layout == "l-horizontal"){
      
      let visible = 1; //Set the number of items that will be visible
      let index = 0; //Starting index
      let endIndex = (3 / visible) - 1;
      let $arRight=$("<div>",{
        "id":"arrowR",
        "html":">",
        "class":this.layout+"__item--buttonRight"
      });
      $('div#arrowR').click(function() {
        var $item = $('.l-horizontal__item');
        if (index < endIndex) {
            index++;
            $item.animate({ 'left': '-=360px' });//Set width of your div here
        }else if(index==endIndex){
            index=0;
            $item.animate({ 'left': '0px' });
        }
    });
    let $arrLeft=$("<div>",{
      
      "id":"arrowL",
      "html":"<",
      "class":this.layout+"__item--buttonLeft"
    });
    $('div#arrowL').click(function() {
      let $item = $('.l-horizontal__item');
      if (index > 0) {
          index--;
          $item.animate({ 'left': '+=360px' });//Set width of your div here
      }else if(index==0){
        console.log($item.length);
        
        index=2;
        $item.animate({ 'left': '-='+360*2+"px" });
    }
  });
      $layout.append([$arrLeft]);
      let $itemsContainer=$("<div>",{
        "class":"l-horizontal__items-container"
      });
      for (let component of this.innerComponents) {
        let $litem = $("<div>", {
          "class": this.layout + "__item"
        });

        if (component instanceof jQuery) {
          $litem.append(component);
        } else {
          $litem.append(component.draw());
        }

        $itemsContainer.append($litem);
      }
      
      $layout.append($itemsContainer);
      $layout.append([$arRight]);
      
    } else {
      for (let component of this.innerComponents) {
        let $litem = $("<div>", {
          "class": this.layout + "__item"
        });

        if (component instanceof jQuery) {
          $litem.append(component);
        } else {
          $litem.append(component.draw());
        }

        $layout.append($litem);
      }
    }

    $content.append($layout);

    $base.append($title);
    $base.append($content);
    $base.append($mask);

    return $base;
  }


}
