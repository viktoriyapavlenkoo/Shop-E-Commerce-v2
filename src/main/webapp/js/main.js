"use strict"

const shopListEndpoint = "/shop/list/"

const productList = document.querySelector(".product__list");
const btnCart = document.querySelector(".btn__cart");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector(".cart__close");

let countProducts;
let buttonsBlock;
let buttonPrev;
let buttonNext;

let Cart = [];
let buttons = [];

btnCart.addEventListener("click", () => {
    cart.style.display = "block";
})

cartClose.addEventListener("click", () => {
    cart.style.display = "none";
})


class Product {
    async getProducts(page = 1, size = 8) {
        let response = await fetch(shopListEndpoint + "?" + new URLSearchParams({
            page: page,
            size: size
        }));
        let jsonResponse = await response.json();

        let products = jsonResponse.data;
        countProducts = jsonResponse.count
        products = products.map((item) => {
            const id = item.id;
            const image = item.imageUrl;
            const title = item.name;
            const price = item.price;
            const text = item.description;
            return {id, image, title, price, text};
        })
        return products;       
    }
}

class UI {
    displayProduct(products) {
        products.forEach((item) => {

            let productItem = document.createElement("div");
            productItem.classList.add("products__item")
            productItem.innerHTML = `<div class="products__img-block">
                                        <img src="./images/products/${item.image}" alt="product">
                                    </div>
                                    <div class="products__text-block">
                                        <a href="#" class="products__item-title">${item.title}</a>
                                        <p class="products__item-description">${item.text}</p>
                                        <p class="products__item-price">${item.price}</p>
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
        })
    }

    updateDisplay(products) {
        productList.innerHTML = '';
        this.displayProduct(products);
    }

    addToCart() {
        const productBtns = document.querySelectorAll(".products__hover-btn");
        Array.from(productBtns);
        productBtns.forEach((btn) => {
            let id = btn.dataset.id;
            // console.log(id)
        })
    }
    

    getButtonsOnShopPage(currentPage) {

        let countPages = countProducts / size;

        currentPage = !currentPage ? page : currentPage;
        console.log("currentPage " + currentPage)
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
                
                if (page !== id) {
                    product.getProducts(id, size).then((prod) => this.updateDisplay(prod))
                }
                currentPage = id;
                console.log("currentPage: " + currentPage)
                
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
        // CustomStotage.saveCurrentPage(currentPage)
        // CustomStotage.getCurrentPage();
        currentPage = CustomStotage.getCurrentPage()
        
        
        console.log(currentPage)


        // this.getPrevButton(currentPage);
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
}

class CustomStotage {
    static saveProduct(products) {
        localStorage.setItem("products", JSON.stringify(products))
    }
    static getStorageProducts(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find((item) => item.id === id);
    }
    static saveCart(Cart) {
        localStorage.setItem("Cart", JSON.stringify(Cart));
    }
    static getCart() {
        return localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")):[];
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
}
