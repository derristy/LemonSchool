$("[data-url]").each(function(){
    let element = $(this);

    $.ajax({
        beforeSend: function(){
            element.html("<div class=\"spinner-border mt-3\" role=\"status\"><span class=\"visually-hidden\">Loading...</span></div>");
        },
        url: element.attr("data-url"),
        dataType: "html",
        cache: false,
        success: function(data){
            element.html(data);
        },
        error: function(){
            element.html("<div class=\"alert alert-danger mt-3\" role=\"alert\">Homework load failed</div>");
        }
    });
});