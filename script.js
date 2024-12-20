document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  // LocalStorageからタスクを読み込む
  const loadTodos = () => JSON.parse(localStorage.getItem('todos')) || [];
  const saveTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos));

  const renderTodos = () => {
    const todos = loadTodos();
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.className = todo.completed ? 'completed' : '';
      li.innerHTML = `
        <span>${todo.text}</span>
        <div>
          <button class="complete-btn">${todo.completed ? '未完了' : '完了'}</button>
          <button class="delete-btn">削除</button>
        </div>
      `;

      // 完了ボタンの処理
      li.querySelector('.complete-btn').addEventListener('click', () => {
        todos[index].completed = !todos[index].completed;
        saveTodos(todos);
        renderTodos();
      });

      // 削除ボタンの処理
      li.querySelector('.delete-btn').addEventListener('click', () => {
        todos.splice(index, 1);
        saveTodos(todos);
        renderTodos();
      });

      todoList.appendChild(li);
    });
  };

  // タスクを追加する
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todos = loadTodos();
    todos.push({ text: todoInput.value, completed: false });
    saveTodos(todos);
    todoInput.value = '';
    renderTodos();
  });

  // 初期表示
  renderTodos();
});
