document.getElementById('btn_startTimer').addEventListener('click', ()=>{
    startTimer(defaultStartTimeSeconds);
})

document.getElementById('btn_stopTimer').addEventListener('click', ()=>{
    stopTimer();
})

const defaultStartTimeSeconds = 4;
const defaultshortBreaksBeforeLongBreakSeconds = 3;
const defaultShortBreakStartTimeSeconds = 2;
const defaultLongBreaksStartTimeSeconds = 5;
var shortBreaksTaken = 0;
var timeLeftSeconds;
var timerInterval;

function startTimer(seconds){
    timerInterval = setInterval(timerTick, 1000);
    timeLeftSeconds = seconds;
}

function stopTimer(){
    clearInterval(timerInterval);
}

function timerTick(){
    let minutes = '' + Math.floor(timeLeftSeconds / 60);
    let seconds = '' + timeLeftSeconds % 60;

    let minutesText = minutes.padStart(2 ,'0')
    let secondsText = seconds.padStart(2, '0');

    timeLeftSeconds--;

    if(timeLeftSeconds < 0) {
        stopTimer();
        takeBreak();
    }

    let newTimerText = `${minutesText}:${secondsText}`;
    
    document.getElementById('timerText').textContent = newTimerText
}

function takeBreak(){

    shortBreaksTaken++;

    const notice = new Notification( 'You are done',{
        body: 'Great Work Take a break'
    });
}