class ListView{
    constructor(columns,rows,lastRow){        
        this.columns=columns;
        this.rows=rows;
        this.lastRow=lastRow;
        this.total=0;
    }

    // draw(){
    //     let $base = $("<table>",{
    //         "class":"c-listView"
    //     });

    //     let $tHead=$("<thead>",{
    //         "class":"c-listView__titles"
    //     });

    //     for(let column of this.columns){
    //         let $title=$("<th>",{
    //             "class":"tab-title tab-title--"+column,
    //             "html":column
    //         });
    //         $tHead.append($title);
    //     }
        
    
    //     //$tHead.append([$titPriduct,$titPrice,$titCantidad,$titSubtotal,$titButtons]);

    //     let $tbody=$("<tbody>",{
    //         "class":"c-listView__body"
    //     });

    //     for(let row of this.rows){
            
    //         let $row=$("<tr>",{});
    //         let $col1 =$("<td>",{
    //             "data-th":this.columns[0]
    //         });
    //         let $container=$("<div>",{
    //             "class":"row"
    //         });
    //         let $image =$("<img>",{
    //             "class":"listImg",
    //             "src":"assets/img/" +row.image
    //         });
    //         let $desc=$("<div>",{
    //             "class":"description"
    //         });
    //         let $name=$("<div>",{
    //             "class":"product-title",
    //             "html":row.title
    //         });
    //         let $summary=$("<div>",{
    //             "class":"product-description",
    //             "html":row.summary
    //         });
    //         $desc.append([$name,$summary]);
    //         $container.append([$image,$desc]);
    //         $col1.append($container);
            
    //         let $col2=$("<td>",{
    //             "data-th":this.columns[1],
    //             "html":row.price
    //         });
    
    //         let $col3=$("<td>",{
    //             "data-th":this.columns[2]
    //         });
    //         let $spinner =$("<input>",{
    //             "type":"",
    //             "value":1,
    //             "class":"plazas"
    //         });
    
    //         $col3.append($spinner);
    

    //         let subtotal=row.price*$spinner.value;

    //         let $col4=$("<td>",{
    //             "data-th":this.columns[3],
    //             "html":row.price
    //         });
    
    //         let $col5=$("<td>",{
    //             "data-th":this.columns[4]
    //         });
    //         let $modify=$("<div>",{
    //             "style":"background: red"
    //         }).append($("<i>",{
    //             "class":"fa fa-edit"
    //         }));
    //         let $delete=$("<div>",{
    //             "style":"background: green"
    //         }).append($("<i>",{
    //             "class":"fa fa-trash"
    //         }));
    
    //         $col5.append([$modify,$delete]);
    
    //         $row.append([$col1,$col2,$col3,$col4,$col5]);
    
    //         this.total+=row.price;

    //         $tbody.append($row);
    //     }
    //     let $tfoot=$("<tfoot>",{
    //         "class":"c-listView__foot"
    //     });

    //     let $lastRow=$("<tr>",{});
    //     let $shopping=$("<td>",{}).append("<div>",{
    //         "class":"button"
    //     }).append("<i>",{
    //         "class":"fa fa-shopping-cart"
    //     });
    //     let $finish=$("<td>",{}).append("<div>",{
    //         "class":"button",
    //         "html":"Buy"
    //     }).append("<i>",{
    //         "class":""
    //     });
        

    //     let $total=$("<td>",{
    //         "html":"Total: "+this.total+"€"
    //     });
    //     $lastRow.append($shopping,$total,$finish);
    //     $tfoot.append($lastRow);
    //     $base.append([$tHead,$tbody,$tfoot]);

    //     return $base;
    // }

    draw(){
        let $base=$("<div>",{
            "class":"c-listView"
        });
        let $titles=$("<div>",{
            "class":"c-header"
        });
        for(let i=0; i<this.columns.length;i++){
            let $title=$("<div>",{
                "class":"c-header__title--"+this.columns[i].toLowerCase(),
                "html":this.columns[i]
            });
            $titles.append($title);
        }
        $base.append($titles);
        for(let row of this.rows){
            
            let $item=$("<div>",{
                "class":"c-listView__item"
            });
            let $listItem=$("<div>",{
                "class":"list-item"
            });
            for(let column of this.columns){
                
                let $column=$("<div>",{
                    "class":"list-item__column"
                });
                
                
                if(column.toLowerCase()=="producto"){
                    
                    $column=$("<div>",{
                        "class":"list-item__column--product"
                    });
                    let $img=$("<img>",{
                        "class":"product-image",
                        "src":"assets/img/" + row.image
                    });
                    let $title=$("<div>",{
                        "class":"product-title",
                        "html":row.title
                    });
                    let $desc=$("<div>",{
                        "class":"product-desc",
                        "html":row.summary
                    });
                    $column.append([$img,$title,$desc]);
                }else{
                    $column=$("<div>",{
                        "class":"list-item__column"
                    });
                    if(column.toLowerCase()=="precio"){
                        $column=$("<div>",{
                            "class":"list-item__column--precio",
                            "html":row.price
                        });
                        this.total+=parseFloat(row.price);
                    }else if(column.toLowerCase()=="plazas"){
                        $column=$("<div>",{
                            "class":"list-item__column--plazas"
                        });
                        $column.append($("<input>",{
                            "class":"product-plazas",
                            "value":1
                        }));
                    }else if(column.toLowerCase()=="subtotal"){
                        $column=$("<div>",{
                            "class":"list-item__column--subtotal",
                            "html":row.price
                        });
                    }else if(column.toLowerCase()==""){
                        let $delete=$("<div>",{
                            "class":"button--delete"
                        }).append($("<i>",{
                            "class":"fa fa-trash"
                        }));
                        let $modify=$("<div>",{
                            "class":"button--modify"
                        }).append($("<i>",{
                            "class":"fa fa-edit"
                        }));
                        $column.append([$modify,$delete]);
                    }

                    
                }
                $listItem.append($column);
            }
            $item.append($listItem);
            $base.append($item);
        }

        let $footer=$("<div>",{
            "class":"c-foot"
        });
        let text="Total: "+this.total+"€";
        for(let item of this.lastRow){
            
            let $item=$("<div>",{
                "class":item.class
            });
            if(item.hasOwnProperty("icon")){
                $item.append($("<i>",{
                    "class":item.icon
                }))
            }else{
                $item=$("<div>",{
                    "class":item.class,
                    "html":text
                });
            }
            
            $footer.append($item);
        }
        $base.append($footer);
        return $base;

    }
}