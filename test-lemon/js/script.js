load_card("homework-rostislav_suslov", "HOMEWORK/dev-RostislavSuslov/user.html");
load_card("homework-dmitry_shumskiy", "HOMEWORK/dev-DmitryShumskiy/user.html");
load_card("homework-kirill_shkaev", "HOMEWORK/dev-KirillShkaev/user.html");

function load_card(user_id, user_url){

    let element = $("#" + user_id);

    $.ajax({
        beforeSend: function(){
            element.html("<div class=\"spinner-border mt-3\" role=\"status\"><span class=\"visually-hidden\">Loading...</span></div>");
        },
        url: user_url,
        dataType: "html",
        cache: true,
        success: function(data){
            element.html(data);
        },
        error: function(){
            element.html("<div class=\"alert alert-danger mt-3\" role=\"alert\">Homework load failed</div>")
        }
    });
}