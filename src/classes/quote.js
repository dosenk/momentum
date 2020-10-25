const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');

async function getQuote() {
  try {
    const url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
  } catch (e) {
    console.log('Превышен лимит запросов к серверу с цитатами! Попробуйте завтра :)');
    // throw e;
  }
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);
