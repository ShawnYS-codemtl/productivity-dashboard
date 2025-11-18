import { save, load } from "./storage.js";

let habits = []; /* {name, completedToday, history, lastUpdated} */

const input = document.getElementById("habit-input");
const listEl = document.getElementById("habit-list");
const form = document.getElementById('habit-form')

export function init() {
    console.log("Habits Module Loaded");

    habits = load("habits", []);

    dailyResetCheck()


    form.addEventListener("submit", (e) => {
        e.preventDefault()
        addHabit()
    });
}

function addHabit(){
    const name = input.value.trim()
    if (!name) return 
    habits.push({
        name: name,
        completedToday: false
    })

    input.value = ''
    save('habits', habits)
    render()
}

function toggleHabit(index) {
    habits[index].completedToday = !habits[index].completedToday
    save("habits", habits)
    render()
}

function deleteHabit(index) {
    habits.splice(index, 1)
    save('habits', habits)
    render()
}

function render(){
    listEl.innerHTML = ""

    habits.forEach((habit, i) => {
        const li = document.createElement('li')
        li.classList.add('habit-item')
        if (habit.completedToday) li.classList.add('completed')

        const leftDiv = document.createElement('div')
        leftDiv.classList.add('habit-left')

        const check = document.createElement('input')
        check.type = 'checkbox'
        check.checked = habit.completedToday
        check.addEventListener('change', () => toggleHabit(i))

        const nameSpan = document.createElement('span')
        nameSpan.classList.add('habit-name')
        nameSpan.textContent = habit.name

        leftDiv.append(check, nameSpan)

        const delBtn = document.createElement("button");
        delBtn.className = "delete-habit-btn";
        delBtn.textContent = "×";
        delBtn.addEventListener("click", () => deleteHabit(i));

        li.append(leftDiv, delBtn);
        listEl.appendChild(li);
    })
}

function isNewDay(lastTime) {
    const last = new Date(lastTime).toDateString();
    const today = new Date().toDateString();
    return last !== today;
}

function dailyResetCheck() {
    let changed = false

    habits.forEach((habit) => {
        if (!habit.lastUpdated){
            habit.lastUpdated = Date.now()
            changed = true
            return
        }

        if(isNewDay(habit.lastUpdated)){
            // Save yesterday’s completion
            habit.history = habit.history || [];
            habit.history.push(habit.completedToday);

            // Reset
            habit.completedToday = false;
            habit.lastUpdated = Date.now();
            changed = true;
        }
    })
    if (changed) {
        save('habits', habits)
    }
}
// TODO: Add calendar rendering
