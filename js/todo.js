import { save, load } from "./storage.js";

let todos = [];

export function init() {
    console.log("To-Do Module Loaded");
    // console.log(JSON.parse(localStorage.getItem("todos")))

    // 1. Load from localStorage
    todos = load("todos", []);

    if (!Array.isArray(todos)) {
        todos = [];
        save("todos", todos);
    }
    
    // 2. Select elements
    const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("todo-add-btn");

    // 3. Event listeners
    addBtn.addEventListener("click", () => {
        const value = input.value.trim()
        if (value) {
            todos.push(input.value)
            save('todos', todos)
        } else {
            return
        }
        input.value = ''
        render()
    });

    // Render todos on page load
    render()
}

function render() {
    const list = document.getElementById("todo-list");
    list.innerHTML = ''
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        const text = document.createElement("span")
        text.textContent = todo

        const delBtn = document.createElement("button")
        delBtn.textContent = 'x'
        delBtn.classList.add('delete-btn')
        delBtn.dataset.index = index

        delBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            save("todos", todos);
            render();
        })

        li.appendChild(text)
        li.appendChild(delBtn);
        list.appendChild(li)
    })

    
}
