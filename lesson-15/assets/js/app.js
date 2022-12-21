$(document).ready(() => {
    $('.first-screen-slider').slick({
        dots: true,
    });
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