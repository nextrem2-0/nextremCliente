function finPaginaCarga() {
    $(".c-load").hide("slow");
    setTimeout(function () {
        $(".l-page").show();
        if (localStorage.getItem('compra') == 1) {
            localStorage.setItem('compra', 0);
            notificacionCompra();
        }else if(localStorage.getItem('editar') == 1) {
            localStorage.setItem('editar', 0);
            notificacionGuardarCambios();
        }else if(localStorage.getItem('user_token') != null) {
            notificacionBienvenida();
        }

    }, 500);
} 
