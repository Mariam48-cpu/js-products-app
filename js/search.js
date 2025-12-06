document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");
    const searchType = document.getElementById("category");
    const productsContainer = document.querySelector(".con");

    const products = [
        { id: 0, price: "350", category: "Sweet & Cozy", name: "Vanilla Bean", imgurl: "images/candel1.jpg" },
        { id: 1, price: "400", category: "Woody & Earthy", name: "Amber Woods", imgurl: "images/candel2.jpg" },
        { id: 2, price: "250", category: "Spice & Wrmth", name: "Chinnamon Stick", imgurl: "images/candel3.jpg" },
        { id: 3, price: "550", category: "Spice & Wrmth", name: "Chai Latte", imgurl: "images/candel4.jpg" },
        { id: 4, price: "500", category: "Sweet & Cozy", name: "Caramel Glow", imgurl: "images/candel5.jpg" },
        { id: 5, price: "700", category: "Spice & Wrmth", name: "Pumpkin Spice", imgurl: "images/candel6.jpg" },
        { id: 6, price: "650", category: "Woody & Earthy", name: "Sandalwood", imgurl: "images/candel7.jpg" },
        { id: 7, price: "200", category: "Sweet & Cozy", name: "Honey & Almond", imgurl: "images/candel8.jpg" },
        { id: 8, price: "250", category: "Woody & Earthy", name: "Cedar & Oak", imgurl: "images/candel9.jpg" },
    ];

    function renderProducts(productsArray) {
        productsContainer.innerHTML = "";

        if (productsArray.length === 0) {
            productsContainer.innerHTML = `<p class="text-center fs-4">No products found.</p>`;
            return;
        }

        productsArray.forEach(product => {
            productsContainer.innerHTML += `
<div class="col-12 col-sm-6 col-md-4 mb-4">
    <div class="card h-100 img candels" style="border-radius: 20px;">
        <img src="${product.imgurl}" class="card-img-top candelspt-0" style="height: 250px; border-radius: 10px;">
        <div style="margin: auto;">
            <h3 class="fw-bold">${product.name}</h3>
            <p>price : $${product.price}</p>
            <p>category : ${product.category}</p>
            <div class="d-flex justify-content-center pe-3 mb-2" style="gap: 10px;">
                <a href="#"><i class="fas fa-heart" ></i></a> 
                <button class="btn_add_cart btn" data-id="${product.id}" style="width: 140px; height: 40px; background-color: #4b3621; border:none;">Add to cart</button>
            </div>
        </div>
    </div>
</div>`;
        });
    }

    // عرض جميع المنتجات أول مرة
    renderProducts(products);

    function filterProducts() {
        const query = searchInput.value.toLowerCase();
        const type = searchType.value.toLowerCase();

        const filtered = products.filter(product => {
            if (type === "search by product name") {
                return product.name.toLowerCase().includes(query);
            } else if (type === "search by category") {
                return product.category.toLowerCase().includes(query);
            }
        });

        renderProducts(filtered);
    }

    searchInput.addEventListener("input", filterProducts);
    searchType.addEventListener("change", filterProducts);

});
