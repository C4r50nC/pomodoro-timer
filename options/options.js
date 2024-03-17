const timeOptionMinInMinutes = 1;
const timeOptionMaxInMinutes = 60;
const defaultTimeOptionInMinutes = 25;

const timeOptionInMinutes = document.getElementById("time-option-in-minutes");
timeOptionInMinutes.addEventListener("change", (event) => {
  const userInput = event.target.value;
  if (
    userInput < timeOptionMinInMinutes ||
    userInput > timeOptionMaxInMinutes
  ) {
    timeOptionInMinutes.value = defaultTimeOptionInMinutes;
  }
});

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timerInSeconds: 0,
    timeOptionInMinutes: timeOptionInMinutes.value,
    isRunning: false,
  });
});

chrome.storage.local.get(["timeOptionInMinutes"], (res) => {
  timeOptionInMinutes.value =
    res.timeOptionInMinutes ?? defaultTimeOptionInMinutes;
});
