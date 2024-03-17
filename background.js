const secondsInMinute = 60;
const defaultTimeOptionInMinutes = 25;

chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / secondsInMinute,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(
      ["timerInSeconds", "isRunning", "timeOptionInMinutes"],
      (res) => {
        if (res.isRunning) {
          let timerInSeconds = res.timerInSeconds + 1;
          let isRunning = true;

          if (timerInSeconds === res.timeOptionInMinutes * secondsInMinute) {
            this.registration.showNotification("Pomodoro Timer", {
              body: `${res.timeOptionInMinutes} minutes have passed!`,
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
      }
    );
  }
});

chrome.storage.local.get(
  ["timerInSeconds", "isRunning", "timeOptionInMinutes"],
  (res) => {
    chrome.storage.local.set({
      timerInSeconds: res.timerInSeconds ?? 0,
      isRunning: res.isRunning ?? false,
      timeOptionInMinutes:
        res.timeOptionInMinutes ?? defaultTimeOptionInMinutes,
    });
  }
);
