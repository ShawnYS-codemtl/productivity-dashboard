import { save, load } from "./storage.js"

let todos = []
let currentFilter = 'all'

export function init() {
    console.log("To-Do Module Loaded")

    // 1. Load from localStorage
    todos = load("todos", [])

    if (!Array.isArray(todos)) {
        todos = []
        save("todos", todos)
    }
    
    // 2. Select elements
    const input = document.getElementById("todo-input")
    const addBtn = document.getElementById("todo-add-btn")

    function addTodo() {
        const text = input.value.trim()
        if (!text) return

        todos.push({ text, completed: false })
        save("todos", todos)
        render()
        input.value = ""
    }

    // 3. Event listeners
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            addTodo()
        }
    })

    addBtn.addEventListener("click", addTodo)

    const filterButtons = document.querySelectorAll(".filter-btn")

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            currentFilter = btn.dataset.filter
            filterButtons.forEach((b) => b.classList.remove("active"))
            btn.classList.add("active")
            render() // re-render the list based on filter
        })
    })
        
    // Render todos on page load
    render()
}

function render() {
    const list = document.getElementById("todo-list")
    list.innerHTML = ""// clear previous content
    let filteredTodos = todos

    if (currentFilter === "active") {
        filteredTodos = todos.filter(todo => !todo.completed)
    } else if (currentFilter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed)
    }

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement("li")
        li.draggable = true
        li.dataset.index = index

        // Checkbox
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = todo.completed
        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked
            save("todos", todos)
            render()
        })
        li.appendChild(checkbox)

        // Number
        const numberSpan = document.createElement("span")
        numberSpan.classList.add('number')
        numberSpan.textContent = `${index + 1}. `
        li.appendChild(numberSpan)

        // Text
        const textWrapper = document.createElement("div");
        textWrapper.classList.add("todo-text-wrapper");
        const text = document.createElement("span")
        text.textContent = todo.text
        textWrapper.appendChild(text)
        if (todo.completed) li.classList.add("completed")

        // Double-click to edit
        text.addEventListener("dblclick", () => {
            const input = document.createElement("input")
            input.type = "text"
            input.value = todo.text
            input.maxLength = 30
            text.replaceWith(input)
            input.focus()
            input.select()

            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    todo.text = input.value.trim() || todo.text
                    save("todos", todos)
                    render()
                }
            })

            input.addEventListener("blur", () => render())
        })

        li.appendChild(textWrapper)

        // Delete button
        const delBtn = document.createElement("button")
        delBtn.textContent = "X"
        delBtn.classList.add("delete-btn")
        delBtn.addEventListener("click", () => {
            todos.splice(index, 1)
            save("todos", todos)
            render()
        })
        li.appendChild(delBtn)

        // Drag & Drop
        li.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", index)
            li.classList.add("dragging")
        })

        li.addEventListener("dragend", () => {
            li.classList.remove("dragging")
        })

        list.appendChild(li)
    })

    // Dragover & Drop (on UL container)
    list.addEventListener("dragover", (e) => {
        e.preventDefault()
        const draggingEl = list.querySelector(".dragging")
        const afterElement = getDragAfterElement(list, e.clientY)
        if (!afterElement) {
            list.appendChild(draggingEl)
        } else {
            list.insertBefore(draggingEl, afterElement)
        }
    })

    list.addEventListener("drop", () => {
        const newTodos = []
        list.querySelectorAll("li").forEach((li) => {
            const i = parseInt(li.dataset.index)
            newTodos.push(todos[i])
        })
        todos = newTodos
        save("todos", todos)
        render()
    })
}

// Helper to find element after drop position
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll("li:not(.dragging)")]

    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element
}
