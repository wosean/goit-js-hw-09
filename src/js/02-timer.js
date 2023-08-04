// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
      if (selectedDates <= new Date()) {
          alert('Please choose a date in the future');
          document.querySelector('[data-start]').disabled = true;
      } else {
         document.querySelector('[data-start]').disabled = false;       
      }
  },
};

const dateTimePicker = flatpickr('#datetime-picker', options);
let countdownInterval;

function startTimer() {
  const selectedDate = dateTimePicker.selectedDate[0];
  const currentDate = new Date();
  if (selectedDate > currentDate) {
    countdownInterval = setInterval(updateTimer, 1000, selectedDate);
    updateTimer(selectedDate);
  } else {
    alert('Please choose a date in the future');
  }
}




