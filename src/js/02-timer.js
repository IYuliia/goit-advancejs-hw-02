import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import '../css/timer.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handleDateSelection,
};

const timer = document.querySelector('.timer');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minsEl = document.querySelector('[data-minutes]');
const secsEl = document.querySelector('[data-seconds]');

let timerInterval = null;

flatpickr('input#datetime-picker', options);

function handleDateSelection(selectedDates) {
  const selectedDate = selectedDates[0];
  if (selectedDate < new Date()) {
    iziToast.error({
      position: 'topRight',
      progressBarColor: 'red',
      message: 'Please choose a date in the future',
    });
  } else {
    startTimer(selectedDate);
  }
}

function startTimer(selectedDate) {
  startBtn.disabled = true;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const timeLeft = selectedDate.getTime() - Date.now();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      resetTimer();
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      updateTimer(days, hours, minutes, seconds);
    }
  }, 1000);
}

function resetTimer() {
  timer.textContent = '00:00:00:00';
  startBtn.disabled = false;
}

function updateTimer(days, hours, minutes, seconds) {
  daysEl.textContent = formatTime(days);
  hoursEl.textContent = formatTime(hours);
  minsEl.textContent = formatTime(minutes);
  secsEl.textContent = formatTime(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function formatTime(number) {
  return number.toString().padStart(2, '0');
}
