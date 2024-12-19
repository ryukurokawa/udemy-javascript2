const startPage = document.querySelector('#ty-start-page');
const typingGame = document.querySelector('#ty-game');
const titleTime = document.querySelector('#ty-title-time');
const timer = document.querySelector('#ty-timer');
const timeSelectEl = document.querySelector('.ty-time-select');
const typing = document.querySelector('#typing');
const backToStart = document.querySelector('#ty-back-to-start');
const resultContainer = document.querySelector('#ty-result-container');
const textarea = document.querySelector('#ty-textarea');
const quote = document.querySelector('#ty-quote');
const author = document.querySelector('#ty-author-name');

let timelimit = 30;
let remainingTime;
let isActive = false;
let isPlaying = false;
let intervalid = null;
let quotes;

timeSelectEl.addEventListener('change', () => {
  timelimit = timeSelectEl.value;
});
window.addEventListener('keypress', (e) => {
  isActive = typing.classList.contains('active');

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
  textarea.disabled = false;

  intervalid = setInterval(() => {
    remainingTime -= 1;
    timer.textContent = remainingTime;
    if (remainingTime <= 0) {
      showResult();
    }
  }, 1000);
}

backToStart.addEventListener('click', () => {
  typingGame.classList.remove('show');
  startPage.classList.add('show');
  resultContainer.classList.remove('show');
  isPlaying = false;
});

function showResult() {
  textarea.disabled = true;
  clearInterval(intervalid);
  setTimeout(() => {
    resultContainer.classList.add('show');
  }, 1000);
}

async function fetchAndRenderQuotes() {
  const RANDOM_QUOTE_API_URl = 'https://api.quotable.io/quotes/random';
  const response = await fetch(RANDOM_QUOTE_API_URl);
  const data = await response.json();
  console.log(response);
  console.log(data);

  quotes = { quote: data.content, author: data.author };
  console.log(quotes);

  quotes.quote.split('').forEach((letter) => {});
}

fetchAndRenderQuotes();
