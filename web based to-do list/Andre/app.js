 // Wait for the DOM content to be fully loaded before executing the code
 document.addEventListener('DOMContentLoaded', () => {
  // Retrieve tasks from local storage or initialize an empty array if none exists
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // Render the tasks on the webpage
  renderTasks(tasks);
});
// Function to add a new task
function addTask() {
  // Get the task input element from the DOM
  const taskInput = document.getElementById('taskInput');
  // Trim the input value to remove leading and trailing whitespaces
  const taskText = taskInput.value.trim();

  // Check if the task text is not empty
  if (taskText !== '') {
    // Create a new task object with default properties
    const task = { text: taskText, important: false, completed: false };
    // Retrieve existing tasks from local storage or initialize an empty array
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Add the new task to the beginning of the tasks array
    tasks.unshift(task);
    // Store the updated tasks array in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Render the updated tasks on the webpage
    renderTasks(tasks);
    // Clear the task input field
    taskInput.value = '';
  }
}

// Function to delete a task based on its index
function deleteTask(index) {
  // Retrieve existing tasks from local storage or initialize an empty array
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // Remove the task at the specified index from the tasks array
  tasks.splice(index, 1);
  // Store the updated tasks array in local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // Render the updated tasks on the webpage
  renderTasks(tasks);
}

// Function to toggle the importance of a task based on its index
function toggleImportant(index) {
  // Retrieve existing tasks from local storage or initialize an empty array
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // Toggle the 'important' property of the task at the specified index
  tasks[index].important = !tasks[index].important;
  // Store the updated tasks array in local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // Render the updated tasks on the webpage
  renderTasks(tasks);
}

// Function to toggle the completion status of a task based on its index
function toggleCompleted(index) {
  // Retrieve existing tasks from local storage or initialize an empty array
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // Toggle the 'completed' property of the task at the specified index
  tasks[index].completed = !tasks[index].completed;
  // Store the updated tasks array in local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // Render the updated tasks on the webpage
  renderTasks(tasks);
}

// Function to edit the text of a task based on its index
function editTask(index) {
  // Retrieve existing tasks from local storage or initialize an empty array
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // Prompt the user to enter the new text for the task, using the current text as the default value
  const newText = prompt('Edit task:', tasks[index].text);

  // Check if the user entered a new text (not null)
  if (newText !== null) {
    // Update the text of the task at the specified index with the new text
    tasks[index].text = newText.trim();
    // Store the updated tasks array in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Render the updated tasks on the webpage
    renderTasks(tasks);
  }
}

// Function to render tasks on the webpage
function renderTasks(tasks) {
  // Get the task list element from the DOM
  const taskList = document.getElementById('taskList');
  // Clear the existing content of the task list
  taskList.innerHTML = '';

  // Iterate through each task in the tasks array
  tasks.forEach((task, index) => {
    // Create a new list item element for the task
    const taskItem = document.createElement('li');
    taskItem.className = 'task';
    // Add 'important' and 'completed' classes based on task properties
    if (task.important) {
      taskItem.classList.add('important');
    }
    if (task.completed) {
      taskItem.classList.add('completed');
    }

    // Create a container for the task checkbox
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox-container';

    // Create a checkbox for marking the task as completed
    const completedCheckbox = document.createElement('input');
    completedCheckbox.type = 'checkbox';
    completedCheckbox.checked = task.completed;
    completedCheckbox.onchange = () => toggleCompleted(index);

    // Create a span element for the task text
    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    // Create a container for task actions (edit and delete buttons)
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'actions-container';

    // Create an 'Edit' button with an onclick event to edit the task
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTask(index);

    // Create a 'Delete' button with an onclick event to delete the task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(index);

    // Append the 'Edit' and 'Delete' buttons to the actions container
    actionsContainer.appendChild(editButton);
    actionsContainer.appendChild(deleteButton);

    // Append the completed checkbox, task text, and actions container to the task item
    checkboxContainer.appendChild(completedCheckbox);
    taskItem.appendChild(checkboxContainer);
    taskItem.appendChild(taskText);
    taskItem.appendChild(actionsContainer);

    // Create a button for marking/unmarking a task as important
    const markImportantButton = document.createElement('button');
    markImportantButton.textContent = task.important ? 'Unmark Important' : 'Mark Important';
    markImportantButton.onclick = () => toggleImportant(index);

    // Append the button for marking/unmarking importance to the task item
    taskItem.appendChild(markImportantButton);

    // Append the task item to the task list
    taskList.appendChild(taskItem);
  });
}


