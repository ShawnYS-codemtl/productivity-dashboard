// import { UUID } from "uuidjs";
import {load, save} from "./storage.js"
import { makeDraggable } from "./utils.js";

let currentDate = new Date(); 
let events = load("events", []) 
let editingEvent = null  // null means adding a new event

// DOM
const grid = document.getElementById("calendar-grid");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");
const title = document.getElementById('calendar-title')
const modalOverlay = document.getElementById('modal-overlay')

// Form & modal DOM
const eventFormSection = document.getElementById("event-form-section");
const eventForm = document.getElementById("event-form");
const eventFormHeader = document.getElementById('event-form-header')
const eventDateInput = document.getElementById("event-date");
const eventNameInput = document.getElementById("event-name");
const eventStartInput = document.getElementById("event-start");
const eventEndInput = document.getElementById("event-end");
const eventDescInput = document.getElementById("event-desc");
const eventCancelBtn = document.getElementById("event-cancel-btn");
// const eventCancelBtn2 = document.getElementById("event-cancel-2");

// Details modal
const detailsModal = document.getElementById("event-details-modal");
const detailName = document.getElementById("detail-name");
const detailDateTime = document.getElementById("detail-date-time");
const detailDesc = document.getElementById("detail-desc");
const detailsClose = document.getElementById("details-close");
const editEventBtn = document.getElementById("edit-event-btn");
const deleteEventBtn = document.getElementById("delete-event-btn");

export function init() {
    console.log("Calendar Module Loaded"); 
    // localStorage.clear()

    renderCalendar();
    renderEventList()

    prevBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

   eventForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const name = eventNameInput.value.trim()
        if (!name) return

        let eventObj
        if (editingEvent) {
            // Edit mode: preserve original ID
            eventObj = {
                ...editingEvent,
                name,
                date: eventDateInput.value,
                start: eventStartInput.value || null,
                end: eventEndInput.value || null,
                desc: eventDescInput.value || null
            };
            const idx = events.findIndex(ev => ev.id === editingEvent.id);
            events[idx] = eventObj;
        } else {
            // Add mode: generate new ID
            eventObj = {
                id: cryptoRandomId(),
                name,
                date: eventDateInput.value,
                start: eventStartInput.value || null,
                end: eventEndInput.value || null,
                desc: eventDescInput.value || null
            };
            events.push(eventObj);
        }

        save('events', events)
        closeEventForm();
        renderCalendar()
        renderEventList()
        
    } )

    eventCancelBtn.addEventListener("click", () => {
        closeEventForm();
    });

    editEventBtn.addEventListener("click", onEditFromDetails);
    deleteEventBtn.addEventListener("click", onDeleteFromDetails);
}

function renderCalendar(){
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
        const dateString = formatDateForInput(year, month, day);

        cell.addEventListener("click", () => openEventForm(dateString));

        const isToday = day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        if (isToday) cell.classList.add('today')
        
        grid.appendChild(cell)
    }
}

function openEventForm(dateString, editEvent = null) {
    modalOverlay.style.display = "block";
    eventFormSection.style.display = "block";

    // reset position + center again
    eventFormSection.style.top = "50%";
    eventFormSection.style.left = "50%";
    eventFormSection.style.transform = "translate(-50%, -50%)";

    document.body.classList.add("modal-open");
    makeDraggable(eventFormSection)

    modalOverlay.classList.remove('hidden')
    eventFormSection.classList.remove("hidden");
   
    eventDateInput.value = dateString

  if (editEvent){
    editingEvent = editEvent
    eventNameInput.value = editEvent.name;
    eventStartInput.value = editEvent.start || "";
    eventEndInput.value = editEvent.end || "";
    eventDescInput.value = editEvent.desc || "";
    document.getElementById("event-form-title").textContent = `Edit Event - ${eventDateInput.value}`;
  } else {
    editingEvent = null
    eventNameInput.value = "";
    eventStartInput.value = "";
    eventEndInput.value = "";
    eventDescInput.value = "";
    document.getElementById("event-form-title").textContent = `Add Event - ${eventDateInput.value}`;
  }
  // focus name
  setTimeout(()=> eventNameInput.focus(), 0);
}

function closeEventForm(){
    modalOverlay.style.display = "none";
    eventFormSection.style.display = "none";
    document.body.classList.remove("modal-open");
    modalOverlay.classList.add('hidden')
    eventFormSection.classList.add('hidden')
    // document.getElementById("event-form").reset();
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
        return a.date.localeCompare(b.date); 
    });

    listEl.innerHTML = "";

    sorted.forEach(evt => {
        const item = document.createElement("div");
        item.className = "event-list-item";

        const date = parseLocalDate(evt.date);
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
        item.addEventListener("click", () => openEventDetails(evt.id));

        listEl.appendChild(item);
    });
}

// ---------- Details modal ----------
function openEventDetails(id){
  console.log("event details open")
  console.log(events)
  const ev = events.find(x => x.id === id);
  if (!ev) return;
  detailName.textContent = ev.name;
  detailDateTime.textContent = formatHuman(ev.date, ev.start, ev.end);
  detailDesc.textContent = ev.desc || "No description.";
  detailsModal.classList.remove("hidden");

  // attach id to buttons for actions
  editEventBtn.dataset.id = id;
  deleteEventBtn.dataset.id = id;
}

function onEditFromDetails(){
  const id = editEventBtn.dataset.id;
  const ev = events.find(x => x.id === id);
  if (!ev) return;
  detailsModal.classList.add("hidden");
  openEventForm(ev.date, ev);
}

function onDeleteFromDetails(){
  const id = deleteEventBtn.dataset.id;
  if (!confirm("Delete this event?")) return;
  events = events.filter(x => x.id !== id);
  save("events", events);
  detailsModal.classList.add("hidden");
  renderCalendar();
  renderEventList();
}

function formatHuman(dateISO, start, end){
  const d = new Date(dateISO);
  const opts = { month: "short", day: "numeric" };
  const dateStr = d.toLocaleDateString(undefined, opts);
  if (start || end){
    const s = start ? start : "";
    const e = end ? ` - ${end}` : "";
    return `${dateStr} ${s}${e}`;
  }
  return dateStr;
}

function formatDateForInput(year, month, day) {
    return `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}

function cryptoRandomId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

function parseLocalDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed
}



