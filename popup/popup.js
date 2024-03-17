const tasks = [];

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => addTask());

function addTask() {
  const tasksNum = tasks.length;
  tasks.push("");

  const taskRow = document.createElement("div");

  const taskName = document.createElement("input");
  taskName.type = "text";
  taskName.placeholder = "Enter a task...";
  taskName.addEventListener("change", () => {
    tasks[tasksNum] = taskName.value;
    console.log(tasks);
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";

  taskRow.appendChild(taskName);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}
