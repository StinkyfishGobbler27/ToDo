var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");
var darkModeToggle = document.querySelector("button:last-of-type");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function addTask() {
    var taskText = taskInput.value;

    if (taskText.trim() !== "") {
        var newTask = document.createElement("li");
        newTask.innerHTML = '<span>' + taskText + '</span><button onclick="completeTask(this)">Complete</button>';
        taskList.appendChild(newTask);
        taskInput.value = "";

        saveTasks();
    }
}

function completeTask(button) {
    var taskItem = button.parentNode;
    taskItem.classList.toggle("completed");

    saveTasks();
}

function saveTasks() {
    var tasks = [];
    var taskItems = document.querySelectorAll("ul#taskList li");

    taskItems.forEach(function(taskItem) {
        var taskText = taskItem.querySelector("span").textContent;
        var isCompleted = taskItem.classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = localStorage.getItem("tasks");

    if (tasks) {
        tasks = JSON.parse(tasks);

        tasks.forEach(function(task) {
            var newTask = document.createElement("li");
            newTask.innerHTML = '<span>' + task.text + '</span><button onclick="completeTask(this)">Complete</button>';

            if (task.completed) {
                newTask.classList.add("completed");
            }

            taskList.appendChild(newTask);
        });
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "Toggle Light Mode" : "Toggle Dark Mode";
}


// ... (previous code)

function clearCompletedTasks() {
    var completedTasks = document.querySelectorAll("ul#taskList li.completed");

    completedTasks.forEach(function(task) {
        task.remove();
    });

    saveTasks();
}

// ... (remaining code)