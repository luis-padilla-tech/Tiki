document.getElementById('btn_startTimer').addEventListener('click', ()=>{
    isOnBreak = false;
    startTimer(WORK_TIME);
})

document.getElementById('btn_stopTimer').addEventListener('click', ()=>{
    stopTimer();
})

const WORK_TIME = 6;
const SHORT_BREAK_TIME = 2;
const LONG_BREAK_TIME = 10;
const SHORT_BREAKS_BEFORE_LONG_BREAK = 4;
var breaksTaken = 0;

var isOnBreak = false;
var timeLeftSeconds;
var timerInterval;

function startTimer(seconds){
    timerInterval = setInterval(timerTick, 1000);
    timeLeftSeconds = seconds;
    changeTimeText()
}

function stopTimer(){
    clearInterval(timerInterval);
}

function timerTick(){

    timeLeftSeconds--;

    changeTimeText();

    if(timeLeftSeconds < 0) {
        stopTimer();
        displayNotification();
    }
    
}

function changeTimeText() {
    let minutes = '' + Math.floor(timeLeftSeconds / 60);
    let seconds = '' + timeLeftSeconds % 60;
    
    let minutesText = minutes.padStart(2 ,'0')
    let secondsText = seconds.padStart(2, '0');
    
    let newTimerText = `${minutesText}:${secondsText}`;
    document.getElementById('timerText').textContent = newTimerText
}

function displayNotification(){

    const notice = new Notification( 'Tiki - Stay Strong', {

        body: getNotificationBody()
    });

    createNewTimer();
}

function getNotificationBody() {
    return isOnBreak  ? 'Let start the grind again' : 'Break time';
}

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