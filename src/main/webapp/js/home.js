"use strict"

document.addEventListener("DOMContentLoaded", () => {
    
    const product = new Product();
    const ui = new UI;

    //CustomStotage.clearCart();
    let cartArray = CustomStotage.getCart();
    //console.log(cartArray)
    
    if (cartArray.length > 0) {
        cartArray.forEach(element => {
            ui.addToCart(element); 
        });
    }
    product.getProducts().then(prod => ui.displayProduct(prod))
})    