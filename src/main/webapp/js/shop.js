let page = 1;
let size = 16;

document.addEventListener("DOMContentLoaded", () => {
    const product = new Product();
    const ui = new UI;
    
    const uiCart = new UICart()
    
    //console.log(uiCart)


    let storagePage = CustomStotage.getCurrentPage();
    //CustomStotage.clearCart();
    // let cartArray = CustomStotage.getCart();
    let cartArray = CustomStotage.getCart();
    if (cartArray.length > 0) {
        cartArray.forEach(element => {
            uiCart.addToCart(element); 
            // ui.removeFromCart(cartArray)
        });
    }
    // ui.removeFromCart(cartArray)
    let currentPage = storagePage ? storagePage : page;
    product.getProducts(currentPage, size)
        .then(prod => ui.displayProduct(prod))
        .then(() => ui.setSort())
        .then(() => ui.getButtonsOnShopPage(currentPage))
       // .then((prod) => uiCart.displayProduct(prod))
        
        // .then(() => ui.removeFromCart(cartArray))
        
        // .then(() => ui.uiCart(cartArray))
    
})