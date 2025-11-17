import { save, load } from "./storage.js";

let habits = [];

export function init() {
    console.log("Habits Module Loaded");

    habits = load("habits", []);

    const input = document.getElementById("habit-input");
    const addBtn = document.getElementById("habit-add-btn");
    const list = document.getElementById("habit-list");

    addBtn.addEventListener("click", () => {
        // TODO: Add habit
    });

    // TODO: Render habits
}

// TODO: Add calendar rendering
