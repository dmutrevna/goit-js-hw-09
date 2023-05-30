const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
btnStop.disabled = true;

let intervalId;

btnStart.addEventListener('click', onClickStart);
btnStop.addEventListener('click', onClickStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onClickStart() {
  intervalId = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;
    btnStart.disabled = true;
    btnStop.disabled = false;
  }, 1000);
}

function onClickStop() {
  btnStop.disabled = true;
  btnStart.disabled = false;
  clearInterval(intervalId);
}
