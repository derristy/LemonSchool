const navbar_burger = document.querySelector(".navbar-burger");
const navbar_burger_item = document.querySelector(".navbar-burger__item");
const navbar_menu = document.querySelector(".navbar-menu");

navbar_burger.addEventListener("click", () => {
    navbar_burger_item.classList.toggle("active");
    navbar_menu.classList.toggle("active");
});