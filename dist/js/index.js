var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
import { renderAllBooks, renderBookInfo } from './modules/display.js';
const BASE_URL = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';
let allBooks = [];
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
    const target = e.target.closest('.book--small');
    if (!target)
        return;
    if (!target.dataset.id)
        return;
    const bookId = +target.dataset.id;
    console.log(bookId);
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.toggle('hide');
    renderBookInfo(allBooks, bookId - 1);
});
//Stänger "fönsret" och tömmer elem.
(_b = document.querySelector('.goback__btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.toggle('hide');
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
