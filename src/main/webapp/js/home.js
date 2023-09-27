"use strict"

document.addEventListener("DOMContentLoaded", () => {
    
    const product = new Product();
    const ui = new UI;
    // let cartArray = CustomStotage.getCart();
    // if (cartArray.length > 0) {
    //     cartArray.forEach(element => {
    //         ui.addToCart(element); 
    //     });
    // }
    product.getProducts().then(prod => ui.displayProduct(prod))
})    