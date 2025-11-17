let interval = null;
let timeLeft = 1500; // 25 min

export function init() {
    console.log("Pomodoro Module Loaded");

    const display = document.getElementById("timer-display");

    const startBtn = document.getElementById("start-btn");
    const pauseBtn = document.getElementById("pause-btn");
    const resetBtn = document.getElementById("reset-btn");

    // TODO: Show initial time in display

    startBtn.addEventListener("click", () => {
        // TODO: Start interval (countdown)
    });

    pauseBtn.addEventListener("click", () => {
        // TODO: Pause timer
    });

    resetBtn.addEventListener("click", () => {
        // TODO: Reset timer
    });
}

// TODO: write helper to format time (mm:ss)
