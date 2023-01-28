const floor = document.querySelectorAll(".floor");

floor.forEach(element => {
    element.addEventListener("mouseover", () => {
        element.classList.add("fill");
    });

    element.addEventListener("mouseout", () => {
        element.classList.remove("fill");
    });
});