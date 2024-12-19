const startPage = document.querySelector('#ty-start-page');
const typingGame = document.querySelector('#ty-game');
const titleTime = document.querySelector('#ty-title-time');
const timer = document.querySelector('#ty-timer');
const timeSelectEl = document.querySelector('.ty-time-select');
const typing = document.querySelector('#typing');
const backToStart = document.querySelector('#back-to-start');
const resultContainer = document.querySelector('#ty-result-container');
const textarea = document.querySelector('#ty-textarea');

let timelimit = 30;
let remainingTime;
let isActive = false;
let isPlaying = false;

timeSelectEl.addEventListener('change', () => {
  timelimit = timeSelectEl.value;
});
window.addEventListener('keypress', (e) => {
  isActive = typing.classList.containes('active');

  if (e.key === 'Enter' && isActive && !isPlaying) {
    start();
    isActive = false;
    isPlaying = true;
  }
  return;
});

function start() {
  startPage.classList.remove('show');
  typingGame.classList.add('show');
  titleTime.textConten = timelimit;
  remainingTime = timelimit;
  timer.textContent = remainingTime;
  textarea.focus();

  setInterval(() => {
    remainingTime -= 1;
    timer.textContent = remainingTime;
  }, 1000);
}

backToStart.addEventListener('click', () => {
  typingGame.classList.remove('show');
  startPage.classList.add('show');
  resultContainer.classList.remove('show');
  isPlaying = false;
});
