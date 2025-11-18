let intervalId = null;
let duration = 1500
let timeLeft = duration // 25 min

const display = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

export function init() {
    console.log("Pomodoro Module Loaded");

    // Mode buttons (Pomodoro, Short break, Long break)
    const modeBtns = document.querySelectorAll("[data-min]");

    updateDisplay()

    startBtn.addEventListener("click", start);

    pauseBtn.addEventListener("click", pause);

    resetBtn.addEventListener("click", reset);

    modeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const mins = Number(btn.dataset.min);
            setMode(mins);
        });
    });
}

function start(){
    if (intervalId) return

    intervalId = setInterval(() => {
        timeLeft -= 1
        if (timeLeft === 0){
            clearInterval(intervalId)
        }
        updateDisplay()
    }, 1000)
}

function pause(){
    clearInterval(intervalId)
    intervalId = null
}

function reset() {
    timeLeft = duration
    pause()
    updateDisplay()
}

function updateDisplay() {
    display.textContent = formatTime(timeLeft);
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600)
    const mins = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60

    const formattedHours = String(hours).padStart(2, '0')
    const formattedMins = String(mins).padStart(2, '0')
    const formattedSecs = String(secs).padStart(2, '0')

    return formattedHours != '00' ? `${formattedHours}:${formattedMins}:${formattedSecs}` : `${formattedMins}:${formattedSecs}`
}

function setMode(mins) {
    duration = mins * 60
    timeLeft = duration
    pause()
    updateDisplay()
}