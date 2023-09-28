let page = 1;
let size = 16;

document.addEventListener("DOMContentLoaded", () => {
    const product = new Product();
    const ui = new UI;
    let storagePage = CustomStotage.getCurrentPage();
    //CustomStotage.clearCart();
    // let cartArray = CustomStotage.getCart();
    let cartArray = CustomStotage.getCart();
    if (cartArray.length > 0) {
        cartArray.forEach(element => {
            ui.addToCart(element); 
        });
    }
    let currentPage = storagePage ? storagePage : page;
    product.getProducts(currentPage, size)
        .then(prod => ui.displayProduct(prod))
        .then(() => ui.getButtonsOnShopPage(currentPage))
        
        // .then(() => ui.uiCart(cartArray))
    
})