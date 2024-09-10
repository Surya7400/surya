const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `<span>${inputBox.value}</span> 
                        <button class="edit-btn" onclick="editTask(this)">Edit</button>
                        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>`;
        listContainer.appendChild(li);
        inputBox.value = "";
        saveData();
    }
}

function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newTask = prompt("Edit your task:", span.textContent);
    if (newTask !== null && newTask.trim() !== '') {
        span.textContent = newTask;
        saveData();
    }
}

function deleteTask(button) {
    const li = button.parentElement;
    li.remove();
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN" || e.target.tagName === "LI") {
        e.target.parentElement.classList.toggle("checked");
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
