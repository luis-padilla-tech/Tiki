const appSettingsName = "appSettings";
const fileLocationSettingName = 'fileLocationName';

function getSettings() {
  let settings = localStorage.getItem(appSettingsName);

  if (settings == null) {
    settings = getDefaultSettigs();
  }else{
    settings = JSON.parse(settings);
  }

  return settings;
}

function saveSettings(settings) {
  localStorage.setItem(appSettingsName, JSON.stringify(settings));
}

function getDefaultSettigs() {
  return {
    shortBreak: 5,
    longBreak: 15,
    workTime: 25,
    shortBreaksBeforeLongBreak: 3,
  };
}

function gethostFileLocation() {
  let fileLocation = localStorage.getItem(fileLocationSettingName);

  if(fileLocation == null){
    fileLocation = getDefaultHostFileLocation();
  }
  
  return fileLocation;
}

function getDefaultHostFileLocation() {
  switch (process.platform) {
    case 'win32':
      return 'C:\\Windows\\System32\\drivers\\etc\\hosts';
    case 'linux':
      return '';
    case 'darwin':
      return '';
    default:
      return null;
  }
}

module.exports = { getSettings, saveSettings, gethostFileLocation};
