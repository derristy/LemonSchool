const floor = document.querySelectorAll(".floor");
let floors = document.querySelector(".floors span");
let rooms = document.querySelector(".rooms span");

floor.forEach(element => {
    element.addEventListener("mouseover", () => {
        floors.innerHTML = element.getAttribute("data-floors");
        rooms.innerHTML = element.getAttribute("data-rooms");
    });

    element.addEventListener("mouseout", () => {
        floors.innerHTML = 0;
        rooms.innerHTML = 0;
    });
});