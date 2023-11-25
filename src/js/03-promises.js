import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

refs.submitBtn.addEventListener('click', event => {
  event.preventDefault();

  const firstDelay = Number(refs.delay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);

  if (
    refs.delay.value === '' ||
    refs.step.value === '' ||
    refs.amount.value === ''
  ) {
    alert('Please fill in all the fields');
    return;
  }

  for (let i = 1; i <= amount; i += 1) {
    const delay = firstDelay + (i - 1) * step;

    createPromise(i, delay)
      .then(({ position, delay }) => {
        iziToast.show({
          backgroundColor: 'rgb(129, 234, 160)',
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.show({
          backgroundColor: 'rgb(252, 78, 118)',
          message: `❌ Rejected promise ${position} in ${delay}ms`,
        });
      });
  }
});
