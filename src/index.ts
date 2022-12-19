import { Book } from './modules/interfaces.js';
import { renderAllBooks, renderBookInfo } from './modules/display.js';

const BASE_URL: string = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';
let allBooks: Book[] = [];
const overlay = document.querySelector('.overlay');

async function getBooks() {
  const response = await fetch(`${BASE_URL}/`);

  let data: Book[] = await response.json();

  if (response.status !== 200) {
    console.log(response.status);
  } else {
    console.log(data);
    allBooks = data;
    renderAllBooks(data);
  }
}

getBooks();

document.querySelector('.books__container')?.addEventListener('click', (e) => {
  const target: HTMLDataElement = e.target.closest('.book--small');
  const bookId: number = +target.dataset.id;

  console.log(bookId);
  overlay?.classList.toggle('hide');
  renderBookInfo(allBooks, bookId - 1);
});

document.querySelector('.goback__btn')?.addEventListener('click', () => {
  overlay?.classList.toggle('hide');
  document.querySelector('.choosen__book')?.innerHTML = '';
});
