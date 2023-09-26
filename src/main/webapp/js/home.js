"use strict"

document.addEventListener("DOMContentLoaded", () => {
    
    const product = new Product();
    const ui = new UI;
    product.getProducts().then(prod => ui.displayProduct(prod))
})    