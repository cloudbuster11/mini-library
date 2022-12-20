import { Book, Cart } from './interfaces';

export function addToCart(book: Book, button: HTMLElement, cart: Cart[]) {
  let newCartObj: Cart = {
    ...book,
    quantity: 1,
  };

  if (cart.some((book) => book.id === newCartObj.id)) alert('This book is already in the cart.');
  else {
    cart.push(newCartObj);
    button.textContent = 'Added';
    console.log(cart);
  }
}

export function listProductsInCart(cart: Cart[]) {
  let cartProducts = '';
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
}

export function updateCart(cart: Cart[]) {
  document.getElementById('productsInCart')!.innerHTML = String(cart.length);
}
