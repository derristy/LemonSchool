const navbar_burger = document.querySelector(".navbar-burger");
const navbar_burger_item = document.querySelector(".navbar-burger__item");
const navbar_menu = document.querySelector(".navbar-menu");
const phone_dropdown__main = document.querySelector(".phone-dropdown__main");
const phone_dropdown__btn = document.querySelector(".phone-dropdown__btn");
const phone_dropdown__content = document.querySelector(".phone-dropdown__content");
const border_example = document.querySelector(".border-example");

navbar_burger.addEventListener("click", () => {
    navbar_burger_item.classList.toggle("active");
    navbar_menu.classList.toggle("active");
});

phone_dropdown__main.addEventListener("click", () => {
    phone_dropdown__btn.classList.toggle("active");
    phone_dropdown__content.classList.toggle("active");
    border_example.classList.toggle("active");
});