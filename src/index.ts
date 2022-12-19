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

// Visar info om boken
document.querySelector('.books__container')?.addEventListener('click', (e) => {
  const target: HTMLElement | null = (e.target as Element).closest('.book--small');
  if (!target) return;
  if (!target.dataset.id) return;
  const bookId: number | undefined = +target.dataset.id;

  console.log(bookId);
  overlay?.classList.toggle('hide');
  renderBookInfo(allBooks, bookId - 1);
});

//Stänger "fönsret" och tömmer elem.
document.querySelector('.goback__btn')?.addEventListener('click', () => {
  overlay?.classList.toggle('hide');
  document.querySelector('.choosen__book')!.innerHTML = '';
});

// Sök
document.querySelector('.btn__search')?.addEventListener('click', () => {
  const inputElem: HTMLInputElement | null = document.querySelector('.searchbar__inputfield');
  if (!inputElem) return;
  const searchInput: string | null = inputElem.value;
  console.log(searchInput);
  const result: Book[] = searchBook(searchInput, ['title', 'author']);
  if (result.length === 0) alert('No books found. Try again!');
  else renderAllBooks(result);
});

function searchBook(search: string, keys: string[]) {
  const lowSearch = search.toLowerCase();
  return allBooks.filter((books) =>
    keys.some((key) =>
      String(books[key as keyof Book])
        .toLowerCase()
        .includes(lowSearch)
    )
  );
}
