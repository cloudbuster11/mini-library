var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d;
import { renderAllBooks, renderBookInfo } from './modules/display.js';
const BASE_URL = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';
let allBooks = [];
let cart = [];
const overlay = document.querySelector('.overlay');
function getBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${BASE_URL}/`);
        let data = yield response.json();
        if (response.status !== 200) {
            console.log(response.status);
        }
        else {
            console.log(data);
            allBooks = data;
            renderAllBooks(data);
        }
    });
}
getBooks();
// Visar info om boken
(_a = document.querySelector('.books__container')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
    var _a;
    const target = e.target.closest('.book--small');
    if (!target)
        return;
    if (!target.dataset.id)
        return;
    const bookId = +target.dataset.id;
    console.log(bookId);
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.toggle('hide');
    (_a = document.querySelector('.link')) === null || _a === void 0 ? void 0 : _a.classList.toggle('white');
    renderBookInfo(allBooks, bookId - 1);
});
//Stänger "fönsret" och tömmer elem.
(_b = document.querySelector('.goback__btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    var _a;
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.toggle('hide');
    (_a = document.querySelector('.link')) === null || _a === void 0 ? void 0 : _a.classList.toggle('white');
    document.querySelector('.choosen__book').innerHTML = '';
});
// Sök
(_c = document.querySelector('.btn__search')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
    const inputElem = document.querySelector('.searchbar__inputfield');
    if (!inputElem)
        return;
    const searchInput = inputElem.value;
    console.log(searchInput);
    const result = searchBook(searchInput, ['title', 'author']);
    if (result.length === 0)
        alert('No books found. Try again!');
    else
        renderAllBooks(result);
});
function searchBook(search, keys) {
    const lowSearch = search.toLowerCase();
    return allBooks.filter((books) => keys.some((key) => String(books[key])
        .toLowerCase()
        .includes(lowSearch)));
}
// Cart
(_d = document.querySelector('.choosen__book')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (e) => {
    const target = e.target.closest('.add__btn');
    if (!target)
        return;
    if (!target.dataset.id)
        return;
    const bookId = +target.dataset.id;
    addToCart(allBooks[bookId - 1], target);
    listProductsInCart();
    updateCart();
});
function addToCart(book, button) {
    let newCartObj = Object.assign(Object.assign({}, book), { quantity: 1 });
    if (cart.some((book) => book.id === newCartObj.id))
        alert('The books is already in the cart.');
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
