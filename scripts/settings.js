const storage = require('./storage.js')
const { remote } = require('electron')
const path = require('path');
const siteBlocker = require('./siteBlocker')

let settings = storage.getSettings();

siteBlocker.readFile(storage.gethostFileLocation());
siteBlocker

let workTimeInput = document.getElementById('txt_workTime');
workTimeInput.value = settings.workTime;

let shortBreakInput = document.getElementById('txt_shortBreakTime');
shortBreakInput.value = settings.shortBreak;

let longBreakInput = document.getElementById('txt_longBreakTime');
longBreakInput.value = settings.longBreak;

let shortBreaksBeforeLongBreakInput = document.getElementById('txt_shortBreaksBeforeLongBreak');
shortBreaksBeforeLongBreakInput.value = settings.shortBreaksBeforeLongBreak;

let hostFileLocationInput = document.getElementById('txt_hostFileLocation');
hostFileLocationInput.value = storage.gethostFileLocation();

document.getElementById('frm-update').addEventListener('submit', updateSettings);
shortBreakInput.addEventListener('change', setTimeRanges);
longBreakInput.addEventListener('change', setTimeRanges);

function updateSettings(e) {

    e.preventDefault();

    let newSettings = {
        shortBreak: parseInt(shortBreakInput.value),
        longBreak: parseInt(longBreakInput.value),
        workTime: parseInt(workTimeInput.value),
        shortBreaksBeforeLongBreak: parseInt(shortBreaksBeforeLongBreakInput.value),
    }

    storage.saveSettings(newSettings);
    
    alert('Savings Changed!');
    remote.getCurrentWebContents().loadURL(`file://${path.join(__dirname,'..')}/index.html`);

}

function setTimeRanges() {
    
    shortBreakInput.max = parseInt(longBreakInput.value) - 1;
    longBreakInput.min - parseInt(shortBreakInput.value);
}