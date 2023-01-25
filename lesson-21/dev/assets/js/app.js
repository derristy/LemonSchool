window.addEventListener("DOMContentLoaded", () => {
    const navbar_burger = document.querySelector(".navbar-burger");
    const navbar_burger_item = document.querySelector(".navbar-burger__item");
    const navbar_menu = document.querySelector(".navbar-menu");
    const phone_dropdown__main = document.querySelector(".phone-dropdown__main");
    const phone_dropdown__btn = document.querySelector(".phone-dropdown__btn");
    const phone_dropdown__content = document.querySelector(".phone-dropdown__content");
    const border_example = document.querySelector(".border-example");
    const modal = document.querySelectorAll(".modal");
    
    modal.forEach((element) => {
        element.addEventListener("click", (event) => {
            
            if(event.target.classList.contains("modal")){
                modalClose(event.target.id);
            }
        });
    });
    
    if(navbar_burger){
        navbar_burger.addEventListener("click", () => {
            navbar_burger_item.classList.toggle("active");
            navbar_menu.classList.toggle("active");
        });
    }
    
    if(phone_dropdown__main){
        phone_dropdown__main.addEventListener("click", () => {
            phone_dropdown__btn.classList.toggle("active");
            phone_dropdown__content.classList.toggle("active");
            border_example.classList.toggle("active");
        
            if(border_example.classList.contains("active")){
                border_example.style = "background:rgb(145, 57, 57);";
            } else {
                border_example.style = "";
            }
        });
    }
});

const modalShow = (modalID) => {
    let element = document.querySelector("#"+modalID);
    
    element.classList.remove("hide");
    element.classList.add("show");
};

const modalClose = (modalID) => {
    let element = document.querySelector("#"+modalID);
    
    element.classList.add("hide");
    element.classList.remove("show");
};