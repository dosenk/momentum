// если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
// скопируйте код себе и запустите со своего компьютера
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked
async function getQuote() {
  const url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);
