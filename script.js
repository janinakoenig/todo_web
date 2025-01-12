const addButton = document.querySelector("add-button");
let todos = JSON.parse(localStorage.getItem("todos")) || [];
const todoInput = document.querySelector(".todo-input");
const clearAllButton = document.querySelector(".clear-button");

clearAllButton.addEventListener("click", () => {
    console.log("test1");
    //clearAllTodos();
});


todoInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});
function loadTodos() {
    todos.forEach(todo => addTodoToDOM(todo));
}

function addTodo (todo) {
    if (todos.length >= 7) {
        alert("Maximum Amount of todos reached");
        return;
    }
    const  todoText = todoInput.value.trim();

    const todoObject = {
        text: todoText,
        completed: false
    }

    if (todoText !== "") {
        addTodoToDOM(todoObject);
        saveTodoToLocalStorage(todoObject);
        todoInput.value = "";
    }
}

function deleteTodo(todoElement, todoObject) {
    todoElement.remove();
    removeTodoFromLocalStorage(todoObject);
}

function checkTodo(checkbox, todoElement, todoObject) {
    todoObject.completed = checkbox.checked;
    updateTodoInLocalStorage(todoObject);

    if (checkbox.checked) {
        todoElement.style.textDecoration = "line-through";
    } else {
        todoElement.style.textDecoration = "none";
    }
    updateTodoInLocalStorage(todoObject);
}

function clearAllTodos () {
     const todoList = document.querySelector(".todos");
     todoList.innerHTML = "";
 
     todos = [];
     localStorage.setItem("todos", JSON.stringify(todos));

     console.log("Alle Todos wurden entfernt.");
}

function addTodoToDOM(todoObject, todoText) {
    // create a list element
    const todoElement = document.createElement("li");
    // create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todoObject.completed;
    // create delete symbol
    const deleteButton = document.createElement("img");
    deleteButton.src = 'sources/bin.jpg';
    deleteButton.alt = "Delete Todo";
    deleteButton.style.width = "20px"; 
    deleteButton.style.height = "20px"; 
    deleteButton.style.marginLeft = "10px"; 
    deleteButton.className = "delete-button"; 
    deleteButton.on
    deleteButton.className = "delete-button";


    const todoList = document.querySelector(".todos");
    todoElement.appendChild(checkbox);
    todoElement.appendChild(document.createTextNode(todoObject.text));
    todoElement.appendChild(deleteButton);
    todoList.appendChild(todoElement);

   


    deleteButton.addEventListener("click", () => {
        deleteTodo(todoElement, todoObject);
    });

    checkbox.addEventListener("change", () => {
        checkTodo(checkbox, todoElement, todoObject);
    });

    if (todoObject.completed) {
        todoElement.style.textDecoration = "line-through";
    }
}

function saveTodoToLocalStorage (todoObject) {
    todos.push(todoObject);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodoInLocalStorage(todoObject) {
    todos = todos.map(todo => {
        if (todo.text === todoObject.text) {
            return todoObject; 
        }
        return todo;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodoFromLocalStorage(todoObject) {
    todos = todos.filter(todo => todo.text !== todoObject.text); 
    localStorage.setItem("todos", JSON.stringify(todos)); 
}

document.addEventListener("DOMContentLoaded", loadTodos);