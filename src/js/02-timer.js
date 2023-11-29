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

startBtn.disabled = true;

let timerInterval = null;
let flatpickrInstance = flatpickr('input#datetime-picker', options);

startBtn.addEventListener('click', () => {
  const selectedDate = flatpickrInstance.selectedDates[0];
  if (selectedDate && selectedDate >= new Date()) {
    startTimer(selectedDate);
  }
});

function handleDateSelection(selectedDates) {
  const selectedDate = selectedDates[0];
  if (selectedDate < new Date()) {
    handleInvalidDate();
  } else {
    startBtn.disabled = false;
  }
}

function handleInvalidDate() {
  iziToast.error({
    position: 'topRight',
    progressBarColor: 'red',
    message: 'Please choose a date in the future',
  });
  startBtn.disabled = true;
}

function startTimer(selectedDate) {
  startBtn.disabled = true;
  document.querySelector('input#datetime-picker').disabled = true;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const timeLeft = selectedDate.getTime() - Date.now();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.querySelector('input#datetime-picker').disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      updateTimer(days, hours, minutes, seconds);
    }
  }, 1000);
}

function updateTimer(days, hours, minutes, seconds) {
  daysEl.textContent = formatTime(days);
  hoursEl.textContent = formatTime(hours);
  minsEl.textContent = formatTime(minutes);
  secsEl.textContent = formatTime(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function formatTime(number) {
  return number.toString().padStart(2, '0');
}
