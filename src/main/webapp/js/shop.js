let page = 1;
let size = 16;

document.addEventListener("DOMContentLoaded", () => {
    const product = new Product();
    const ui = new UI;
    let storagePage = CustomStotage.getCurrentPage();
    let currentPage = storagePage ? storagePage : page;
    product.getProducts(currentPage, size)
        .then(prod => ui.displayProduct(prod))
        .then(() => ui.getButtonsOnShopPage(currentPage))
})