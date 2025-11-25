let intervalId = null
let duration = 1500      // total seconds for the selected mode
let timeLeft = duration  // current remaining time (seconds)
let startTimestamp = null;  // when the session actually started

const base = window.location.pathname.startsWith("/productivity-dashboard")
  ? "/productivity-dashboard"
  : "";

const alertSound = new Audio(`${base}/assets/sounds/bell-ring-390294.mp3`);

const display = document.getElementById("timer-display")
const startBtn = document.getElementById("start-btn")
const pauseBtn = document.getElementById("pause-btn")
const resetBtn = document.getElementById("reset-btn")
const ring = document.getElementById('ring')
let ringRadius = null
let ringCircumference = null

// Mode buttons (Pomodoro, Short break, Long break)
const modeBtns = document.querySelectorAll("[data-min]")

export function init() {
    console.log("Pomodoro Module Loaded")

    updateDisplay()
    initProgressRing()
    updateControls()
    highlightActiveButton(25)

    startBtn.addEventListener("click", start)

    pauseBtn.addEventListener("click", pause)

    resetBtn.addEventListener("click", reset)

    modeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const mins = Number(btn.dataset.min)
            setMode(mins)
        })

        btn.addEventListener("dblclick", () => {
            setTimeout(() => editModeDurationInline(btn), 0)
        })
    })
}

function start(){
    if (intervalId) return

    startTimestamp = Date.now() - (duration - timeLeft) * 1000; 
    intervalId = setInterval(updateTimer, 200);

    updateControls()
}

function updateTimer() {
    const now = Date.now();
    const elapsedSec = Math.floor((now - startTimestamp) / 1000);
    timeLeft = Math.max(0, duration - elapsedSec);

    updateDisplay();
    updateProgressRing();

    if (timeLeft <= 0) {
        clearInterval(intervalId);
        intervalId = null;
        alertSound.play();
        updateControls();
    }
}

function pause(){
    clearInterval(intervalId)
    intervalId = null

    // Recompute remaining time in case the tab was inactive
    const now = Date.now();
    const elapsedSec = Math.floor((now - startTimestamp) / 1000);
    timeLeft = Math.max(0, duration - elapsedSec);

    updateProgressRing()
    updateControls()
}

function reset() {
    pause()
    timeLeft = duration;
    startTimestamp = null;

    updateDisplay()
    updateProgressRing();
    updateControls()
}

function updateDisplay() {
    display.textContent = formatTime(timeLeft)
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
    pause()
    duration = mins * 60
    timeLeft = duration

    startTimestamp = null

    updateDisplay()
    updateProgressRing()
    highlightActiveButton(mins)

    let mode = "Pomodoro"
    if (mins === 5) mode = 'short'
    if (mins === 15) mode = 'long'

    setRingColor(mode)
    updateControls()

}

function highlightActiveButton(mins) {
    modeBtns.forEach(btn => {
        const btnMinutes = Number(btn.dataset.min)
        if (btnMinutes === mins) {
            btn.classList.add("active")
        } else {
            btn.classList.remove("active")
        }
    })
}

function initProgressRing() {
    if (!ring) return

    const r = Number(ring.getAttribute("r"))
    ringRadius = r
    ringCircumference = 2 * Math.PI * ringRadius
    // prepare the circle for animation
    ring.style.strokeDasharray = `${ringCircumference} ${ringCircumference}`
    ring.style.strokeDashoffset = `${ringCircumference}` // full (0% visible)
    // set initial color / state
    updateProgressRing()
}

function updateProgressRing() {
    if (!ring || !ringCircumference) return

    // guard: avoid division by zero
    const total = Math.max(duration, 1)
    const progress = Math.max(0, Math.min(1, (total - timeLeft) / total)) // 0 → 1
    const offset = ringCircumference * (1 - progress) // stroke-dashoffset decreases as we progress
    ring.style.strokeDashoffset = String(offset)
}

function setRingColor(mode){
    if (mode === 'Pomodoro'){
        ring.style.stroke = "url(#grad-pomodoro)"
    } else if (mode === "short") {
        ring.style.stroke = "url(#grad-short)"
    } else if (mode === "long") {
        ring.style.stroke = "url(#grad-long)"
    }
}

function editModeDurationInline(btn) {
    const oldText = btn.textContent
    const input = document.createElement("input")
    input.type = "number"
    input.min = "1"
    input.max = "180"
    input.value = btn.dataset.min
    input.style.width = "50px"
    btn.textContent = ""
    btn.appendChild(input)
    input.focus()
    input.select()

    // Flag to track if the value was committed
    let committed = false

    input.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            let val = Number(input.value)
            if (!isNaN(val) && val > 0 && val <= 180) {
                btn.dataset.min = val
                committed = true
                btn.textContent = oldText
                // Update active timer if applicable
                const activeBtn = document.querySelector(".active")
                if (activeBtn === btn) {
                    pause()
                    duration = val * 60
                    timeLeft = duration
                    startTimestamp = null
                    updateDisplay()
                    updateProgressRing()
                    updateControls()
                }
            }
        }
    })

    input.addEventListener("blur", () => {
        if (!committed) {
            btn.textContent = oldText
        }
        
    })
}



