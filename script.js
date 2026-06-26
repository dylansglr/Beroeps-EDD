document.addEventListener("DOMContentLoaded", () => {

    // -------------------------
    // STATE
    // -------------------------
    let choiceMade = false;
    let speed = 0;
    let accelerating = false;
    let braking = false;
    let readyMode = false;
    let destination = "";
    let destinationConfirmed = false;

    // -------------------------
    // DOM ELEMENTS
    // -------------------------
    const choiceModal = document.getElementById("choiceModal");
    const timeTravelBtn = document.getElementById("timeTravelChoice");
    const driveBtn = document.getElementById("driveChoice");

    const pedals = document.querySelectorAll(".pedal");
    const brakePedal = pedals[0];
    const gasPedal = pedals[1];

    const lights = document.querySelectorAll(".light");
    const speedCircle = document.querySelector(".speed-circle");

    // -------------------------
    // CHOICE MENU
    // -------------------------
    function showChoiceMenu() {
        if (choiceMade) return;
        choiceModal.style.display = "flex";
    }

    window.showChoiceMenu = showChoiceMenu;

    timeTravelBtn.addEventListener("click", () => {
    choiceMade = true;
    choiceModal.style.display = "none";

    // Focus direct op het Destination Time display
    const firstInput = document.querySelector(".input-red");
    if (firstInput) {
        firstInput.focus();
    }
    destinationConfirmed = false;
    const msg = document.getElementById("travelMessage");
    if (msg) {
        msg.textContent = "GO";
        msg.disabled = false;
        msg.style.opacity = "1";
        msg.style.cursor = "pointer";
    }
});

    driveBtn.addEventListener("click", () => {
    choiceMade = true;
    choiceModal.style.display = "none";
    const values = [...document.querySelectorAll(".input-red")]
    .map(input => input.value.trim());

destination = values.join(" ");
    window.location.href = "drive.html";
});

    // -------------------------
    // PEDALS
    // -------------------------
    gasPedal.addEventListener("mousedown", () => {
        accelerating = true;
        window.showChoiceMenu();
    });

    gasPedal.addEventListener("mouseup", () => accelerating = false);
    gasPedal.addEventListener("mouseleave", () => accelerating = false);

    brakePedal.addEventListener("mousedown", () => {
        braking = true;
    });

    brakePedal.addEventListener("mouseup", () => braking = false);
    brakePedal.addEventListener("mouseleave", () => braking = false);

    // -------------------------
    // LIGHT SYSTEM (88 MPH LOGIC)
    // -------------------------
    function updateLights() {
        const red = lights[0];
        const yellow = lights[1];
        const green = lights[2];

        red.style.opacity = "0.3";
        yellow.style.opacity = "0.3";
        green.style.opacity = "0.3";

        red.style.boxShadow = "none";
        yellow.style.boxShadow = "none";
        green.style.boxShadow = "none";

        if (speed < 60) {
            red.style.opacity = "1";
            red.style.boxShadow = "0 0 15px red";
        }
        else if (speed < 88) {
            yellow.style.opacity = "1";
            yellow.style.boxShadow = "0 0 20px orange";
            yellow.style.transform = `scale(${1 + Math.sin(Date.now() / 200) * 0.05})`;
        }
        else {
            green.style.opacity = "1";
            green.style.boxShadow = "0 0 30px lime";
            green.style.transform = `scale(${1 + Math.sin(Date.now() / 100) * 0.1})`;
        }
    }

    // -------------------------
    // READY MODE (88 MPH)
    // -------------------------
    function triggerReadyMode() {
        const overlay = document.createElement("div");

        overlay.style.position = "fixed";
        overlay.style.top = "50%";
        overlay.style.left = "50%";
        overlay.style.transform = "translate(-50%, -50%)";
        overlay.style.fontSize = "3rem";
        overlay.style.color = "lime";
        overlay.style.zIndex = "999999";
        overlay.style.pointerEvents = "none";
        overlay.style.textAlign = "center";
        overlay.style.textShadow = "0 0 20px lime";

        overlay.textContent = "88 MPH - READY TO TIME TRAVEL";

        document.body.appendChild(overlay);

        setTimeout(() => overlay.remove(), 2000);
    }
// countdown function
    function startCountdown(callback) {

    const overlay = document.createElement("div");

    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "black";
    overlay.style.color = "cyan";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.fontSize = "6rem";
    overlay.style.zIndex = "9999999";

    document.body.appendChild(overlay);

    let count = 3;

    overlay.textContent = "READY";

    setTimeout(() => {

        const interval = setInterval(() => {

            if (count > 0) {
                overlay.textContent = count;
                count--;
            } else {
                clearInterval(interval);
                overlay.textContent = "TIME TRAVELLING...";
            }

        }, 1000);

        setTimeout(() => {
            overlay.remove();
            callback();
        }, 4000);

    }, 1000);
}
    // -------------------------
    // SPEED LOOP
    // -------------------------
    setInterval(() => {

        if (accelerating) {
            speed += 2.5;
        } else {
            speed -= 1;
        }

        if (braking) {
            speed -= 5;
        }

        if (speed < 0) speed = 0;
        if (speed > 140) speed = 140;

        // UI
        if (speedCircle) {
            speedCircle.textContent = Math.round(speed);
        }

        updateLights();

        // 88 MPH TRIGGER
        if (speed >= 88 && !readyMode) {
            readyMode = true;

startCountdown(() => {
                 // screen flash + shake effect before travel
document.body.style.transition = "0.1s";
document.body.style.filter = "brightness(2) contrast(2)";

let shakeCount = 0;

const shake = setInterval(() => {
    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 20;

    document.body.style.transform = `translate(${x}px, ${y}px)`;

    shakeCount++;

    if (shakeCount > 10) {
        clearInterval(shake);
        document.body.style.transform = "none";

        if(!destinationConfirmed){
            return;
        }
        window.location.href =
            "travel.html?dest=" + encodeURIComponent(destination || "UNKNOWN");
    }
}, 50);
    });
}

        if (speed < 88 && readyMode) {
            readyMode = false;
        }

    }, 50);
const inputs = document.querySelectorAll(".input-red");
const message = document.getElementById("travelMessage");

function checkDestination(){
    const complete = [...inputs].every(input => input.value.trim() !== "");

    // GO button is ALWAYS enabled
    message.disabled = false;
    message.style.opacity = "1";
    message.style.cursor = "pointer";

    // only reset confirmation when empty
    if(!complete){
        destinationConfirmed = false;
    }
}

inputs.forEach(input=>{
    input.addEventListener("input", checkDestination);
});

message.addEventListener("click", () => {
    destination = [...inputs].map(i => i.value.trim()).join(" ");
    destinationConfirmed = true;
    message.textContent = "REACH 88 KM/H TO TIME TRAVEL";
    message.disabled = true;
    message.style.opacity = "1";
});
});
