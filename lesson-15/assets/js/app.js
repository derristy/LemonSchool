$(document).ready(() => {
    $('.first-screen-slider').slick({
        dots: true,
    });

    advantages_slider();
});

$(window).on("resize", () => {
    advantages_slider();
});

$("#step1-file-btn").on("click", () => {
    $("#step1-file").click();
});

$("#step1-file").on("change", () => {
    let file = $("#step1-file").prop("files");

    $("#step1-file-name").html("");

    $.each(file, function(key, value) {
        $("#step1-file-name").append("<p data-prop-key=\""+key+"\">"+value["name"]+"</p>");
    });
});

function advantages_slider(){
    let element = $('.advantages .row');

    if($(window).width() <= 992){
        element.slick({
            arrows: false,
            dots: true,
            mobileFirst: true
        });
    } else {
        element.slick("unslick");
    }
}
