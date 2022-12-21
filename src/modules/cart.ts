import { Book, Cart } from './interfaces';

export function addToCart(book: Book, button: HTMLElement, cart: Cart[]): void {
  let newCartObj: Cart = {
    ...book,
    quantity: 1,
  };

  if (cart.some((book) => book.id === newCartObj.id)) alert('This book is already in the cart.');
  else {
    cart.push(newCartObj);
    button.textContent = 'Added to cart.';
  }
}

export function listProductsInCart(cart: Cart[]): void {
  let cartProducts = '';
  document.querySelector('#cart__empty')?.classList.add('hide');
  for (let i = 0; i < cart.length; i++) {
    cartProducts += `
    <section class="item__container">
    <aside class="list__item">
    <li><span class="product__title">Titel: </span>${cart[i].title} 
    </li>
    <li><span class="product__author">Author: </span>${cart[i].author} 
    </li></aside><button class="btn__remove" id="${[i]}">Remove</button></section>
    `;
  }
  document.getElementById('products')!.innerHTML = cartProducts;

  if (cart.length == 0) {
    document.querySelector('#cart__empty')?.classList.remove('hide');
  }
}

export function updateCart(cart: Cart[]) {
  document.getElementById('productsInCart')!.innerHTML = String(cart.length);
}
