const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let intervalId = null;

refs.startBtn.addEventListener('click', onBtnStart);
refs.stopBtn.addEventListener('click', onBtnStop);

function onBtnStart() {
  intervalId = setInterval(changeBcgColor, 1000);
  refs.startBtn.disabled = true;
}

function onBtnStop() {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
}

function changeBcgColor() {
  const color = getRandomHexColor();
  refs.body.style.background = color;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
