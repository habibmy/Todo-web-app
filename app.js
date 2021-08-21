let todoItems = [];
const Ul = document.querySelector("ul");
const form = document.querySelector("form");

const renderTodos = () => {
    let todosLi = todoItems.map(todoItem => {
        return `<li id="${todoItem.id}" >
                    <input type="checkbox" onChange="checkHandler(event)" ${todoItem.checked ? 'checked' : ''} >
                    <span>${todoItem.checked ? '<del>' : ''}${todoItem.text}</span>
                    <button onClick="deleteHandler(event)">X</button>
                </li>`;
    }
    );
    Ul.innerHTML = todosLi.join("");
    // console.log(todosLi)
}

// Add todo

const addTodo = (text) => {
    let todo = {
        text,
        checked: false,
        id: Date.now()
    };

    todoItems.push(todo);
    syncLocal();
    renderTodos();
    // console.log(todoItems);
}

const deleteTodo = id => {
    let index = todoItems.findIndex(todoItem => todoItem.id == id)
    todoItems.splice(index, 1);
    console.log(todoItems)
    syncLocal();
    renderTodos();
}

const syncLocal = () => {
    let stringTodoItems = JSON.stringify(todoItems)
    localStorage.setItem('todoItems', stringTodoItems)
}

const submitHandler = (e) => {
    e.preventDefault();
    let text = e.target.todo.value.trim();
    e.target.todo.value = ""
    if (!text) {
        alert("Add some text before submitting.");
        return;
    }
    addTodo(text);
}


const deleteHandler = (e) => {
    let id = e.target.parentElement.id;
    // console.log(id)
    deleteTodo(id)
}

const checkHandler = (e) => {
    let id = e.target.parentElement.id;
    let index = todoItems.findIndex(todoItem => todoItem.id == id)
    todoItems[index].checked = !todoItems[index].checked
    syncLocal()
    renderTodos()

}

window.onload = () => {

    let localTodoItems = localStorage.getItem('todoItems')
    if (localTodoItems) {
        todoItems = JSON.parse(localTodoItems);
        renderTodos();
    }

    form.onsubmit = submitHandler;
}