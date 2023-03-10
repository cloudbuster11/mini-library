import { Book } from './interfaces';

export function renderAllBooks(books: Book[]): void {
  const booksContainer: HTMLElement | null = document.querySelector('.books__container');
  booksContainer!.innerHTML = '';
  if (!booksContainer) return;
  books.forEach((book) => {
    const bookHtml: string = `<article class="book book--small book--bg book--${book.id}" data-id="${book.id}">
    <h3 class="book__title">${book.title}</h3>
    <p class="book_author">${book.author}</p>
    </article>`;

    booksContainer.insertAdjacentHTML('beforeend', bookHtml);
    const renderedBook: HTMLElement | null = document.querySelector(`.book--${book.id}`);

    if (!renderedBook) return;
    renderedBook.style.backgroundColor = `${book.color}`;
  });
}

export function renderBookInfo(books: Book[], bookId: number): void {
  const choosenBookElem: HTMLElement | null = document.querySelector('.choosen__book');
  if (!choosenBookElem) return;
  const bookInfoHtml: string = `<section class="book book--bg book--large book--${books[bookId].id}--large">
<h1 class="book__title book__title--large">${books[bookId].title}</h1>
<p class="book__author book__author--large">${books[bookId].author}</p>
</section>
<section class="book__info">
<h1 class="book__title book__title-rev">${books[bookId].title}</h1>
<p class="book__author author__title-rev">By ${books[bookId].author}</p>
<p class="book__plot">${books[bookId].plot}</p>
<aside class="book__misc">
  <p class="plot__text plot__audience">Audience: <span>${books[bookId].audience}</span></p>
  <p class="plot__text plot__published">First published: <span>${books[bookId].year}</span></p>
  <p class="plot__text plot__pages">Pages: <span>${books[bookId].pages}</span></p>
  <p class="plot__text plot__publisher">Publisher: <span>${books[bookId].publisher}</span></p>
</aside>
  <button class="add__btn" data-id="${books[bookId].id}">Oh, I want to read it!</button>
  <label for="cart__quantity">Qty:</label>
  <select type="number" placeholder="Qty:"  class="cart__quantity"">Qty:
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  </select>
  </section>
`;

  choosenBookElem.insertAdjacentHTML('beforeend', bookInfoHtml);
  const renderedBook: HTMLElement | null = document.querySelector(`.book--${books[bookId].id}--large`);

  if (!renderedBook) return;
  renderedBook.style.backgroundColor = `${books[bookId].color}`;
}
