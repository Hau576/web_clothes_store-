// HÀM TỰ ĐỘNG TÍNH GIÁ VỐN DỰA TRÊN GIÁ BÁN THEO ĐÚNG YÊU CẦU CỦA BẠN
// HÀM TỰ ĐỘNG TÍNH GIÁ VỐN + LÀM TRÒN SỐ ĐẸP ĐẾN HÀNG CHỤC NGHÌN DỰA TRÊN CHỮ SỐ HÀNG NGHÌN
function calculateCostFromPrice(price) {
    let profitPercent = 0;
    let rawCost = 0;

    // 1. Áp dụng quy tắc phân chia mốc % lợi nhuận của bạn
    if (price <= 250000) {
        profitPercent = 80;
        rawCost = price / 1.8; // Lãi 80%
    } else if (price >= 250001 && price <= 500000) {
        profitPercent = 100;
        rawCost = price / 2.0; // Lãi 100%
    } else if (price >= 500001) {
        profitPercent = 120;
        rawCost = price / 2.2; // Lãi 120%
    }

    // 2. Thuật toán làm tròn chữ số hàng nghìn (Tách và làm tròn theo hệ số 10,000)
    // Ví dụ: 138889 / 10000 = 13.8889 -> Math.round thành 14 -> 14 * 10000 = 140000
    // Ví dụ: 134123 / 10000 = 13.4123 -> Math.round thành 13 -> 13 * 10000 = 130000
    let finalCost = Math.round(rawCost / 10000) * 10000;

    return { cost: finalCost, percent: profitPercent };
}

// 20 SẢN PHẨM GỐC (Bỏ thuộc tính cost cứng, hệ thống sẽ tự tính qua hàm bên trên)
const initialProductsRaw = [
    { id: "a1", name: "Áo Thun Basic White", price: 250000, stock: 50, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500" },
    { id: "a2", name: "Áo Khoác Bomber Black", price: 600000, stock: 35, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500" },
    { id: "a3", name: "Áo Hoodie Cozy Gray", price: 450000, stock: 40, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
    { id: "a4", name: "Áo Sơ Mi Oxford Blue", price: 350000, stock: 65, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500" },
    { id: "a5", name: "Áo Polo Classic Navy", price: 290000, stock: 80, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500" },
    { id: "a6", name: "Áo Len Cardigan Cream", price: 480000, stock: 25, image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=500" },
    { id: "a7", name: "Áo Blazer Hiện Đại", price: 750000, stock: 15, image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=500" },
    { id: "a8", name: "Áo Jacket Denim Vintage", price: 550000, stock: 30, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500" },
    { id: "a9", name: "Áo Thun Oversize Streetwear", price: 280000, stock: 90, image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500" },
    { id: "a10", name: "Áo Gió Thể Thao Chống Nước", price: 390000, stock: 45, image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=500" },

    { id: "q1", name: "Quần Jean Slimfit Blue", price: 450000, stock: 60, image: "https://4menshop.com/images/thumbs/2022/03/quan-jeans-slimfit-blue-qj046-mau-xanh-16636-slide-products-6239886776ae8.JPG" },
    { id: "q2", name: "Quần Kaki Chino Beige", price: 380000, stock: 55, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500" },
    { id: "q3", name: "Quần Jogger Cạp Chun Thể Thao", price: 320000, stock: 70, image: "https://product.hstatic.net/1000369857/product/quan_ni_jgn01_xanh_den_1_350831a8041e4fd1983d306f6c7c7a71.jpg" },
    { id: "q4", name: "Quần Tây Âu Công Sở Lịch Lãm", price: 420000, stock: 40, image: "https://i.otto.de/i/otto/8d152e74-2929-5713-bbf9-a2b4ffd40700/selected-homme-chinohose-isac-1-tlg.jpg?$formatz$" },
    { id: "q5", name: "Quần Short Kaki Summer", price: 220000, stock: 120, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500" },
    { id: "q6", name: "Quần Baggy Vải Phong Cách", price: 290000, stock: 50, image: "https://c.imgz.jp/872/63798872/63798872b_b_05_500.jpg" },
    { id: "q7", name: "Quần Jean Rách Gối Cá Tính", price: 490000, stock: 35, image: "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0501/users/3737039756dae1d6e3e61fdbe76affa6bfcc431c/i-img480x480-1704423084nhrptq447377.jpg" },
    { id: "q8", name: "Quần Cargo Túi Hộp", price: 460000, stock: 40, image: "https://down-vn.img.susercontent.com/file/sg-11134201-22110-a77g95as3gkvab" },
    { id: "q9", name: "Quần Thun Đen Dài Co Giãn Nam", price: 180000, stock: 100, image: "https://item-shopping.c.yimg.jp/i/n/szone_677685-01_1_d_20231220180751" },
    { id: "q10", name: "Quần Culottes Ống Rộng Nữ", price: 350000, stock: 45, image: "https://tse1.mm.bing.net/th/id/OIP.1RO6UkADqrjksPQy6lEJRgHaLH?w=3333&h=5000&rs=1&pid=ImgDetMain&o=7&rm=3" }
];

// Tự động quét mảng Raw để gán thêm thuộc tính Cost chuẩn trước khi lưu vào localStorage
const initialProducts = initialProductsRaw.map(p => {
    const financialData = calculateCostFromPrice(p.price);
    return { ...p, cost: financialData.cost };
});

// Ép buộc đồng bộ nạp danh sách 20 sản phẩm mới tinh này vào bộ nhớ hệ thống
localStorage.setItem('shop_products', JSON.stringify(initialProducts));

document.addEventListener("DOMContentLoaded", () => {
    calculateFinancials();
    loadOrders();
    loadProducts();
});

// 1. TÍNH TOÁN DOANH THU & LỢI NHUẬN THỰC TẾ
function calculateFinancials() {
    const orders = JSON.parse(localStorage.getItem('shop_orders')) || [];
    const products = JSON.parse(localStorage.getItem('shop_products')) || initialProducts;

    let totalRevenue = 0;
    let totalProfit = 0;
    let approvedOrdersCount = 0;

    orders.forEach(order => {
        if (order.status === "Đã duyệt") {
            totalRevenue += order.total;
            approvedOrdersCount++;

            order.items.forEach(item => {
                const originalProd = products.find(p => p.name === item.name);
                const cost = originalProd ? originalProd.cost : Math.round(item.price / 2);
                totalProfit += (item.price - cost) * item.quantity;
            });
        }
    });

    document.getElementById('stat-revenue').innerText = totalRevenue.toLocaleString() + "đ";
    document.getElementById('stat-profit').innerText = totalProfit.toLocaleString() + "đ";
    document.getElementById('stat-orders-count').innerText = approvedOrdersCount;
}

// 2. HIỂN THỊ ĐƠN HÀNG VÀ TRỪ KHO KHI DUYỆT
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('shop_orders')) || [];
    const tbody = document.getElementById('orders-tbody');
    tbody.innerHTML = '';

    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Chưa có đơn hàng nào.</td></tr>`;
        return;
    }

    orders.forEach((order, index) => {
        const itemsDetail = order.items.map(item => `${item.name} (<b>x${item.quantity}</b>)`).join(', ');
        tbody.innerHTML += `
            <tr>
                <td><b>${order.id}</b></td>
                <td>${order.date}</td>
                <td>
                    <b>Khách:</b> ${order.customerName}<br>
                    <b>SĐT:</b> ${order.customerPhone}<br>
                    <small style="color:#666;">${itemsDetail}</small>
                </td>
                <td style="color:#e74c3c; font-weight:bold;">${order.total.toLocaleString()}đ</td>
                <td><span class="status-badge ${order.status === 'Đã duyệt' ? 'success' : 'pending'}">${order.status}</span></td>
                <td>
                    ${order.status === 'Chờ xử lý' ? `<button class="btn-approve" onclick="approveOrder(${index})">Duyệt đơn & Trừ kho</button>` : '✓ Hoàn tất'}
                    <button class="btn-delete-order" onclick="deleteOrder(${index})">Xóa</button>
                </td>
            </tr>
        `;
    });
}

function approveOrder(index) {
    let orders = JSON.parse(localStorage.getItem('shop_orders')) || [];
    let products = JSON.parse(localStorage.getItem('shop_products')) || initialProducts;
    let selectedOrder = orders[index];

    let canApprove = true;
    selectedOrder.items.forEach(item => {
        let prod = products.find(p => p.name === item.name);
        if (prod && prod.stock < item.quantity) {
            alert(`⚠️ Không thể duyệt! Mặt hàng "${item.name}" trong kho chỉ còn ${prod.stock} sản phẩm (Khách mua ${item.quantity}).`);
            canApprove = false;
        }
    });

    if (!canApprove) return;

    selectedOrder.items.forEach(item => {
        let prod = products.find(p => p.name === item.name);
        if (prod) prod.stock -= item.quantity;
    });

    selectedOrder.status = "Đã duyệt";
    
    localStorage.setItem('shop_orders', JSON.stringify(orders));
    localStorage.setItem('shop_products', JSON.stringify(products));

    alert("Duyệt đơn hàng và cập nhật số kho thành công!");
    calculateFinancials();
    loadOrders();
    loadProducts();
}

function deleteOrder(index) {
    if(confirm("Xóa đơn hàng này?")) {
        let orders = JSON.parse(localStorage.getItem('shop_orders')) || [];
        orders.splice(index, 1);
        localStorage.setItem('shop_orders', JSON.stringify(orders));
        calculateFinancials();
        loadOrders();
    }
}

// 3. HIỂN THỊ DANH SÁCH SẢN PHẨM & TỰ ĐỘNG KHÓA GIÁ VỐN THEO GIÁ BÁN
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('shop_products')) || initialProducts;
    const tbody = document.getElementById('products-tbody');
    tbody.innerHTML = '';

    products.forEach((p, index) => {
        // Gọi hàm để lấy chính xác thông tin tỷ lệ phần trăm lãi
        const financial = calculateCostFromPrice(p.price);
        const stockWarningStyle = p.stock <= 5 ? "color: red; font-weight: bold; background: #ffcccc; padding: 2px 6px; border-radius:3px;" : "";

        tbody.innerHTML += `
            <tr>
                <td><img src="${p.image}" width="40" height="40" style="object-fit:cover; border-radius:5px;"></td>
                <td><b>${p.name}</b></td>
                <td style="color:#7f8c8d; font-weight:500;">${p.cost.toLocaleString()}đ</td>
                <td><input type="number" value="${p.price}" onchange="updateProductPrice(${index}, this.value)" style="width:100px; padding:4px; font-weight:bold;">đ</td>
                <td><span class="status-badge success" style="background:#e8f8f5; color:#27ae60; padding:4px 10px;">+${financial.percent}% Lãi</span></td>
                <td><input type="number" value="${p.stock}" onchange="updateProductStock(${index}, this.value)" style="width:60px; padding:4px; ${stockWarningStyle}"></td>
                <td>
                    <button class="btn-delete" onclick="adminDeleteProduct(${index})" style="background:#e74c3c; color:white; padding:5px 10px;">Xóa</button>
                </td>
            </tr>
        `;
    });
}

// Cập nhật giá bán -> Tự động tính toán lại giá vốn mới ngay lập tức
function updateProductPrice(index, newPrice) {
    let products = JSON.parse(localStorage.getItem('shop_products')) || initialProducts;
    let priceInt = parseInt(newPrice) || 0;
    
    // Áp dụng hàm tính giá vốn tự động
    let financialData = calculateCostFromPrice(priceInt);
    
    products[index].price = priceInt;
    products[index].cost = financialData.cost; // Ghi đè giá vốn mới vào bộ nhớ
    
    localStorage.setItem('shop_products', JSON.stringify(products));
    calculateFinancials();
    loadProducts();
}

// Cập nhật riêng số kho
function updateProductStock(index, newStock) {
    let products = JSON.parse(localStorage.getItem('shop_products')) || initialProducts;
    products[index].stock = parseInt(newStock) || 0;
    localStorage.setItem('shop_products', JSON.stringify(products));
    loadProducts();
}

function adminAddProduct() {
    const name = document.getElementById('prod-name').value;
    const price = parseInt(document.getElementById('prod-price').value);
    const stock = parseInt(document.getElementById('prod-stock').value);
    const img = document.getElementById('prod-img').value;

    if (!name || !price || !stock || !img) return alert("Vui lòng điền đủ Tên, Giá bán, Số lượng và Ảnh sản phẩm!");

    // Tự động tính giá vốn cho sản phẩm mới thêm dựa vào giá bán ra
    let financialData = calculateCostFromPrice(price);

    const newProd = { 
        id: "p" + Date.now(), 
        name: name, 
        cost: financialData.cost, // Tự động tính
        price: price, 
        stock: stock, 
        image: img 
    };

    let products = JSON.parse(localStorage.getItem('shop_products')) || initialProducts;
    products.unshift(newProd);
    localStorage.setItem('shop_products', JSON.stringify(products));

    // Reset Form nhập liệu (Ẩn ô giá vốn đi vì hệ thống tự tính)
    document.getElementById('prod-name').value = '';
    if(document.getElementById('prod-cost')) document.getElementById('prod-cost').style.display = 'none'; 
    document.getElementById('prod-price').value = '';
    document.getElementById('prod-stock').value = '';
    document.getElementById('prod-img').value = '';

    alert("Hệ thống đã tự động tính Giá vốn và nhập kho thành công!");
    loadProducts();
}

function adminDeleteProduct(index) {
    if (confirm("Xóa sản phẩm này khỏi hệ thống kho?")) {
        let products = JSON.parse(localStorage.getItem('shop_products')) || initialProducts;
        products.splice(index, 1);
        localStorage.setItem('shop_products', JSON.stringify(products));
        loadProducts();
    }
}