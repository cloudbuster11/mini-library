import { Book, Cart } from './modules/interfaces.js';
import { renderAllBooks, renderBookInfo } from './modules/display.js';
import { addToCart, listProductsInCart, updateCart } from './modules/cart.js';
import { searchBook } from './modules/searchBook.js';

const BASE_URL: string = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';
let allBooks: Book[] = [];
let cart: Cart[] = [];
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

  overlay?.classList.toggle('hide');
  document.querySelector('.link')?.classList.toggle('white');
  renderBookInfo(allBooks, bookId - 1);
});

//Stänger "fönstret" och tömmer elem.
document.querySelector('.goback__btn')?.addEventListener('click', () => {
  overlay?.classList.toggle('hide');
  document.querySelector('.link')?.classList.toggle('white');
  document.querySelector('.choosen__book')!.innerHTML = '';
});

// Sök
document.querySelector('.btn__search')?.addEventListener('click', () => {
  const inputElem: HTMLInputElement | null = document.querySelector('.searchbar__inputfield');
  if (!inputElem) return;
  const searchInput: string | null = inputElem.value;
  const result: Book[] = searchBook(allBooks, searchInput, ['title', 'author']);
  if (result.length === 0) alert('No books found. Try again!');
  else renderAllBooks(result);
});

// Cart
document.querySelector('.choosen__book')?.addEventListener('click', (e) => {
  const target: HTMLElement | null = (e.target as Element).closest('.add__btn');
  if (!target) return;
  if (!target.dataset.id) return;
  const bookId: number | undefined = +target.dataset.id;

  addToCart(allBooks[bookId - 1], target, cart);
  listProductsInCart(cart);
  updateCart(cart);
});

document.getElementById('open-cart')!.addEventListener('click', function () {
  document.getElementById('cart')!.classList.toggle('hide');
});

document.querySelector('#products')!.addEventListener('click', function (e) {
  const removeBtn = e.target as Element;
  if (removeBtn.classList.contains('btn__remove')) {
    let clickedBtnId: number = +removeBtn.id;
    cart.splice(clickedBtnId, 1);
    updateCart(cart);
    listProductsInCart(cart);
  }
});
