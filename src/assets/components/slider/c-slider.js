class Slider {
  constructor(images) {
    this.images=images;
  }

  draw(){
    let $card=$("<div>",{
      "class":"c-slider"
    });
    let $carousel=$("<div>",{
      "id":"carouselExampleControls",
      "class":"carousel slide",
      "data-ride":"carousel"
    });
    let $carouselInner=$("<div>",{
      "class":"carousel-inner"
    });

    for (let i = 0; i < this.images.length; i++) {
      let $item=$("<div>",{
        "class":"carousel-item"
      });
      
      if(i==0){
        $item=$("<div>",{
          "class":"carousel-item active"
        });
      }
      
      let $img=$("<img>",{
        "class":'d-block w-100',
        "src":"http://localhost/nextrem/api/"+ this.images[i] + "?v=1"
      });
      $item.append($img);
      $carouselInner.append($item);
      
    }

    let $controlPrev=$("<a>",{
      "class":'carousel-control-prev',
      "href":'#carouselExampleControls',
      "role":'button',
      "data-slide":'prev'
    });
    $controlPrev.append($("<span>",{
      "class":'carousel-control-prev-icon',
      "aria-hidden":'true'
    }));
    $controlPrev.append($("<span>",{
      "html":"Previous",
      "class":'sr-only'
    }));
    let $controlNext=$("<a>",{
      "class":'carousel-control-next',
      "href":'#carouselExampleControls',
      "role":'button',
      "data-slide":'next'
    });
    $controlNext.append($("<span>",{
      "class":'carousel-control-next-icon',
      "aria-hidden":'true'
    }));
    $controlNext.append($("<span>",{
      "html":"Next",
      "class":'sr-only'
    }));

    $carousel.append($carouselInner);
    $carousel.append($controlPrev);
    $carousel.append($controlNext);

    $card.append($carousel);

    return $card;
  }
}
