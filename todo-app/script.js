const form = document.getElementById('form');
const input = document.getElementById('input');
const todosEl = document.getElementById("todos");
const todos = JSON.parse(localStorage.getItem("todos"));

if(todos) {
  todos.forEach(todo => {
    addTodo(todo);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  addTodo();
})

function addTodo(todo) {
  const todoEl = document.createElement("li");
  let newTodo;
  if(todo) {
    newTodo = todo.text;
    if(todo.completed){
      todoEl.classList.add("completed");
    }
  }else{
    newTodo = input.value;
  }
  
  todoEl.innerText = newTodo;

  todoEl.addEventListener('click', () => {
    todoEl.classList.toggle("completed");
    updateLS();
  })

  todoEl.addEventListener('contextmenu', (e)=> {
    e.preventDefault();
    todoEl.remove();
    updateLS();
  })

  todosEl.appendChild(todoEl);
  input.value = "";

  updateLS();
};

function updateLS() {
  const todosEl = document.querySelectorAll('li');

  const todos = [];
  todosEl.forEach(todo => {
    todos.push({
      text: todo.innerText,
      completed: todo.classList.contains("completed")
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

