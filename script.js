const slider = document.getElementById("slider");
const needle = document.getElementById("needle");
const speed = document.getElementById("speed");

slider.addEventListener("input", () => {
    const value = Number(slider.value);

    // 0 = -90° (links) | 500 = +90° (rechts)
    const angle = (value / 500) * 180 - 90;

    needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;

    speed.textContent = `${value} km/u`;
});