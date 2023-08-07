// // Описаний в документації
// import flatpickr from "flatpickr";
// // Додатковий імпорт стилів
// import "flatpickr/dist/flatpickr.min.css";

// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//   const selectedDate = selectedDates[0];
//     // console.log(selectedDates[0]);
//       if (selectedDate <= new Date()) {
//         // alert('Please choose a date in the future');
//         Notify.failure('Please choose a date in the future');
//         document.querySelector('[data-start]').disabled = true;
//       } else {
//         document.querySelector('[data-start]').disabled = false;
//       }
//   },
// };

// const dateTimePicker = flatpickr('#datetime-picker', options);
// let countdownInterval;

// function startTimer() {
//   const selectedDate = dateTimePicker.selectedDates[0];
//   const currentDate = new Date();
//   if (selectedDate > currentDate) {
//     countdownInterval = setInterval(updateTimer, 1000, selectedDate);
//     updateTimer(selectedDate);
//     Notify.success('Start the timer!');
//   } else {
//     // alert('Please choose a date in the future');
//      Notify.failure('Please choose a date in the future');
//   }
// }

// function updateTimer(selectedDate) {
//   const currentDate = new Date();
//   const remainingTime = selectedDate - currentDate;
//   const { days, hours, minutes, seconds } = convertMs(remainingTime);
//   renderTimer({ days, hours, minutes, seconds });
//   if (remainingTime <= 0) {
//     clearInterval(countdownInterval);
//     document.querySelector("[data-start]").disabled = true;
//   }
// }

// function addLeadingZero(value) {
//   return value.toString().padStart(2, "0");
// }

// function renderTimer({ days, hours, minutes, seconds }) {
//   document.querySelector("[data-days]").textContent = addLeadingZero(days);
//   document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
//   document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
//   document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// document.querySelector("[data-start]").addEventListener("click", startTimer);




// v.2

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const rest = {
  inputEl: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let timeData = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onOpen() {
    clearInterval(timerId)
      rest.days.textContent = '00';
      rest.hours.textContent = '00';
      rest.minutes.textContent = '00';
      rest.seconds.textContent = '00';
  },
    
    onClose(selectedDates) {
        timeData = selectedDates[0].getTime();     
    if (timeData < new Date()) {
        Notiflix.Notify.failure('Please choose a date in the future');
        rest.btnStart.setAttribute('disabled', true);
        return;
    };
        rest.btnStart.removeAttribute('disabled');
    },
};

const dataInput = flatpickr(rest.inputEl, options);

rest.btnStart.addEventListener('click', startButton);
rest.btnStart.setAttribute('disabled', true);

function startButton() {
  timerId = setInterval(() => {
    const deltaTime = timeData - new Date().getTime();
    if (deltaTime <= 0) {
      clearInterval(timerId);
      return;
    };
    const time = convertMs(deltaTime);
    updateClockInfo(time);
  }, 1000);
    
  rest.btnStart.setAttribute('disabled', true);
};

function updateClockInfo({ days, hours, minutes, seconds }) {
  rest.days.textContent = `${days}`;
  rest.hours.textContent = `${hours}`;
  rest.minutes.textContent = `${minutes}`;
  rest.seconds.textContent = `${seconds}`;
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};