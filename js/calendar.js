let currentDate = new Date();  

export function init() {
    console.log("Calendar Module Loaded");

    renderCalendar();

    document.getElementById("prev-month").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById("next-month").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
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

        const isToday = day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        if (isToday) cell.classList.add('today')
        
        grid.appendChild(cell)
    }

}