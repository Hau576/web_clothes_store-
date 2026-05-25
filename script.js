// GIỮ NGUYÊN DANH SÁCH 20 SẢN PHẨM CỦA BẠN
const productsData = [
    // --- 10 LOẠI ÁO ---
    { id: "a1", name: "Áo Thun Basic White", price: 250000, image: "https://product.hstatic.net/200000588671/product/dsc08747_c2ea77f99b2a41b7b97c83c62967c179_1024x1024.jpg" },
    { id: "a2", name: "Áo Khoác Bomber Black", price: 600000, image: "https://themixdalat.vn/wp-content/uploads/2023/03/ao-khoac-bomber-ch-pilot-jacket-black.png" },
    { id: "a3", name: "Áo Hoodie Cozy Gray", price: 450000, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
    { id: "a4", name: "Áo Sơ Mi Oxford Blue", price: 350000, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500" },
    { id: "a5", name: "Áo Polo Classic Navy", price: 290000, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500" },
    { id: "a6", name: "Áo Len Cardigan Cream", price: 480000, image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m762gwsk7qzraa" },
    { id: "a7", name: "Áo Blazer Hiện Đại", price: 750000, image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=500" },
    { id: "a8", name: "Áo Jacket Denim Vintage", price: 550000, image: "https://i.etsystatic.com/37752092/r/il/bb1925/4267617117/il_600x600.4267617117_cpif.jpg" },
    { id: "a9", name: "Áo Thun Oversize Streetwear", price: 280000, image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500" },
    { id: "a10", name: "Áo Gió Thể Thao Chống Nước", price: 390000, image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=500" },

    // --- 10 LOẠI QUẦN ---
    { id: "q1", name: "Quần Jean Slimfit Blue", price: 450000, image: "https://4menshop.com/images/thumbs/2022/03/quan-jeans-slimfit-blue-qj046-mau-xanh-16636-slide-products-6239886776ae8.JPG" },
    { id: "q2", name: "Quần Kaki Chino Beige", price: 380000, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500" },
    { id: "q3", name: "Quần Jogger Cạp Chun Thể Thao", price: 320000, image: "https://product.hstatic.net/1000369857/product/quan_ni_jgn01_xanh_den_1_350831a8041e4fd1983d306f6c7c7a71.jpg" },
    { id: "q4", name: "Quần Tây Âu Công Sở Lịch Lãm", price: 420000, image: "https://i.otto.de/i/otto/8d152e74-2929-5713-bbf9-a2b4ffd40700/selected-homme-chinohose-isac-1-tlg.jpg?$formatz$" },
    { id: "q5", name: "Quần Short Kaki Summer", price: 220000, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500" },
    { id: "q6", name: "Quần Baggy Vải Phong Cách", price: 290000, image: "https://c.imgz.jp/872/63798872/63798872b_b_05_500.jpg" },
    { id: "q7", name: "Quần Jean Rách Gối Cá Tính", price: 490000, image: "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0501/users/3737039756dae1d6e3e61fdbe76affa6bfcc431c/i-img480x480-1704423084nhrptq447377.jpg" },
    { id: "q8", name: "Quần Cargo Túi Hộp", price: 460000, image: "https://down-vn.img.susercontent.com/file/sg-11134201-22110-a77g95as3gkvab" },
    { id: "q9", name: "Quần Thun Đen Dài Co Giãn Nam", price: 180000, image: "https://item-shopping.c.yimg.jp/i/n/szone_677685-01_1_d_20231220180751" },
    { id: "q10", name: "Quần Culottes Ống Rộng Nữ", price: 350000, image: "https://tse1.mm.bing.net/th/id/OIP.1RO6KtADqrjksPQy6lEJRgHaLH?w=3333&h=5000&rs=1&pid=ImgDetMain&o=7&rm=3" }
];

let cart = [];
let currentUser = null;

document.addEventListener("DOMContentLoaded", () => {
    // Ép buộc cập nhật lại danh sách 20 sản phẩm mới nhất mỗi khi sửa file code
    localStorage.setItem('shop_products', JSON.stringify(productsData));
    
    renderProducts();
    checkLoginStatus();
    try { window.history.replaceState({}, "", "shop-mixi"); } catch(e) {}
});

function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    // Đọc từ bộ nhớ để đồng bộ được nếu Admin có thêm bớt sản phẩm
    const liveProducts = JSON.parse(localStorage.getItem('shop_products')) || productsData;
    
    productsGrid.innerHTML = liveProducts.map(p => `
        <div class="product-card">
            <div class="product-img"><img src="${p.image}" alt="${p.name}"></div>
            <h3>${p.name}</h3>
            <p class="price">${p.price.toLocaleString()}đ</p>
            <div class="main-qty-controls">
                <button class="qty-btn" onclick="changeMainQty('${p.id}', -1)">-</button>
                <span id="${p.id}-qty" class="qty-number">1</span>
                <button class="qty-btn" onclick="changeMainQty('${p.id}', 1)">+</button>
            </div>
            <button class="btn-add" onclick="buyProduct('${p.id}', '${p.name}', ${p.price}, '${p.image}')">THÊM VÀO GIỎ</button>
        </div>
    `).join('');
}

function changeMainQty(id, delta) {
    const qtyElement = document.getElementById(id + '-qty');
    let currentQty = parseInt(qtyElement.innerText);
    currentQty += delta;
    if (currentQty < 1) currentQty = 1;
    qtyElement.innerText = currentQty;
}

function buyProduct(id, name, price, image) {
    const qtyElement = document.getElementById(id + '-qty');
    const selectedQty = parseInt(qtyElement.innerText);
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += selectedQty;
    } else {
        cart.push({ name, price, image, quantity: selectedQty });
    }
    qtyElement.innerText = 1;
    updateCart();
}

// CẬP NHẬT GIỎ HÀNG: Thay đổi số lượng tăng/giảm từng món
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalQty;
    
    cartItems.innerHTML = '';
    let totalMoney = 0;
    
    cart.forEach((item, index) => {
        totalMoney += item.price * item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; padding:15px 0; border-bottom:1px dotted #ccc;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${item.image}" width="45" height="45" style="object-fit:cover; border-radius:5px;">
                    <div>
                        <div style="font-weight:bold; font-size:14px;">${item.name}</div>
                        <div style="font-size:12px; color: #e74c3c; font-weight:bold;">${item.price.toLocaleString()}đ</div>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:8px; background:#f8f9fa; border:1px solid #ddd; padding:3px 8px; border-radius:20px;">
                    <button onclick="minusCartItem(${index})" style="background:none; border:none; font-size:16px; font-weight:bold; cursor:pointer; color:#666;">-</button>
                    <span style="font-weight:bold; font-size:14px; min-width:15px; text-align:center;">${item.quantity}</span>
                    <button onclick="plusCartItem(${index})" style="background:none; border:none; font-size:14px; font-weight:bold; cursor:pointer; color:#27ae60;">+</button>
                </div>
            </div>
        `;
    });
    totalPrice.innerText = totalMoney.toLocaleString();
}

function minusCartItem(index) {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    updateCart();
}

function plusCartItem(index) {
    cart[index].quantity += 1;
    updateCart();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// LOGIC ĐĂNG KÝ, ĐĂNG NHẬP, ĐĂNG XUẤT
function toggleAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function switchAuthPanel(panel) {
    document.getElementById('login-form-panel').style.display = panel === 'login' ? 'block' : 'none';
    document.getElementById('register-form-panel').style.display = panel === 'register' ? 'block' : 'none';
}

function handleRegister() {
    const name = document.getElementById('reg-name').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const password = document.getElementById('reg-password').value.trim();

    if (!name || !phone || !password) return alert("Vui lòng điền đầy đủ thông tin!");
    let usersList = JSON.parse(localStorage.getItem('shop_users')) || [];
    if (usersList.some(u => u.phone === phone)) return alert("Số điện thoại này đã được đăng ký!");

    usersList.push({ name, phone, password });
    localStorage.setItem('shop_users', JSON.stringify(usersList));
    alert("🎉 Đăng ký thành công! Mời bạn đăng nhập.");
    switchAuthPanel('login');
}

function handleLogin() {
    const phone = document.getElementById('login-phone').value.trim();
    const password = document.getElementById('login-password').value.trim();

    let usersList = JSON.parse(localStorage.getItem('shop_users')) || [];
    const matchedUser = usersList.find(u => u.phone === phone && u.password === password);

    if (!matchedUser) return alert("Sai tài khoản hoặc mật khẩu!");
    localStorage.setItem('current_logged_user', JSON.stringify(matchedUser));
    checkLoginStatus();
    toggleAuthModal();
    alert(`Chào mừng ${matchedUser.name} quay trở lại!`);
}

function checkLoginStatus() {
    const loggedUser = localStorage.getItem('current_logged_user');
    const userArea = document.getElementById('user-info-area');
    if (loggedUser) {
        currentUser = JSON.parse(loggedUser);
        userArea.innerHTML = `
            <span style="color:#27ae60; font-weight:bold; font-size:14px;">👋 ${currentUser.name}</span>
            <button onclick="handleLogout()" style="background:none; border:1px solid #e74c3c; color:#e74c3c; padding:3px 8px; border-radius:5px; margin-left:10px; cursor:pointer; font-size:12px;">Đăng xuất</button>
        `;
    } else {
        currentUser = null;
        userArea.innerHTML = `
            <button onclick="toggleAuthModal()" style="background:#27ae60; color:white; border:none; padding:6px 15px; border-radius:20px; cursor:pointer; font-weight:bold; font-size:13px;">🔑 Đăng nhập</button>
        `;
    }
}

function handleLogout() {
    localStorage.removeItem('current_logged_user');
    checkLoginStatus();
    alert("Hệ thống đã đăng xuất tài khoản!");
}

function checkout() {
    if (cart.length === 0) return alert("Giỏ hàng của bạn đang trống!");
    if (!currentUser) {
        alert("⚠️ Vui lòng đăng nhập tài khoản trước khi thanh toán đơn hàng!");
        toggleCart();
        toggleAuthModal();
        return;
    }

    const finalTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newOrder = {
        id: "DH" + Math.floor(Math.random() * 9000 + 1000),
        date: new Date().toLocaleString('vi-VN'),
        customerName: currentUser.name,
        customerPhone: currentUser.phone,
        items: cart,
        total: finalTotal,
        status: "Chờ xử lý"
    };

    let ordersList = JSON.parse(localStorage.getItem('shop_orders')) || [];
    ordersList.push(newOrder);
    localStorage.setItem('shop_orders', JSON.stringify(ordersList));
    
    alert(`🎉 Chúc mừng ${currentUser.name}! Bạn đã hoàn tất thanh toán đơn hàng trị giá ${finalTotal.toLocaleString()}đ.`);
    cart = [];
    updateCart();
    toggleCart();
}

// Hàm 1: Nhấn Enter ở ô này sẽ tự động nhảy (Focus) sang ô tiếp theo
function moveToNextInput(event, nextInputId) {
    if (event.key === "Enter") {
        event.preventDefault(); // Ngăn hành vi xuống dòng mặc định nếu có
        document.getElementById(nextInputId).focus(); // Nhảy con trỏ chuột xuống ô tiếp theo
    }
}

// Hàm 2: Nhấn Enter ở ô cuối cùng sẽ tự động kích hoạt nút Đăng nhập
function submitOnEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Ngăn hành vi mặc định
        handleLogin(); // Gọi hàm xử lý đăng nhập luôn
    }
}