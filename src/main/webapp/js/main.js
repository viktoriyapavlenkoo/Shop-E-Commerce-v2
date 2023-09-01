"use strict"

const shopListEndpoint = "/shop/list/"

const productList = document.querySelector(".product__list");
const btnCart = document.querySelector(".btn__cart");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector(".cart__close");


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
    addToCart() {
        const productBtns = document.querySelectorAll(".products__hover-btn");
        Array.from(productBtns);
        productBtns.forEach((btn) => {
            let id = btn.dataset.id;
            // console.log(id)
        })
        
        
    }
}


