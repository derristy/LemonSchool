const user_cards = {
    "homework-rostislav_suslov" : "HOMEWORK/dev-RostislavSuslov/user.html",
    "homework-dmitry_shumskiy" : "HOMEWORK/dev-DmitryShumskiy/user.html",
    "homework-kirill_shkaev" : "HOMEWORK/dev-KirillShkaev/user.html",
};
  
for (const [key, value] of Object.entries(user_cards)) {
    load_card(key, value);
}

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