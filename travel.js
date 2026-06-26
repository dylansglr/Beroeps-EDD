
// GET DESTINATION
const params = new URLSearchParams(window.location.search);
const dest = decodeURIComponent(params.get("dest") || "").trim();

// AFTER 4 SEC → ARRIVAL SCREEN
setTimeout(() => {

    document.getElementById("status").textContent = "ARRIVED";

    const arrived = document.getElementById("arrived");
    arrived.textContent = dest ? `You've reached ${dest}` : "No destination selected";
    arrived.style.opacity = 1;

    const btn = document.getElementById("backBtn");
    btn.style.opacity = 1;

}, 4500);

// BACK BUTTON
document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "dashboard.html";
});
