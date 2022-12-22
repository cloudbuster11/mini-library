import { Book, Cart } from './modules/interfaces.js';
import { renderAllBooks, renderBookInfo } from './modules/display.js';
import { addToCart, listProductsInCart, updateCart } from './modules/cart.js';
import { handleSearch } from './modules/searchBook.js';

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
    allBooks = data;
    renderAllBooks(data);
  }
}

getBooks();

// Eventlistners
// Visar overlay och bokinfo.
document.querySelector('.books__container')?.addEventListener('click', (e) => {
  const target: HTMLElement | null = (e.target as Element).closest('.book--small');
  if (!target) return;
  if (!target.dataset.id) return;
  const bookId: number | undefined = +target.dataset.id;

  overlay?.classList.toggle('hide');
  document.querySelector('.cart__link')?.classList.toggle('white');
  renderBookInfo(allBooks, bookId - 1);
});

document.querySelector('#btn__allbooks')?.addEventListener('click', () => {
  getBooks();
});

//Stänger overlay
document.querySelector('.btn__goback')?.addEventListener('click', () => {
  overlay?.classList.toggle('hide');
  document.querySelector('.cart__link')?.classList.toggle('white');
  document.querySelector('.choosen__book')!.innerHTML = '';
});

// Sökfunktionen
document.querySelector('.btn__search')?.addEventListener('click', () => {
  handleSearch(allBooks, renderAllBooks);
});

document.querySelector('.searchbar__inputfield')?.addEventListener('keyup', (e) => {
  const target = <KeyboardEvent>e;
  if (target.key === 'Enter') handleSearch(allBooks, renderAllBooks);
});

// Cartfunktionen
document.querySelector('.choosen__book')?.addEventListener('click', (e) => {
  const target: HTMLElement | null = (e.target as Element).closest('.add__btn');
  const quantity: number = +(<HTMLInputElement>document.querySelector('.cart__quantity')).value;

  if (!target) return;
  if (!target.dataset.id) return;
  const bookId: number | undefined = +target.dataset.id;

  addToCart(allBooks[bookId - 1], quantity, target, cart);
  listProductsInCart(cart);
  updateCart(cart);
});

document.getElementById('open-cart')!.addEventListener('click', function () {
  document.getElementById('cart')!.classList.toggle('hide');
});

document.querySelector('#products')!.addEventListener('click', function (e) {
  const removeBtn = e.target as Element;
  if (removeBtn.classList.contains('btn__cart--remove')) {
    let clickedBtnId: number = +removeBtn.id;
    cart.splice(clickedBtnId, 1);
    listProductsInCart(cart);
    updateCart(cart);
  }
});

document.querySelector('.btn__cart--checkout')?.addEventListener('click', () => {
  if (cart.length == 0) alert('No products in the cart yet.');
  else alert('Thank you for your order!');
});
