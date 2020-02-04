class ListView {
    constructor(carrito, columns, rows, lastRow, modifier) {
        this.carrito = carrito;
        this.columns = columns;
        this.rows = rows;
        this.lastRow = lastRow;
        this.total = 0;
        this.modifier = modifier;
    }

    draw() {
        let $base = $("<div>", {
            "class": "c-listView " + this.modifier
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
            if (this.columns[i].toLowerCase() != "perfil") {
                let $title = $("<div>", {
                    "class": "c-header__title--" + this.columns[i].toLowerCase(),
                    "html": this.columns[i]
                });
                $titles.append($title);
            }

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
                        "src": "assets/img/" + "evento3.jpg"
                    });

                    if (row.image != null) {
                        $img = $("<img>", {
                            "class": "product-image",
                            "src": "assets/img/" + row.image
                        });
                    }
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
                        $column.append($("<div>", {
                            "class": "product-plazas",
                            "html": row.plazas
                        }));
                    } else if (column.toLowerCase() == "subtotal") {

                        let subtotal = row.plazas * parseFloat(row.price);
                        $column = $("<div>", {
                            "class": "list-item__column--subtotal",
                            "html": subtotal + "€"
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

                        let self = this;
                        $delete.on("click", function () {

                            self.total = self.total - parseFloat(row.price);
                            $(".total-price").text("Total " + self.total + "€");
                            $delete.parent().parent().parent().remove();

                            self.carrito.eliminarEvento(row);
                            $(".total-price").html("Total: " + self.calcularTotal() + "€");
                            if (self.carrito.numEventos() == 0) {
                                cargarInicio();
                            }
                        });

                        let $modify = $("<div>", {
                            "class": "but but--modify"
                        }).append($("<i>", {
                            "class": "fa fa-edit"
                        }));

                        $modify.on("click", function () {
                            let plazas = $modify.parent().parent().find($(".product-plazas"));

                            let modal = new Modal("Editar Evento", row.imprimirProducto(), function () {
                                plazas.html(parseInt($("#plazas").val()));

                                let subtotal = parseFloat(plazas.text()) * parseFloat(row.price);
                                let rowSubtotal = $modify.parent().parent().find($(".list-item__column--subtotal"));

                                rowSubtotal.html(subtotal + "€");

                                $(".total-price").html("Total: " + self.calcularTotal() + "€");
                            }, "Guardar");

                            let $mod = modal.draw();
                            $("#modal").append($mod);
                            $mod.show();

                        });

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

            if (item != null) {
                let $item = $("<div>", {
                    "class": item.class
                });
                if (item.hasOwnProperty("html")) {
                    $item.html(item.html);
                    $item.attr('id', item.id);

                    let func = this[item.id + "Action"];
                    $item.on("click", function () {
                        func.apply();
                    })

                } else {
                    $item = $("<div>", {
                        "class": item.class,
                        "html": text
                    });
                }
                $footer.append($item);
            }
        }

        $base.append($line2);
        $base.append($footer);
        return $base;

    }
    seguirComprandoAction() {
        cargarEventos();
    }

    tramitarPedidoAction() {
        $.ajax({
            url: rutaPublic+"addCarrito",
            data: {idUsuario: localStorage.getItem('idUser'), confirmado:1},
            headers: { 'Content-Type': 'application/json' },
            success: function (dataResult) {
                localStorage.setItem('compra', 1);
                carrito.eliminarTodosEvento();
                location.reload();
            },
            error: function (error) {
                let $not = new Notification("danger", "Error!", "No se ha podido guardar");
                $("#notificaciones").append($not.draw());
            }
        });
    }

    calcularTotal() {
        let subtotalPrecio = $(".list-item__column--subtotal")
        let subtotalTotal = 0;

        $(subtotalPrecio).each(function () {
            subtotalTotal += parseFloat($(this).html().slice(0, -1));
        });

        this.total = subtotalTotal;
        return this.total
    }
}