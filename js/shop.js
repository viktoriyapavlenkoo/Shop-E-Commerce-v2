let page = 1;
let size = 8;

document.addEventListener("DOMContentLoaded", () => {
    const product = new Product();
    const ui = new UI;
    
    const uiCart = new UICart()

    let storagePage = CustomStotage.getCurrentPage();
    let cartArray = CustomStotage.getCart();
    if (cartArray.length > 0) {
        cartArray.forEach(element => {
            uiCart.addToCart(element); 
        });
        
    }

    let currentPage = storagePage ? storagePage : page;
    product.getProducts(currentPage, size)
        .then(prod => ui.displayProduct(prod))
        .then(() => ui.setSort())
        .then(() => ui.getButtonsOnShopPage(currentPage))

})