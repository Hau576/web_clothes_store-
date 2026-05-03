let cart = [];

// 1. Tăng giảm số lượng tại Card sản phẩm
function changeMainQty(id, delta) {
    const qtyElement = document.getElementById(id + '-qty');
    let currentQty = parseInt(qtyElement.innerText);
    currentQty += delta;
    if (currentQty < 1) currentQty = 1;
    qtyElement.innerText = currentQty;
}

// 2. Mua hàng: CHỈ CẬP NHẬT GIỎ HÀNG, KHÔNG HIỆN THÔNG BÁO (Đã chỉnh sửa)
function buyProduct(id, name, price, image) {
    const qtyElement = document.getElementById(id + '-qty');
    const selectedQty = parseInt(qtyElement.innerText);

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += selectedQty;
    } else {
        cart.push({ name, price, image, quantity: selectedQty });
    }
    
    // Reset số lượng về 1 sau khi bấm mua
    qtyElement.innerText = 1;
    
    // Gọi hàm cập nhật hiển thị giỏ hàng
    updateCart();
}

// 3. Cập nhật giao diện giỏ hàng
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
            <div class="cart-item">
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${item.image}" width="40" height="40" style="object-fit:cover; border-radius:5px;">
                    <div>
                        <div style="font-weight:bold; font-size:14px;">${item.name}</div>
                        <div style="font-size:12px; color: #666;">${item.price.toLocaleString()}đ x ${item.quantity}</div>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" style="color:#e74c3c; border:none; background:none; cursor:pointer; font-size:12px;">Xóa</button>
            </div>
        `;
    });
    totalPrice.innerText = totalMoney.toLocaleString();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// 4. THÔNG BÁO KHI HOÀN TẤT THANH TOÁN (Giữ lại thông báo ở đây)
function checkout() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
    }
    
    // Tính tổng tiền lần cuối để hiện thông báo
    const finalTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    alert(`🎉 Chúc mừng! Bạn đã hoàn tất thanh toán đơn hàng trị giá ${finalTotal.toLocaleString()}đ.\nShop Mixi sẽ sớm liên hệ với bạn!`);
    
    // Reset giỏ hàng sau khi thanh toán xong
    cart = [];
    updateCart();
    toggleCart();
}

// Chỉnh link trình duyệt
document.addEventListener("DOMContentLoaded", () => {
    try {
        window.history.replaceState({}, "", "shop-mixi");
    } catch(e) {}
});