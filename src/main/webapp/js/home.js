"use strict"







// heroBtn.addEventListener("click", relocation)

// productsBtn.addEventListener("click", relocation)

// function relocation() {
//     window.location.href = urlShopPage;
//     console.log(window.location.href)
// }
// function redirectToShopPage() {
//     const heroBtn = document.querySelector(".hero__btn");
//     const productsBtn = document.querySelector(".products__btn");
//     heroBtn.addEventListener("click", relocation)
//     productsBtn.addEventListener("click", relocation)
// }




document.addEventListener("DOMContentLoaded", () => {
    
    const products = new Product();
    const ui = new UI;

    products.getProducts().then(prod => ui.displayProduct(prod))
})    