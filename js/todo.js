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

    function addTodo() {
        const text = input.value.trim();
        if (!text) return;

        todos.push({ text, completed: false });
        save();
        render();
        input.value = "";
    }

    // 3. Event listeners
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            addTodo()
        }
    })

    addBtn.addEventListener("click", addTodo)
        
    // Render todos on page load
    render()
}

function render() {
    const list = document.getElementById("todo-list");
    list.innerHTML = ''
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        if (todo.completed){
            li.classList.add('completed')
        }
        const text = document.createElement("span")
        text.textContent = todo.text

        const delBtn = document.createElement("button")
        delBtn.textContent = 'x'
        delBtn.classList.add('delete-btn')
        delBtn.dataset.index = index

        delBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            save("todos", todos);
            render();
        })

        const checkbox = document.createElement('input')
        checkbox.type = "checkbox"
        checkbox.checked = todo.completed

        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked
            save("todos", todos)
            render()
        })

        li.appendChild(checkbox);
        li.appendChild(text)
        li.appendChild(delBtn);
        list.appendChild(li)
    })    
}
