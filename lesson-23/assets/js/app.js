const floor = document.querySelectorAll(".floor");
let floors = document.querySelector(".floors span");
let rooms = document.querySelector(".rooms span");

floor.forEach(element => {
    element.addEventListener("mouseover", () => {
        // element.classList.add("fill");
        floors.innerHTML = element.getAttribute("data-floors");
        rooms.innerHTML = element.getAttribute("data-rooms");
    });

    element.addEventListener("mouseout", () => {
        // element.classList.remove("fill");
        floors.innerHTML = 0;
        rooms.innerHTML = 0;
    });
});