// import { UUID } from "uuidjs";
import {load, save} from "./storage.js"

let currentDate = new Date(); 
const events = load("events", []) 
let selectedDate = null;

export function init() {
    console.log("Calendar Module Loaded"); 

    renderCalendar();

    document.getElementById("event-cancel-btn").addEventListener("click", () => {
        closeEventForm();
    });

    document.getElementById("prev-month").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById("next-month").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    document.getElementById('event-form').addEventListener("submit", (e) => {
        e.preventDefault()

        const name = document.getElementById('event-name').value.trim()
        if (!name) return

        const eventObj = {
            id: "unique-id",
            name,
            date: selectedDate,
            start: document.getElementById('event-start').value || null,
            end: document.getElementById('event-end').value || null,
            desc: document.getElementById('event-desc').value || null
        }

        events.push(eventObj)
        save('events', events)
        renderEventList()
        closeEventForm()
    } )
}

function renderCalendar(){
    const grid = document.getElementById('calendar-grid')
    const title = document.getElementById('calendar-title')

    grid.innerHTML = ''

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    title.textContent = currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric"
    })

    const firstDay = new Date(year, month, 1).getDay()
    const numDays = new Date(year, month+1, 0).getDate()

    // Add weekday headings
    const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    weekdays.forEach(day => {
        const div = document.createElement("div");
        div.className = "weekday";
        div.textContent = day;
        grid.appendChild(div);
    })

    // Pad before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const pad = document.createElement("div");
        pad.className = "pad";
        grid.appendChild(pad);
    }

    const today = new Date()
    for (let day = 1; day <= numDays; day++) {
        const cell = document.createElement('div')
        cell.className = 'day'
        cell.textContent = day

         // Create the date object for this cell
        const dateObj = new Date(year, month, day);

        // Convert to YYYY-MM-DD (local)
        const dateString = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;


        cell.addEventListener("click", () => openEventForm(dateString));

        const isToday = day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        if (isToday) cell.classList.add('today')
        
        grid.appendChild(cell)
    }
}

function onDayClick(){
    console.log("Clicked day:", year, month + 1, day);
}

function openEventForm(date) {
    selectedDate = date;  
    document.getElementById("event-form-section").classList.remove("hidden");

    document.getElementById("event-form-title").textContent =
        `Add Event — ${selectedDate}`;
}

function closeEventForm(){
    document.getElementById("event-form-section").classList.add('hidden')
    document.getElementById("event-form").reset();
    selectedDate = null;
}

function renderEventList() {
    const listSection = document.getElementById("event-list-section");
    const listEl = document.getElementById("event-list");

    if (events.length === 0) {
        listSection.classList.add("hidden");
        return;
    }

    // Show list view
    listSection.classList.remove("hidden");

    // Sort events chronologically
    const sorted = [...events].sort((a, b) => {
        return new Date(a.date + " " + (a.start || "00:00")) -
               new Date(b.date + " " + (b.start || "00:00"));
    });

    listEl.innerHTML = "";

    sorted.forEach(evt => {
        const item = document.createElement("div");
        item.className = "event-list-item";

        const date = new Date(evt.date);
        const formattedDate = date.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric"
        });

        const timeRange =
            evt.start && evt.end
                ? `${evt.start} – ${evt.end}`
                : evt.start
                ? evt.start
                : "All day";

        item.innerHTML = `
            <div class="event-list-date">${formattedDate}</div>
            <div class="event-list-info">
                <div class="event-list-name">${evt.name}</div>
                <div class="event-list-time">${timeRange}</div>
            </div>
        `;

        // Click to open details
        item.addEventListener("click", () => openEventDetails(evt));

        listEl.appendChild(item);
    });
}
