window.onload = function () {
    setTimeout(function () {
        finPaginaCarga();
    }, 1200);
};

function finPaginaCarga() {
    $(".c-load").hide("slow");
    setTimeout(function () {
        $(".l-page").show();
    }, 500);
}