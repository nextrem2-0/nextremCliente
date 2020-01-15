class Section {
  constructor(layout, innerComponents, title, ...modifier) {
    this.layout = layout;
    this.innerComponents = innerComponents;
    this.modifier = modifier;
    this.title = title;
  }

  draw() {
    let $base = $("<div>", {
      "class": "c-section"
    });
    let $title;
    if (this.title != null) {
      $title = $("<div>", {
        "html": this.title,
        "class": "c-section__title"  
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
