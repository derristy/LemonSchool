const floor = document.querySelectorAll(".floor");

floor.forEach(element => {
    element.addEventListener("mouseover", () => {
        let floors_id = document.querySelector(element.getAttribute("data-floors-id"));
        let rooms_id = document.querySelector(element.getAttribute("data-rooms-id"));
        floors_id.innerHTML = element.getAttribute("data-floors");
        rooms_id.innerHTML = element.getAttribute("data-rooms");
    });

    element.addEventListener("mouseout", () => {
        let floors_id = document.querySelector(element.getAttribute("data-floors-id"));
        let rooms_id = document.querySelector(element.getAttribute("data-rooms-id"));
        floors_id.innerHTML = 0;
        rooms_id.innerHTML = 0;
    });
});