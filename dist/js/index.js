var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d, _e, _f;
import { renderAllBooks, renderBookInfo } from './modules/display.js';
import { addToCart, listProductsInCart, updateCart } from './modules/cart.js';
import { handleSearch } from './modules/searchBook.js';
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
            allBooks = data;
            renderAllBooks(data);
        }
    });
}
getBooks();
// Eventlistners
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
    (_a = document.querySelector('.cart__link')) === null || _a === void 0 ? void 0 : _a.classList.toggle('white');
    renderBookInfo(allBooks, bookId - 1);
});
(_b = document.querySelector('#btn__allbooks')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    getBooks();
});
//Stänger overlay
(_c = document.querySelector('.goback__btn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
    var _a;
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.toggle('hide');
    (_a = document.querySelector('.cart__link')) === null || _a === void 0 ? void 0 : _a.classList.toggle('white');
    document.querySelector('.choosen__book').innerHTML = '';
});
// Sökfunktionen
(_d = document.querySelector('.btn__search')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
    handleSearch(allBooks, renderAllBooks);
});
(_e = document.querySelector('.searchbar__inputfield')) === null || _e === void 0 ? void 0 : _e.addEventListener('keyup', (e) => {
    const target = e;
    if (target.key === 'Enter')
        handleSearch(allBooks, renderAllBooks);
});
// Cart
(_f = document.querySelector('.choosen__book')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', (e) => {
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
        listProductsInCart(cart);
        updateCart(cart);
    }
});
