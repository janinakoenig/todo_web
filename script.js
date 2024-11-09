const addButton = document.querySelector("add-button");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function loadTodos() {
    todos.forEach(todo => addTodoToDOM(todo));
}

function addTodo (todo) {
    // crate a const for the input text
    const todoInput = document.querySelector(".todo-input");
    // edit input text so that there are no spaces
    const  todoText = todoInput.value.trim();

    // save todo to DOM and local storage and reset input for new ones
    if (todoText !== "") {
        addTodoToDOM(todoText);
        saveTodoToLocalStorage(todoText);
        todoInput.value = "";
    }
}

function deleteTodo(todoElement, todoText) {
    todoElement.remove(); // Entferne das To-Do aus der DOM
    removeTodoFromLocalStorage(todoText); // Entferne das To-Do aus dem Local Storage
}

function addTodoToDOM(todoText) {
    // create a list element
    const todoElement = document.createElement("li");
    // create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    // create delete symbol
    const deleteButton = document.createElement("img");
    deleteButton.src = 'C:/Users/koeni/devprojects/todo_web/sources/bin.jpg';
    deleteButton.alt = "Delete Todo";
    deleteButton.style.width = "20px"; 
    deleteButton.style.height = "20px"; 
    deleteButton.style.marginLeft = "10px"; 
    deleteButton.className = "delete-button"; 
    deleteButton.on
    // create const for list
    const todoList = document.querySelector(".todos");
    // add list element to list
    todoList.appendChild(todoElement);
    //add checkbox to DOM
    todoElement.appendChild(checkbox);
    todoElement.appendChild(document.createTextNode(todoText));
    todoElement.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
        deleteTodo(todoElement, todoText); // Rufe die deleteTodo-Funktion auf
    });
}


function saveTodoToLocalStorage (todoText) {
    todos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function removeTodoFromLocalStorage(todoText) {
    todos = todos.filter(todo => todo !== todoText); // Filtere das To-Do heraus
    localStorage.setItem("todos", JSON.stringify(todos)); // Aktualisiere das Local Storage
}



document.addEventListener("DOMContentLoaded", loadTodos);