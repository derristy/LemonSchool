$(document).ready(() => {
    $("body").removeClass("load");

    $('.first-screen-slider').slick({
        dots: true,
        autoplay: true,
        responsive: [{
            breakpoint: 992,
            settings: {
                arrows: false
            }
        }]
    });

    $('.delivery-slider').slick({
        dots: false,
        arrows: true,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                variableWidth: true,
              }
            },
          ]
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
        if(!element.hasClass("slick-initialized")){
            element.slick({
                arrows: false,
                dots: true,
                autoplay: true,
                mobileFirst: true
            });
        }
    } else {
        if(element.hasClass("slick-initialized")){
            element.slick("unslick");
        }
    }
}
