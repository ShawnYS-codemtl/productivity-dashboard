import * as Todo from "./todo.js";
import * as Pomodoro from "./pomodoro.js";
import * as Habits from "./habits.js";
import * as Calendar from "./calendar.js"

document.addEventListener("DOMContentLoaded", () => {
    console.log("Dashboard Loaded");

    // Initialize modules
    Todo.init();
    Pomodoro.init();
    Habits.init();
    Calendar.init();

});