function finPaginaCarga() {
    $(".c-load").hide("slow");
    setTimeout(function () {
        $(".l-page").show();
        if (localStorage.getItem('user_token') != null) {
            notificacionBienvenida();
        }
    }, 500);
} 
