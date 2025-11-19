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
        completedToday: false,
        currentStreak: 0,
        bestStreak: 0,
        lastCompletedDate: null,
        history: []
    })

    input.value = ''
    save('habits', habits)
    render()
}

function toggleHabit(index) {
    const habit = habits[index]
    habit.completedToday = !habit.completedToday

    if (habit.completedToday) {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (habit.lastCompletedDate === today) {
            // already completed today -- do nothing
        } else if (habit.lastCompletedDate === yesterday) {
            // continue streak
            habit.currentStreak++;
        } else {
            // streak broken
            habit.currentStreak = 1;
        }

        habit.lastCompletedDate = today;

        if (habit.currentStreak > habit.bestStreak) {
            habit.bestStreak = habit.currentStreak;
        }
    }
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
        if (habit.completedToday) li.classList.add('completedToday')

        const leftDiv = document.createElement('div')
        leftDiv.classList.add('habit-left')

        const check = document.createElement('input')
        check.type = 'checkbox'
        check.checked = habit.completedToday
        check.addEventListener('change', () => toggleHabit(i))

        const nameSpan = document.createElement('span')
        nameSpan.classList.add('habit-name')
        nameSpan.textContent = habit.name

        const streakSpan = document.createElement('span');
        streakSpan.classList.add('habit-streak');
        streakSpan.textContent = `🔥 ${habit.currentStreak} • ⭐ ${habit.bestStreak}`;

        leftDiv.append(check, nameSpan, streakSpan)

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

        // const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (habit.lastCompletedDate !== yesterday) {
            // streak is broken
            habit.currentStreak = 0;
        }

    habit.completedToday = false;
    })
    if (changed) {
        save('habits', habits)
    }
}
// TODO: Add calendar rendering
