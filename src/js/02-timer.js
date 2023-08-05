// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
  const selectedDate = selectedDates[0];
    // console.log(selectedDates[0]);
      if (selectedDate <= new Date()) {
        // alert('Please choose a date in the future');
        Notify.failure('Please choose a date in the future');
        document.querySelector('[data-start]').disabled = true;
      } else {
        document.querySelector('[data-start]').disabled = false;
      }
  },
};

const dateTimePicker = flatpickr('#datetime-picker', options);
let countdownInterval;

function startTimer() {
  const selectedDate = dateTimePicker.selectedDates[0];
  const currentDate = new Date();
  if (selectedDate > currentDate) {
    countdownInterval = setInterval(updateTimer, 1000, selectedDate);
    updateTimer(selectedDate);
    Notify.success('Start the timer!');
  } else {
    // alert('Please choose a date in the future');
     Notify.failure('Please choose a date in the future');
  }
}

function updateTimer(selectedDate) {
  const currentDate = new Date();
  const remainingTime = selectedDate - currentDate;
  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  renderTimer({ days, hours, minutes, seconds });
  if (remainingTime <= 0) {
    clearInterval(countdownInterval);
    document.querySelector("[data-start]").disabled = true;
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function renderTimer({ days, hours, minutes, seconds }) {
  document.querySelector("[data-days]").textContent = addLeadingZero(days);
  document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
  document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
  document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
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

document.querySelector("[data-start]").addEventListener("click", startTimer);
