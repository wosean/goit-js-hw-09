function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

document.querySelector('button[data-stop]').disabled = true;

let timerId = 0;

startBtn.addEventListener("click", () => {
    timerId = setInterval(() => {
        document.body.style.background = getRandomHexColor();
    }, 1000,
    document.querySelector('button[data-start]').disabled = true,
    document.querySelector('button[data-stop]').disabled = false)
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    document.querySelector('button[data-start]').disabled = false;
    document.querySelector('button[data-stop]').disabled = true;
});