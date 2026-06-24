let speed = 0;
let carX = window.innerWidth / 2;

const speedDisplay = document.querySelector(".speed");
const car = document.querySelector(".car");

setInterval(() => {

    speedDisplay.textContent =
        Math.round(speed) + " KM/H";

    car.style.left = carX + "px";

}, 50);

document.addEventListener("keydown", (e) => {

    // GAS
    if (e.key === "ArrowUp")
        speed += 5;

    // REM
    if (e.key === "ArrowDown")
        speed -= 5;

    // LINKS STUREN
    if (e.key === "ArrowLeft")
        carX -= 20;

    // RECHTS STUREN
    if (e.key === "ArrowRight")
        carX += 20;

    // Niet buiten beeld
    if (carX < 100)
        carX = 100;

    if (carX > window.innerWidth - 100)
        carX = window.innerWidth - 100;

    // Minimum snelheid
    if (speed < 0)
        speed = 0;

    // Maximum snelheid
    if (speed > 90)
        speed = 90;

});

const doneBtn = document.getElementById("doneBtn");

doneBtn.addEventListener("click", () => {

    // reset values
    speed = 0;
    carX = window.innerWidth / 2;

    // kleine effect (optioneel)
    document.body.style.transition = "0.3s";
    document.body.style.filter = "brightness(2)";

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 300);
});
