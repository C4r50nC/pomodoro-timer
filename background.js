const secondsInMinute = 60;

chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / secondsInMinute,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(["timerInSeconds", "isRunning"], (res) => {
      if (res.isRunning) {
        let timerInSeconds = res.timerInSeconds + 1;
        let isRunning = true;

        if (timerInSeconds === 25 * secondsInMinute) {
          this.registration.showNotification("Pomodoro Timer", {
            body: "25 minutes have passed!",
            icon: "icon.png",
          });

          timerInSeconds = 0;
          isRunning = false;
        }

        chrome.storage.local.set({
          timerInSeconds,
          isRunning,
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
