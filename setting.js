const MIN_MINUTES = 1;
const MAX_MINUTES = 60;
const STORAGE_KEY = "pomodoro.minutes";

const minutesInput = document.getElementById("minutes");
const saveBtn = document.getElementById("save");

function isValid() {
  const value = minutesInput.value.trim();
  if (value === "") return false;
  const n = Number(value);
  return Number.isInteger(n) && n >= MIN_MINUTES && n <= MAX_MINUTES;
}

function updateSaveState() {
  saveBtn.disabled = !isValid();
}

const saved = localStorage.getItem(STORAGE_KEY);
if (saved !== null) minutesInput.value = saved;

minutesInput.oninput = updateSaveState;

saveBtn.onclick = () => {
  if (!isValid()) return;
  localStorage.setItem(STORAGE_KEY, String(Number(minutesInput.value)));
  location.href = "index.html";
};

updateSaveState();
