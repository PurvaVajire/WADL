document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    let task = { id: Date.now(), text: taskText };

    // Send task to the server
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            renderTask(task);
            taskInput.value = ""; // Clear input field
        }
    };
    xhr.send(JSON.stringify(task));
}

// Load tasks from the server
function loadTasks() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "server.php", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            let tasks = JSON.parse(xhr.responseText);
            tasks.forEach(renderTask);
        }
    };
    xhr.send();
}

// Render task in UI
function renderTask(task) {
    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `${task.text} 
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id}, this)">Delete</button>`;
    taskList.appendChild(li);
}

// Delete task
function deleteTask(taskId, btnElement) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "server.php?id=" + taskId, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            btnElement.parentElement.remove(); // Remove from UI
        }
    };
    xhr.send();
}
