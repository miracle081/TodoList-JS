const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

let list = [];
// Read task from local storage
function loadTasks() {
    list = JSON.parse(localStorage.getItem("tasks")) || [];
}
loadTasks();

// Loop through the array of list whenever changes are made
function loopList() {
    taskList.innerHTML = ""
    list.forEach(item => {
        taskList.innerHTML += `
            <li onclick="checkList(${item.id})" class="list-item">
                <div>
                    <p>${item.text}</p>
                    ${item.completed ? "<small>Completed</small>" : ""}
                </div>
                <button onclick="deletList(${item.id})">Delete</button>
            </li>
        `
    })
}
loopList();

addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        list.push({ text: taskText, completed: false, id: new Date().getTime() })
        taskInput.value = ""
        loopList();
    }
    else {
        alert("Please enter a valid task.");
    }

})

function deletList(listId) {
    if (confirm("Are you sure you want to delete this task")) {
        list = list.filter(all => all.id != listId)
        loopList();
    }
};

function checkList(listId) {
    list = list.map(all => {
        if (all.id == listId) all.completed = true
        return all
    })
    loopList();
}

function saveTasks() {
    const tasks = [];
    list.forEach(taskItem => {
        tasks.push(taskItem);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    alert("Your task has been saved")
}

function loadTasks() {
    list = JSON.parse(localStorage.getItem("tasks")) || [];
}