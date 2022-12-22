export function addToCart(book, quantity, button, cart) {
    let newCartObj = Object.assign(Object.assign({}, book), { quantity: quantity });
    if (cart.some((book) => book.id === newCartObj.id))
        alert('This book is already in the cart.');
    else {
        cart.push(newCartObj);
        button.textContent = 'Added to cart.';
    }
}
export function listProductsInCart(cart) {
    var _a, _b;
    let cartProducts = '';
    (_a = document.querySelector('#cart__empty')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
    for (let i = 0; i < cart.length; i++) {
        cartProducts += `
    <section class="item__container">
    <aside class="list__item">
    <li><span class="product__title">Titel: </span>${cart[i].title} 
    </li>
    <li><span class="product__author">Author: </span>${cart[i].author} 
    </li></aside><p class="product__quantity">${cart[i].quantity}<span>x</span></p><button class="btn__cart btn__cart--remove" id="${[i]}">Remove</button></section>
    `;
    }
    document.getElementById('products').innerHTML = cartProducts;
    if (cart.length == 0) {
        (_b = document.querySelector('#cart__empty')) === null || _b === void 0 ? void 0 : _b.classList.remove('hide');
    }
}
export function updateCart(cart) {
    const bookQuantity = cart.map(function (book) {
        return book.quantity;
    });
    const itemsInCart = bookQuantity.reduce((partialSum, a) => partialSum + a, 0);
    document.getElementById('productsInCart').innerHTML = String(itemsInCart);
}
