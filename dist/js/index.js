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
import { addToCart, listProductsInCart, updateCart } from './modules/cart.js';
import { searchBook } from './modules/searchBook.js';
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
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.toggle('hide');
    (_a = document.querySelector('.link')) === null || _a === void 0 ? void 0 : _a.classList.toggle('white');
    renderBookInfo(allBooks, bookId - 1);
});
//Stänger "fönstret" och tömmer elem.
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
    const result = searchBook(allBooks, searchInput, ['title', 'author']);
    if (result.length === 0)
        alert('No books found. Try again!');
    else
        renderAllBooks(result);
});
// Cart
(_d = document.querySelector('.choosen__book')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (e) => {
    const target = e.target.closest('.add__btn');
    if (!target)
        return;
    if (!target.dataset.id)
        return;
    const bookId = +target.dataset.id;
    addToCart(allBooks[bookId - 1], target, cart);
    listProductsInCart(cart);
    updateCart(cart);
});
document.getElementById('open-cart').addEventListener('click', function () {
    document.getElementById('cart').classList.toggle('hide');
});
document.querySelector('#products').addEventListener('click', function (e) {
    const removeBtn = e.target;
    if (removeBtn.classList.contains('btn__remove')) {
        let clickedBtnId = +removeBtn.id;
        cart.splice(clickedBtnId, 1);
        updateCart(cart);
        listProductsInCart(cart);
    }
});
