document.addEventListener("DOMContentLoaded", () => {

    let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
    let allProductsContainer = document.querySelector(".cart_products");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let favContainer = document.getElementById("favorites_container");

    function drawCartProducts(products) {
        let html = products.map((item,index)=>{
            return `
<div class="col-12 col-sm-6 mb-4">
<div class="card mb-3">
<div class="row g-0">
<div class="col-md-3"><img src="${item.imgurl}" alt="${item.name}" width="150" height="150"></div>
<div class="col-md-9">
<div class="card-body">
<h5>${item.name}</h5>
<p>category: ${item.category}</p>
<p>price: $${item.price}</p>
<div class="collect">
<button class="decrease_quantity_checkout decrease_quantity" data-index="${index}">-</button>
<span>${item.quantity || 1}</span>
<button class="increase_quantity_checkout increase_quantity" data-index="${index}">+</button>
<button class="remove_btn_checkout remove_btn" data-index="${index}">Remove From Cart</button>
</div>

</div>
</div></div></div></div>`;
        }).join("");

        if(allProductsContainer) allProductsContainer.innerHTML = html;

        products.forEach((item,index)=>{
            allProductsContainer.querySelector(`.increase_quantity[data-index='${index}']`)?.addEventListener('click',()=>{
                item.quantity = (item.quantity||1)+1;
                localStorage.setItem("cart", JSON.stringify(products));
                drawCartProducts(products);
                updateCartCount(products);
            });
            allProductsContainer.querySelector(`.decrease_quantity[data-index='${index}']`)?.addEventListener('click',()=>{
                if(item.quantity>1) item.quantity-=1;
                else products.splice(index,1);
                localStorage.setItem("cart", JSON.stringify(products));
                drawCartProducts(products);
                updateCartCount(products);
            });
            allProductsContainer.querySelector(`.remove_btn[data-index='${index}']`)?.addEventListener('click',()=>{
                products.splice(index,1);
                localStorage.setItem("cart", JSON.stringify(products));
                drawCartProducts(products);
                updateCartCount(products);
            });
        });
    }

    function updateCartCount(products) {
        document.querySelectorAll(".count_item_header, .count_item_cart").forEach(el=>el.textContent=products.length);
        let totalPrice = products.reduce((acc,item)=>acc+(item.price*(item.quantity||1)),0);
        let totalPriceBox = document.querySelector(".total_price");
        if(totalPriceBox) totalPriceBox.textContent = " Total Price : $"+totalPrice;

        let favCount = document.querySelector('.count_favourit');
        if(favCount) favCount.textContent = favorites.length;
    }

    function drawFavoriteCards() {
        if(!favContainer) 
            return;
        if(favorites.length===0){
            favContainer.innerHTML="<h3>No Favorite Items</h3>"; 
            return;
        }
        let html=favorites.map((item,index)=>{
            return`
<div class="card" style="width:18rem;">
<img src="${item.imgurl}" class="card-img-top" style="height:200px; object-fit:cover;">
<div class="card-body text-center">
<h5>${item.name}</h5>
<p>category: ${item.category}</p>
<div class="heart" data-index="${index}" style="cursor:pointer; font-size:20px;">
<i class="fas fa-heart" style="color:red;"></i>
</div>
</div>
</div>`}).join("");

        favContainer.innerHTML=html;
        addRemoveFavoriteEvent();
    }

    function addRemoveFavoriteEvent() {
        let hearts = document.querySelectorAll(".heart");
        hearts.forEach(heart=>{
            heart.addEventListener("click",()=>{
                let index = heart.getAttribute("data-index");
                favorites.splice(index,1);
                localStorage.setItem("favorites",JSON.stringify(favorites));
                drawFavoriteCards();
            });
        });
    }

    drawCartProducts(cartProducts);
    updateCartCount(cartProducts);
    drawFavoriteCards();

});





// ============================
// عند الضغط على القلب → حذف من الفافوريت
// ============================
// function addRemoveFavoriteEvent() {

//     let hearts = document.querySelectorAll(".heart");

//     hearts.forEach(heart => {
//         heart.addEventListener("click", () => {

//             let index = heart.getAttribute("data-index");

//             favorites.splice(index, 1);

//             localStorage.setItem("favorites", JSON.stringify(favorites));

//             drawFavoriteCards();
//         });
//     });
// }





document.addEventListener("DOMContentLoaded", () => {
    const log_out_btn = document.querySelector(".log_out");
    if (log_out_btn) {
        log_out_btn.addEventListener("click", () => {
            localStorage.clear();  
            // استخدمي assign بدل = أحيانًا يكون أوضح
            window.location.assign("index.html");
        });
    }
});


