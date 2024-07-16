let stopwatch;
let lapCounter = 1;
let lapTimes = [];

function startStopwatch() {
    let startTime = Date.now() - (stopwatch || 0);
    stopwatch = setInterval(function printTime() {
        let elapsedTime = Date.now() - startTime;
        displayTime(elapsedTime);
    }, 1000);
    
    document.getElementById("startBtn").disabled = true;
    document.getElementById("pauseBtn").disabled = false;
}

function pauseStopwatch() {
    clearInterval(stopwatch);
    stopwatch = null;
    
    document.getElementById("startBtn").disabled = false;
    document.getElementById("pauseBtn").disabled = true;
}

function resetStopwatch() {
    clearInterval(stopwatch);
    stopwatch = null;
    lapCounter = 1;
    lapTimes = [];
    
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startBtn").disabled = false;
    document.getElementById("pauseBtn").disabled = true;
    
    clearLapList();
}

function displayTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let hours = Math.floor(minutes / 60);
    minutes %= 60;
    
    let formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    document.getElementById("display").textContent = formattedTime;
}

function pad(num) {
    return num.toString().padStart(2, "0");
}

function recordLap() {
    let currentTime = document.getElementById("display").textContent;
    lapTimes.push(currentTime);
    
    let lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCounter++}: ${currentTime}`;
    document.getElementById("lapList").appendChild(lapItem);
}

function clearLapList() {
    let lapList = document.getElementById("lapList");
    while (lapList.firstChild) {
        lapList.removeChild(lapList.firstChild);
    }
}
