class ListView {
    constructor(columns, rows, lastRow) {
        this.columns = columns;
        this.rows = rows;
        this.lastRow = lastRow;
        this.total = 0;
    }

    draw() {
        let $base = $("<div>", {
            "class": "c-listView"
        });
        let $titles = $("<div>", {
            "class": "c-header"
        });
        let $line = $("<div>", {
            "class": "c-line"
        });

        let $line2 = $("<div>", {
            "class": "c-line c-line--footer"
        });

        for (let i = 0; i < this.columns.length; i++) {
            let $title = $("<div>", {
                "class": "c-header__title--" + this.columns[i].toLowerCase(),
                "html": this.columns[i]
            });
            $titles.append($title);
        }
        $base.append($titles);
        $base.append($line);

        let $grupoItem = $("<div>", {
            "class": "grupo"
        });

        for (let row of this.rows) {

            let $item = $("<div>", {
                "class": "c-listView__item"
            });
            let $listItem = $("<div>", {
                "class": "list-item"
            });
            for (let column of this.columns) {

                let $column = $("<div>", {
                    "class": "list-item__column"
                });

                if (column.toLowerCase() == "producto") {

                    $column = $("<div>", {
                        "class": "list-item__column--product"
                    });
                    let $img = $("<img>", {
                        "class": "product-image",
                        "src": "assets/img/" + row.image
                    });
                    let $title = $("<div>", {
                        "class": "product-title",
                        "html": row.title
                    });
                    let $desc = $("<div>", {
                        "class": "product-desc",
                        "html": row.summary
                    });
                    $column.append([$img, $title, $desc]);
                } else {
                    $column = $("<div>", {
                        "class": "list-item__column"
                    });
                    if (column.toLowerCase() == "precio") {
                        $column = $("<div>", {
                            "class": "list-item__column--precio",
                            "html": row.price + "€"
                        });
                        this.total += parseFloat(row.price);
                    } else if (column.toLowerCase() == "plazas") {
                        $column = $("<div>", {
                            "class": "list-item__column--plazas"
                        });
                        $column.append($("<input>", {
                            "class": "product-plazas",
                            "value": 1
                        }));
                    } else if (column.toLowerCase() == "subtotal") {
                        $column = $("<div>", {
                            "class": "list-item__column--subtotal",
                            "html": row.price + "€"
                        });
                    } else if (column.toLowerCase() == "") {
                        $column = $("<div>", {
                            "class": "list-item__column--buttons"
                        });
                        let $delete = $("<div>", {
                            "class": "but but--delete"
                        }).append($("<i>", {
                            "class": "fa fa-trash"
                        }));

                        $delete.on("click", function () {
                            console.log(this.total);
                            this.total = this.total - parseFloat(row.price);
                            console.log(parseFloat(row.price));
                            console.log(this.total);
                            console.log($(".total-price").text());
                            $(".total-price").text(this.total);
                            $delete.parent().parent().parent().remove();
                        });

                        let $modify = $("<div>", {
                            "class": "but but--modify"
                        }).append($("<i>", {
                            "class": "fa fa-edit"
                        }));
                        $column.append([$modify, $delete]);
                    }
                }
                $listItem.append($column);
            }
            $item.append($listItem);
            $grupoItem.append($item);
        }

        $base.append($grupoItem);

        let $footer = $("<div>", {
            "class": "c-foot"
        });
        let text = "Total: " + this.total + "€";
        for (let item of this.lastRow) {

            let $item = $("<div>", {
                "class": item.class
            });
            if (item.hasOwnProperty("html")) {
                $item.html(item.html);
            /* }
            if (item.hasOwnProperty("icon")) {
                $item.append($("<i>", {
                    "class": item.icon
                })) */
            } else {
                $item = $("<div>", {
                    "class": item.class,
                    "html": text
                });
            }

            $footer.append($item);
        }
        $base.append($line2);
        $base.append($footer);
        return $base;

    }
}