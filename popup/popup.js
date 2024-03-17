let tasks = [];

function updateTimeDisplay() {
  const secondsInMinute = 60;
  chrome.storage.local.get(["timerInSeconds"], (res) => {
    const timeDisplay = document.getElementById("time-display");
    const minutes = `${25 - Math.ceil(res.timerInSeconds / 60)}`.padStart(
      2,
      "0"
    );
    let seconds = "00";
    if (res.timerInSeconds % secondsInMinute !== 0) {
      seconds = `${
        secondsInMinute - (res.timerInSeconds % secondsInMinute)
      }`.padStart(2, "0");
    }
    timeDisplay.textContent = `${minutes}:${seconds}`;
  });
}

updateTimeDisplay();
setInterval(updateTimeDisplay, 1000);

const startTimerBtn = document.getElementById("start-timer-btn");
startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    const newIsRunning = !res.isRunning; // Switch to paused if running, switch to running if paused
    chrome.storage.local.set(
      {
        isRunning: newIsRunning,
      },
      () => {
        startTimerBtn.textContent = newIsRunning
          ? "Pause Timer"
          : "Start Timer";
      }
    );
  });
});

const resetTimerBtn = document.getElementById("reset-timer-btn");
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timerInSeconds: 0,
      isRunning: false,
    },
    () => {
      startTimerBtn.textContent = "Start Timer";
    }
  );
});

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => addTask());

chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ?? [];
  renderTasks();
});

function saveTasks() {
  chrome.storage.sync.set({ tasks });
}

function renderTask(taskIndex) {
  const taskRow = document.createElement("div");

  const taskName = document.createElement("input");
  taskName.type = "text";
  taskName.placeholder = "Enter a task...";
  taskName.value = tasks[taskIndex];
  taskName.addEventListener("change", () => {
    tasks[taskIndex] = taskName.value;
    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskIndex);
  });

  taskRow.appendChild(taskName);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskIndex = tasks.length;
  tasks.push("");
  renderTask(taskIndex);
  saveTasks();
}

function deleteTask(taskIndex) {
  tasks.splice(taskIndex, 1);
  renderTasks();
  saveTasks();
}

function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((_taskName, taskIndex) => {
    renderTask(taskIndex);
  });
}
