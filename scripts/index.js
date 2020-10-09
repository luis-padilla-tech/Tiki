const storage = require('./storage');
const settings = storage.getSettings();

const WORK_TIME = getSettingInSeconds(settings.workTime);
const SHORT_BREAK_TIME = getSettingInSeconds(settings.shortBreak);
const LONG_BREAK_TIME = getSettingInSeconds(settings.longBreak);
const SHORT_BREAKS_BEFORE_LONG_BREAK = getSettingInSeconds(settings.shortBreakBeforeLongBreak);

var breaksTaken = 0;

var isOnBreak = false;
var timeLeftSeconds;
var timerInterval;

document.getElementById('btn_startTimer').addEventListener('click', ()=>{
    isOnBreak = false;
    startTimer(WORK_TIME);
})

document.getElementById('btn_stopTimer').addEventListener('click', ()=>{
    stopTimer();
})

/**
 * 
 * @param {number} settingTime 
 */
function getSettingInSeconds(settingTime) {
    return settingTime * 60;
}

/**
 * 
 * @param {number} seconds 
 */
function startTimer(seconds){

    if(timerInterval === undefined | timerInterval == null){
        timerInterval = setInterval(timerTick, 1000);
        timeLeftSeconds = seconds;
        changeTimeText();
    }
}

/**
 * 
 */
function stopTimer(){

    clearInterval(timerInterval);
    timerInterval = null;
    timeLeftSeconds = 0;
    changeTimeText();
}

/**
 * 
 */
function timerTick(){

    timeLeftSeconds--;

    changeTimeText();

    if(timeLeftSeconds < 0) {
        stopTimer();
        displayNotification();
    }
    
}

/**
 * 
 */
function changeTimeText() {
    
    let minutes = '' + Math.floor(timeLeftSeconds / 60);
    let seconds = '' + timeLeftSeconds % 60;
    
    let minutesText = minutes.padStart(2 ,'0')
    let secondsText = seconds.padStart(2, '0');
    
    let newTimerText = `${minutesText}:${secondsText}`;
    document.getElementById('timerText').textContent = newTimerText
}

/**
 * 
 */
function displayNotification(){

    const notice = new Notification( 'Tiki - Stay Strong', {
        icon: './Icons/favicon.ico',
        body: getNotificationBody(),
        title: 'Tiki',
    });
    
    createNewTimer();
}

/**
 * 
 */
function getNotificationBody() {
    return isOnBreak  ? 'Let start the grind again' : 'Break time';
}

/**
 * 
 */
function createNewTimer() {
    if (isOnBreak){
        startTimer(WORK_TIME)
    }else if (breaksTaken >= SHORT_BREAKS_BEFORE_LONG_BREAK){
        breaksTaken = 0;
        startTimer(LONG_BREAK_TIME);
    }else{
        breaksTaken++;
        startTimer(SHORT_BREAK_TIME);
    }

    isOnBreak = !isOnBreak;
}