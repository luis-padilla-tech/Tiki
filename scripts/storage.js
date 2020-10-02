var settingsName = "appSettings";

function getSettings() {
  let settings = localStorage.getItem(settingsName);

  if (settings == null) {
    settings = getDefaultSettigs();
  }else{
    settings = JSON.parse(settings);
  }

  return settings;
}

function saveSettings(settings) {
  localStorage.setItem(settingsName, JSON.stringify(settings));
}

function getDefaultSettigs() {
  return {
    shortBreak: 5,
    longBreak: 15,
    workTime: 25,
    shortBreaksBeforeLongBreak: 3,
  };
}

module.exports = { getSettings, saveSettings };
