import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
const formData = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
btnStart.disabled = true;

let countdownInterval;

btnStart.addEventListener('click', () => {
  const selectedDate = flatpickrInstance.selectedDates[0];
  const currentDate = new Date();

  if (!validateSelectedDate(selectedDate, currentDate)) {
    return;
  }

  countdownInterval = setInterval(() => {
    const countdownTime = selectedDate.getTime() - new Date().getTime();
    if (countdownTime <= 0) {
      clearInterval(countdownInterval);
      return;
    }
    updateTimer(countdownTime);
  }, 1000);
  btnStart.disabled = true;
});

function validateSelectedDate(selectedDate, currentDate) {
  if (selectedDate <= currentDate) {
    Notify.failure('Please choose a date in the future');
    return false;
  }

  return true;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (!validateSelectedDate(selectedDate, currentDate)) {
      return;
    }

    btnStart.disabled = false;
    formData.disabled = true;
  },
};

const flatpickrInstance = flatpickr('#datetime-picker', options);

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}
