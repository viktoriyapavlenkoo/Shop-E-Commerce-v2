let page = 1;
let size = 16;

document.addEventListener("DOMContentLoaded", () => {
    const products = new Product();
    const ui = new UI;
    products.getProducts(page, size).then(prod => ui.displayProduct(prod))
})