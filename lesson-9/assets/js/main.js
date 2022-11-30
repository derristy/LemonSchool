let menu_toggle = document.querySelector(".menu-toggle");
let navbar_nav = document.querySelector(".navbar-nav");

menu_toggle.addEventListener("click", function(){
    navbar_nav.classList.toggle("active");
});