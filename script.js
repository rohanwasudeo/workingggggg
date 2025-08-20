document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      addTodo(text);
      input.value = '';
    }
  });

  function addTodo(text) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input me-2';
    checkbox.addEventListener('change', function() {
      li.classList.toggle('completed', checkbox.checked);
    });

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;

    const btn = document.createElement('button');
    btn.className = 'btn btn-sm btn-danger ms-2';
    btn.textContent = 'Delete';
    btn.addEventListener('click', function() {
      li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  }
});
