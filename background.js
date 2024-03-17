chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(["timerInSeconds", "isRunning"], (res) => {
      if (res.isRunning) {
        let timerInSeconds = res.timerInSeconds + 1;
        console.log(timerInSeconds);
        chrome.storage.local.set({
          timerInSeconds,
        });
      }
    });
  }
});

chrome.storage.local.get(["timerInSeconds", "isRunning"], (res) => {
  chrome.storage.local.set({
    timerInSeconds: res.timerInSeconds ?? 0,
    isRunning: res.isRunning ?? false,
  });
});
