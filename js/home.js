"use strict"

document.addEventListener("DOMContentLoaded", () => {
    
    const product = new Product();
    const ui = new UI;
    const uiCart = new UICart();

    let cartArray = CustomStotage.getCart();
    
    if (cartArray.length > 0) {
        cartArray.forEach(element => {
            uiCart.addToCart(element); 
        });
    }

    product.getProducts().then(prod => ui.displayProduct(prod))
    
})    