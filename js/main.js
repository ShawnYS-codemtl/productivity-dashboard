import * as Todo from "./todo.js";
import * as Pomodoro from "./pomodoro.js";
import * as Habits from "./habits.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Dashboard Loaded");

    // Initialize modules
    Todo.init();
    Pomodoro.init();
    Habits.init();
});