$(window).on("scroll", () => {
    if($(window).scrollTop() >= 1000){
        $(".mariela--scroll-up").addClass("show")
    } else {
        $(".mariela--scroll-up").removeClass("show")
    }
});

$(".mariela--scroll-up").on("click", () => {
    $(window).scrollTop(0);
});