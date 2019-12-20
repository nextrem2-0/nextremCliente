class Menu {
  constructor(categories,sports,events) {
    this.categories=categories;
    this.sp=sports;
    this.events=events;
  }

  draw(){
    let $base=$('<div>', {
      'class' : 'c-menu',
    });
    for(let i=0;i<this.categories.length;i++){ 
      let $option;
      if(i==1){ 
        $option=$('<div>', {
          'html' : this.categories[i],
          'class' : 'c-menu__opcion c-menu__opcion--right',
        });
      }else if(this.categories[i]=="indice"){
        
        $option=$('<img>', {
          //"src":"http://localhost/nextrem/api/",
          "src":"assets/img/nextrem.png",
          'class' : 'c-menu__opcion',
        });
      }else{
        $option=$('<div>', {
          'html' : this.categories[i],
          'class' : 'c-menu__opcion', 
        });
      }
      if($option.html()=="deportes"){
        $base.append(this.drawSports($base));
        
        $option.on("mouseenter",function(){
          
            $(".c-submenu--sports").show();
          
          $base.addClass("c-menu--extended");
        });

        $base.on("mouseleave",function(){
          $base.removeClass("c-menu--extended");
          $(".c-submenu--sports").hide();
        });
        
        
        
        
       }//else if($option.html()=="eventos"){
      //   $base.append(this.drawEvents($base));
      //   $option.on("mouseover",function(){
      //     $(".c-submenu--events").show();
      //     $base.toggleClass("c-menu--extended");
      //   });
      //   $option.on("mouseout",function(){
      //     $(".c-submenu--events").hide();
      //     $base.toggleClass("c-menu--extended");
      //   });
        
      // }
      
      $base.append($option);
    }
    $(".c-submenu--sports").hide();
    $(".c-submenu--events").hide();
    return $base;
  }

  drawSports($base){
    let $submenu=$("<div>",{
      "class":"c-submenu c-submenu--sports"
    });
    for (const key of this.sp) {
      let $subOpt=$("<div>",{
        "html":key,
        "class":"c-menu__suboption"
      });
      $submenu.append($subOpt);
    }
    
    return $submenu;
  }

  drawEvents($base){
    let $submenu=$("<div>",{
      "class":"c-submenu c-submenu--events"
    });
    for (const key of this.events) {
      let $subOpt=$("<div>",{
        "html":key,
        "class":"c-menu__suboption"
      });
      $submenu.append($subOpt);
    }
    
    return $submenu;
  }
}
