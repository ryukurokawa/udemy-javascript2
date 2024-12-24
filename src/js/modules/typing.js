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
let intervalId = null;
let quotes;
let typedCount = 0;
timeSelectEl.addEventListener('change', () => {
  timelimit = parseInt(timeSelectEl.value, 10); // 数字に変換
});

window.addEventListener('keypress', (e) => {
  isActive = typing.classList.contains('active');
  if (e.key === 'Enter' && isActive && !isPlaying) {
    start();
    isActive = false;
    isPlaying = true;
  }
});

async function start() {
  startPage.classList.remove('show');
  typingGame.classList.add('show');
  titleTime.textContent = timelimit; // 修正
  remainingTime = timelimit;
  timer.textContent = remainingTime;

  await fetchAndRenderQuotes();

  textarea.disabled = false;
  textarea.focus();

  intervalId = setInterval(() => {
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
  clearInterval(intervalId);
  setTimeout(() => {
    resultContainer.classList.add('show');
  }, 1000);
}

async function fetchAndRenderQuotes() {
  const proxyUrl = 'https://api.allorigins.win/get?url=';
  const targetUrl = 'https://zenquotes.io/api/random';

  const response = await fetch(proxyUrl + targetUrl);
  const data = await response.json();
  console.log('データ', data);
  console.log('データの内容', data.contents);

  const parsedData = JSON.parse(data.contents);
  const quoteText = parsedData[0].q;
  const authorName = parsedData[0].a;

  quotes = { quote: quoteText, author: authorName };
  console.log(quotes);

  const quoteContainer = document.querySelector('#ty-quote');
  quoteContainer.innerHTML = '';

  quotes.quote.split('').forEach((letter) => {
    const span = document.createElement('span');
    span.textContent = letter;
    quoteContainer.appendChild(span);
  });

  author.textContent = quotes.author;
  console.log(quote);
  console.log(author);
}

textarea.addEventListener('input', () => {
  let inputArray = textarea.value.split('');
  let spans = quote.querySelectorAll('span');
  spans.forEach((span) => {
    span.className = '';
  });

  inputArray.forEach((letter, index) => {
    if (letter === spans[index].textContent) {
      spans[index].classList.add('correct');
    } else {
      spans[index].classList.add('wrong');
      if (spans[index].textContent === ' ') spans[index].classList.add('bar');
    }
  });
});
