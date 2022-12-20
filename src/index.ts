import { Book, Cart } from './modules/interfaces.js';
import { renderAllBooks, renderBookInfo } from './modules/display.js';

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

  console.log(bookId);
  overlay?.classList.toggle('hide');
  document.querySelector('.link')?.classList.toggle('white');
  renderBookInfo(allBooks, bookId - 1);
});

//Stänger "fönsret" och tömmer elem.
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

// Cart

document.querySelector('.choosen__book')?.addEventListener('click', (e) => {
  const target: HTMLElement | null = (e.target as Element).closest('.add__btn');
  if (!target) return;
  if (!target.dataset.id) return;
  const bookId: number | undefined = +target.dataset.id;
  addToCart(allBooks[bookId - 1], target);
  listProductsInCart();
  updateCart();
});

function addToCart(book: Book, button) {
  let newCartObj: Cart = {
    ...book,
    quantity: 1,
  };

  if (cart.some((book) => book.id === newCartObj.id)) alert('The books is already in the cart.');
  else {
    cart.push(newCartObj);
    button.textContent = 'Added';
    console.log(cart);
  }
}

function listProductsInCart() {
  let cartProducts = '';
  for (let i = 0; i < cart.length; i++) {
    cartProducts += `
    <section class="item__container">
    <aside class="list__item">
    <li><span class="product__title">Titel: </span>${cart[i].title} 
    </li>
    <li><span class="product__author">Author: </span>${cart[i].author} 
    </li></aside><button class="btn__remove" id="${[i]}">X</button></section>
    `;
  }
  document.getElementById('products').innerHTML = cartProducts;
}

document.getElementById('open-cart').addEventListener('click', function () {
  document.getElementById('cart').classList.toggle('hide');
  // listProductsInCart();
  // updateCart();
});

function updateCart() {
  document.getElementById('productsInCart').innerHTML = cart.length;
}

document.querySelector('#products').addEventListener('click', function (e) {
  console.log(e.target.id);
  if (e.target.classList.contains('btn__remove')) {
    let pressedRemoveBtn = e.target.id;
    cart.splice(pressedRemoveBtn, 1);
    updateCart();
    listProductsInCart();
  }
});
