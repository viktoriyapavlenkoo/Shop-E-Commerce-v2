"use strict"

const productList = document.querySelector(".product__list");
const btnCart = document.querySelector(".btn__cart");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector(".cart__close");

let burgerMenu = document.querySelector(".burger-menu");
let nav = document.querySelector(".smartfon__nav");
let closeMenu = document.querySelector(".close-menu");

let cartList;
let countProducts;
let buttonsBlock;
let buttonPrev;
let buttonNext;
let smartfonBtnCart;


let Cart = [];
let buttons = [];



burgerMenu.addEventListener('click', () => {
    nav.style.display = 'flex';    
    closeMenu.style.display = "block"
    smartfonBtnCart = document.querySelector('.smartfon__btn-cart')

    smartfonBtnCart.addEventListener("click", () => {
        cart.style.display = "block";
        let uiCart = new UICart();
        uiCart.getTotalSum()
        uiCart.clearCart()
    })
})

closeMenu.addEventListener("click", () => {
    nav.style.display = "none";
    closeMenu.style.display = "none";
})



let cartArray;
btnCart.addEventListener("click", () => {
    cart.style.display = "block";
    let uiCart = new UICart();
    uiCart.getTotalSum()
    uiCart.clearCart()
})

cartClose.addEventListener("click", () => {
    cart.style.display = "none";
})


class Product {
    async getProducts(page = 1, size = 8) {
        
        let sort = CustomStotage.getSortById();
                
        let response = await fetch('./json/products.json');
        let jsonResponse = await response.json();

        let products = jsonResponse.slice(0, size);
        countProducts = jsonResponse.length;
        products = products.map((item) => {
            const id = item.id;
            const image = item.imageUrl;
            const title = item.name;
            const price = item.price;
            const currency = item.currency; 
            const text = item.description;
            return {id, image, title, price, currency, text};
        })
        return products;       
    }
}

class UI {
    displayProduct(products) {
        for (let i = 0; i < products.length; i++) {
            let item = products[i];
            let productItem = document.createElement("div");
            productItem.classList.add("products__item")
            productItem.innerHTML = `<div class="products__img-block">
                                        <img src="./images/products/${item.image}" alt="product">
                                    </div>
                                    <div class="products__text-block">
                                        <a href="#" class="products__item-title">${item.title}</a>
                                        <p class="products__item-description">${item.text}</p>
                                        <p class="products__item-price">${item.price} ${item.currency}</p>
                                    </div>
                                    <div class="products__item-hover">
                                        <button class="btn products__hover-btn" data-id="${item.id}">Add to cart</button>
                                        <ul class="products__hover-list">
                                            <li class="products__hover-item">
                                                <button class="hover__btn share__btn"><img src="./images/share-icon.svg" alt="">Share</button>
                                            </li>
                                            <li class="products__hover-item">
                                                <button class="hover__btn compare__btn"><img src="./images/compare-icon.svg" alt="">Compare</button>
                                            </li>
                                            <li class="products__hover-item">
                                                <button class="hover__btn like__btn"><img src="./images/heart-hover-icon.svg" alt="">Like</button>
                                            </li>
                                        </ul>
                                    </div>`;

            productList.append(productItem);
            let btns = document.querySelectorAll(".products__hover-btn");
          
            const uiCart = new UICart()
            btns[i].addEventListener("click",() => {
                uiCart.addToCart(item)
            })
            
        } 
    }

    updateDisplay(products) {
        productList.innerHTML = '';
        this.displayProduct(products);
        location.reload();
    }

    getButtonsOnShopPage(currentPage) {

        let countPages = countProducts / size;

        currentPage = !currentPage ? page : currentPage;
        const product = new Product();

        buttonsBlock = document.createElement("div");
        buttonsBlock.classList.add("shop-products__buttons-block");

        
        
        for(let i = 1; i <= countPages; i++) {
            let button = document.createElement("button");
            button.classList.add("shop-products__btn");
            button.setAttribute("data-id", i);
            button.textContent = i;
            buttonsBlock.append(button);
            let id = button.dataset.id;
            button.addEventListener("click", () => {
                location.reload();

                if (page !== id) {
                    product.getProducts(id, size).then((prod) => this.updateDisplay(prod))
                }
                currentPage = id;
                
                if(!buttonPrev) {
                    this.getPrevButton(currentPage);
                } else if(currentPage == 1) {
                    buttonPrev.remove();
                    buttonPrev = undefined;
                }
                
                if(!buttonNext) {
                    this.getNextButton(currentPage, countPages);
                } else if(currentPage == countPages) {
                    buttonNext.remove();
                    buttonNext = undefined;
                }

                CustomStotage.saveCurrentPage(currentPage)

                
            })
            
        }

        

        productList.after(buttonsBlock)
        this.getNextButton(currentPage, countPages);
        this.getPrevButton(currentPage);

        if (buttonPrev) {
            buttonPrev.addEventListener("click", () => {
                currentPage = --currentPage;
                product.getProducts(currentPage, size).then((prod) => this.updateDisplay(prod));
                CustomStotage.saveCurrentPage(currentPage);
            } )
        }
        

        if(buttonNext) {
            buttonNext.addEventListener("click", () => {
                currentPage = ++currentPage;
                product.getProducts(currentPage, size).then((prod) => this.updateDisplay(prod));
                CustomStotage.saveCurrentPage(currentPage);
            } )
        }

        currentPage = CustomStotage.getCurrentPage()
        
        let btns = document.querySelectorAll(".shop-products__btn");
        
        btns = Array.from(btns);
        btns.map(btn => {
            if(btn.dataset.id === currentPage) {
            btn.style.background = 'var(--accent-color)';
            btn.style.color = 'var(--first-background-color)';
            }
        })
    }
    getPrevButton(currentPage) {
        if(currentPage > 1) {
            buttonPrev = document.createElement("button");
            buttonPrev.classList.add("shop-products__btn", "shop-products__btn-prev");
            buttonPrev.textContent = "Prev";
            buttonsBlock.prepend(buttonPrev)
            

        }
    }
    getNextButton(currentPage, countPages) {
        if(currentPage < countPages) {
            buttonNext = document.createElement("button");
            buttonNext.classList.add("shop-products__btn", "shop-products__btn-next");
            buttonNext.textContent = "Next";
            buttonsBlock.append(buttonNext)
        }
    }

    setSort() {
        let sort = document.querySelector('select');
        let sortValue = sort.value;

        let sortId;
        sort.addEventListener("change", (event) => {
            sortValue = event.target.value;
            CustomStotage.saveSortBy(sortValue)

            let sortOptions = document.querySelectorAll(".sort__option");
            sortOptions = Array.from(sortOptions);
            sortOptions.map(item => {
                if (sort.value === item.value) {
                    sortId = item.dataset.id;
                }
            })
            CustomStotage.saveSortById(sortId);
        })
        let storageSort = CustomStotage.getSortBy();
        sort.value = storageSort ? storageSort : sortValue;
    }

}


class UICart extends UI {
    addToCart(product) {
        let inCart = Cart.find(item => product.id === item.id);
        if (!inCart) {
            Cart.push(product);            
            cartList = document.querySelector(".cart__products-list");
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart__products-item");
            cartItem.innerHTML = `<div class="cart__item-img">
                                        <img src="./images/products/${product.image}" alt=""  width="120%">
                                    </div>
                                    <div class="cart__item-text">
                                        <h3 class="cart__item-title">${product.title}</h3>
                                        <div class="cart__item-price-block">
                                            <p class="cart__item-count">1</p>
                                            <p class="cart__item-mul">X</p>
                                            <p class="cart__item-price">${product.price} ${product.currency}</p>
                                        </div>
                                    </div>
                                    <button class="cart__item-close">
                                        <img src="images/cart/item-close-image.svg" alt="" class="close-img" data-id="${product.id}">
                                    </button>`
            cartList.append(cartItem);
            this.getTotalSum();
            CustomStotage.saveCart(Cart);   
             

            cartItem.addEventListener('click', (event) => {
                if (event.target.classList.contains("close-img")) {
                    let id = event.target.dataset.id
                    this.removeFromCart(Cart, id)
                    this.getTotalSum();
                    CustomStotage.saveCart(Cart);   
                }
            })

            //this.getTotalSum()
            let storageCart = CustomStotage.getCart();
            Cart = storageCart ? storageCart : Cart;   
        }
    }
    
    removeFromCart(Cart, id) {
        let item = event.target.parentElement.parentElement; 
        let targetItem = Cart.find(item => item.id == id);
        let index = Cart.indexOf(targetItem);
        Cart.splice(index, 1);
        cartList.removeChild(item);
    }

    getTotalSum() {

        let totalSum = document.querySelector(".total-price__sum");
        let sum = 0;
        let currency;
        if(Cart.length > 0) {
            currency = Cart[0].currency;
            for(let i = 0; i < Cart.length; i++) {

                sum += +Cart[i].price;
                
            }
            sum = sum.toFixed(2);
            totalSum.innerHTML = `${sum} ${currency}`;
        } else {
            totalSum.innerHTML = "";
        }
    }
    clearCart() {
        let clearBtn = document.querySelector(".btn-clear");;
        clearBtn.addEventListener("click", () => {
            if(Cart.length > 0) {
                Cart = [];
                cartList.innerHTML = ""; 
                this.getTotalSum();
                CustomStotage.saveCart(Cart);
            }
        })
    }
}




class CustomStotage {
    static saveProduct(products) {
        localStorage.setItem("products", JSON.stringify(products))
    }
    static getStorageProducts(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find((item) => item.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem("Cart", JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem("Cart") 
        ? JSON.parse(localStorage.getItem("Cart")):[];
    }
    static clearCart(cart) {
        localStorage.clear("Cart");
    }

    static saveCurrentPage(currentPage) {
        localStorage.setItem("currentPage", currentPage);
    }
    static getCurrentPage() {
        return localStorage.getItem("currentPage");
    }
    static saveSortBy(sort) {
        localStorage.setItem("sortBy", sort);
    }
    static getSortBy() {
        return localStorage.getItem("sortBy");
    }
    static saveSortById(sortId) {
        localStorage.setItem("sortById", sortId);
    }
    static getSortById() {
        return localStorage.getItem("sortById");
    }
}