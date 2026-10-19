const DEFAULT_MINUTES = 25;
const STORAGE_KEY = "pomodoro.minutes";

function loadMinutes() {
  const n = Number(localStorage.getItem(STORAGE_KEY));
  return Number.isInteger(n) && n >= 1 && n <= 60 ? n : DEFAULT_MINUTES;
}

const WORK_SECONDS = loadMinutes() * 60;

const clockEl = document.getElementById("clock");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const settingsBtn = document.getElementById("settings");

let remaining = WORK_SECONDS;
let intervalId = null;

function render() {
  const m = String(Math.floor(remaining / 60)).padStart(2, "0");
  const s = String(remaining % 60).padStart(2, "0");
  timerEl.textContent = `${m}:${s}`;
}

function startTimer() {
  if (intervalId !== null || remaining <= 0) return;
  intervalId = setInterval(() => {
    remaining--;
    render();
    if (remaining <= 0) stopTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  stopTimer();
  remaining = WORK_SECONDS;
  render();
}

function renderClock() {
  clockEl.textContent = new Date().toLocaleTimeString("ko-KR", { hour12: false });
}

startBtn.onclick = startTimer;
stopBtn.onclick = stopTimer;
resetBtn.onclick = resetTimer;
settingsBtn.onclick = () => {
  location.href = "setting.html";
};

render();
renderClock();
setInterval(renderClock, 1000);
