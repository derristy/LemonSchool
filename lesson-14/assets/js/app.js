$(window).on("scroll", () => {
    if($(window).scrollTop() >= 200){
        $(".scroll-up").addClass("show");
    } else {
        $(".scroll-up").removeClass("show");
    }
});

$(".scroll-up").on("click", () => {
    $(window).scrollTop(0);
});