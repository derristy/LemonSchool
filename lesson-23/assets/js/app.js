const floor = document.querySelectorAll(".floor");

floor.forEach(element => {
    element.addEventListener("click", () => {
        element.style = "fill: red";
    });
});