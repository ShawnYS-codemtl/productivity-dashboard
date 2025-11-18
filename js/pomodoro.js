let intervalId = null;
let duration = 1500
let timeLeft = duration // 25 min

const display = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

// Mode buttons (Pomodoro, Short break, Long break)
const modeBtns = document.querySelectorAll("[data-min]");

export function init() {
    console.log("Pomodoro Module Loaded");

    updateDisplay()
    updateControls()
    highlightActiveButton(25)

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

    updateControls()
}

function pause(){
    clearInterval(intervalId)
    intervalId = null
    updateControls()
}

function reset() {
    timeLeft = duration
    pause()
    updateDisplay()
    updateControls()
}

function updateDisplay() {
    display.textContent = formatTime(timeLeft);
}

function updateControls() {
    const running = intervalId != null

    startBtn.disabled = running
    pauseBtn.disabled = !running
    resetBtn.disabled = false
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
    updateControls()
    highlightActiveButton(mins)
}

function highlightActiveButton(mins) {
    modeBtns.forEach(btn => {
        const btnMinutes = Number(btn.dataset.min);
        if (btnMinutes === mins) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}