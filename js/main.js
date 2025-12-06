document.addEventListener("DOMContentLoaded", () => {

    const allproduct = document.querySelector('.con');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const products_row = [
        { id: 0, price: 350, category: "Sweet & Cozy", name: "Vanilla Bean", imgurl: "images/candel1.jpg" },
        { id: 1, price: 400, category: "Woody & Earthy", name: "Amber Woods", imgurl: "images/candel2.jpg" },
        { id: 2, price: 250, category: "Spice & Wrmth", name: "Chinnamon Stick", imgurl: "images/candel3.jpg" },
        { id: 3, price: 550, category: "Spice & Wrmth", name: "Chai Latte", imgurl: "images/candel4.jpg" },
        { id: 4, price: 500, category: "Sweet & Cozy", name: "Caramel Glow", imgurl: "images/candel5.jpg" },
        { id: 5, price: 700, category: "Spice & Wrmth", name: "Pumpkin Spice", imgurl: "images/candel6.jpg" },
        { id: 6, price: 650, category: "Woody & Earthy", name: "Sandalwood", imgurl: "images/candel7.jpg" },
        { id: 7, price: 200, category: "Sweet & Cozy", name: "Honey & Almond", imgurl: "images/candel8.jpg" },
        { id: 8, price: 250, category: "Woody & Earthy", name: "Cedar & Oak", imgurl: "images/candel9.jpg" },
    ];
  

function renderProducts(list = products_row) {
    allproduct.innerHTML = list.map(item => {
        const inCart = cart.find(p => p.id === item.id);
        const isFav = favorites.find(f => f.id === item.id);
        return `
<div class="col-12 col-sm-6 col-md-4 mb-4">
    <div class="card pic_card h-100" style="border-radius: 20px;">
        <img src="${item.imgurl}" class="card-img-top" style="height: 250px; border-radius: 10px;">
        <div style="margin: auto;">
            <h3 class="fw-bold">${item.name}</h3>
            <p>price : $${item.price}</p>
            <p>category : ${item.category}</p>
            <div class="d-flex justify-content-center gap-2 mb-2">
                <button class="btn_add_cart btn" data-id="${item.id}" 
                    style="width: auto; height: 40px; border:none; 
                    background-color: ${inCart ? '#a22323ff' : '#4b3621'}; color: white;">
                    ${inCart ? "Added in cart" : "Add to cart"}
                </button>
                <button class="btn_fav btn" data-id="${item.id}" 
                    style="background:none; border:none; font-size:20px;">
                    <i class="fas fa-heart" style="color: ${isFav ? '#a22323ff' :'#333'};" ></i>
                </button>
            </div>
        </div>
    </div>
</div>`;
    }).join('');

    // أحداث أزرار Cart
// أحداث أزرار Cart
document.querySelectorAll('.btn_add_cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const productId = Number(btn.dataset.id);
        const product = products_row.find(p => p.id === productId);
        const indexInCart = cart.findIndex(p => p.id === productId);

        if(indexInCart !== -1) {
            // لو موجود في الكارت، نحذفه
            cart.splice(indexInCart, 1);
            btn.textContent = "Add to cart"; // رجوع للكلمة الأصلية
            btn.style.backgroundColor = "#4b3621"; // اللون الأصلي
        } else {
            // لو مش موجود، نضيفه
            cart.push({...product, quantity:1});
            btn.textContent = "Added in cart";
            btn.style.backgroundColor = "#a22323ff"; // اللون الأحمر
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderProducts(list);   // إعادة رسم المنتجات لتحديث الأزرار
        updateCart();
    });
});


    // أحداث أزرار Favorite
    document.querySelectorAll('.btn_fav').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.dataset.id);
            const product = products_row.find(p => p.id === id);
            const exists = favorites.some(f => f.id === id);
            if (exists) {
                favorites = favorites.filter(f => f.id !== id);
            } else {
                favorites.push(product);
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
            renderProducts(list);  // إعادة الرسم مع نفس الليست
            updateCart();
        });
    });
}


    function updateCart() {
        let total = cart.reduce((acc, item) => acc + item.price*item.quantity, 0);
        document.querySelectorAll('.count_item_header, .count_item_cart').forEach(el=>el.textContent=cart.length);
        let priceBox = document.querySelector('.price_cart_total');
        if(priceBox) priceBox.textContent = `$${total}`;
        let favCount = document.querySelector('.count_favourit');
        if(favCount) favCount.textContent = favorites.length;
    }

    // بحث
    const searchInput = document.getElementById("searchInput");
    const searchType = document.getElementById("category");

    function filterProducts() {
        const query = searchInput.value.toLowerCase();
        const type = searchType.value.toLowerCase();
        const filtered = products_row.filter(p=>{
            if(type==="search by product name") return p.name.toLowerCase().includes(query);
            else if(type==="search by category") return p.category.toLowerCase().includes(query);
        });
        allproduct.innerHTML = "";
        renderProducts(filtered);
    }

    searchInput?.addEventListener("input", filterProducts);
    searchType?.addEventListener("change", filterProducts);

    // فتح/غلق الكارت
    window.open_close_cart = function(){
        document.querySelector('.cart').classList.toggle('active');
    }

    renderProducts();
    updateCart();
});





let cartItemsContainer = document.getElementById("cart_items");
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// رسم المنتجات في الكارت
function renderCart() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        cartItemsContainer.innerHTML += `
<div class="item_cart d-flex align-items-center mb-2">
    <img src="${item.imgurl}" style="width:50px; height:50px; object-fit:cover;">
    <div class="ms-2 flex-grow-1">
        <h6>${item.name}</h6>
        <p>$${item.price * item.quantity}</p>
        <div class="d-flex align-items-center gap-1">
            <button class="decrease_quantity btn btn-sm btn-secondary" data-index="${index}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increase_quantity btn btn-sm btn-secondary" data-index="${index}">+</button>
        </div>
    </div>
    <button class="delete_item btn btn-sm btn-danger" data-index="${index}">X</button>
</div>`;
    });

    // ربط أزرار الزيادة والنقصان والحذف
    cart.forEach((item, index) => {
        cartItemsContainer.querySelector(`.increase_quantity[data-index='${index}']`)?.addEventListener('click', () => {
            item.quantity += 1;
            saveAndRenderCart();
        });
        cartItemsContainer.querySelector(`.decrease_quantity[data-index='${index}']`)?.addEventListener('click', () => {
            if (item.quantity > 1) item.quantity -= 1;
            else cart.splice(index, 1);
            saveAndRenderCart();
        });
        cartItemsContainer.querySelector(`.delete_item[data-index='${index}']`)?.addEventListener('click', () => {
            cart.splice(index, 1);
            saveAndRenderCart();
        });
    });

    updateCartCounters();
}

// حفظ الكارت في localStorage وإعادة الرسم
function saveAndRenderCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// تحديث عداد الكارت والسعر الكلي
function updateCartCounters() {
    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.querySelectorAll('.count_item_header, .count_item_cart').forEach(el => el.textContent = cart.length);
    let priceBox = document.querySelector('.price_cart_total');
    if (priceBox) priceBox.textContent = `$${total}`;
}

// تشغيل أول مرة
renderCart();  // هيضيف كل المنتجات في الكارت مباشرة
updateCartCounters();














let loginBtn = document.querySelector("#login_btn");
let welcome = document.querySelector("#welcome");
let userName = document.querySelector("#user_name");

if (localStorage.getItem("firstName")) {
    loginBtn.style.display = "none";   // اخفي زرار اللوجين
    welcome.style.display = "inline-block";  // اظهر hi
    userName.innerHTML = localStorage.getItem("firstName");  // ضيف الاسم
}

 let checkout_btn = document.querySelector(".btn_cart");

checkout_btn.addEventListener("click", function (e) {
    e.preventDefault();
if (localStorage.getItem("firstName")){
    window.location = "checkout.html";
}
else{
 window.location = "login.html";
}
});