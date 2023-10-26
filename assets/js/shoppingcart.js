let cart = [];

function addToCart(id, title, price) {
    const existingProduct = cart.find(product => product.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const product = { id, title, price, quantity: 1 };
        cart.push(product);
    }
    updateCartUI();
    updateCartCount();
}

function removeFromCart(id) {
    cart = cart.filter(product => product.id !== id);
    updateCartUI();
    updateCartCount();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function updateCartUI() {
    let cartHtml = '';
    
    if (cart.length === 0) {
        cartHtml = '<div></div>';
    } else {
        cart.forEach(product => {
            cartHtml += `
                <div class="cart-item">
                    ${product.title} - ${product.price} x ${product.quantity}
                    <div class="cart-controls">
                        <button onclick="increaseQuantity(${product.id})">+</button>
                        <button onclick="decreaseQuantity(${product.id})">-</button>
                        <i class="fas fa-trash" onclick="removeFromCart(${product.id})" style="cursor:pointer;"></i>
                    </div>
                </div>
            `;
        });
        const totalPrice = calculateTotalPrice();
        cartHtml += `<div class="total-price">Gesamtpreis: ${totalPrice} €</div>`;
    }
    
    document.getElementById('cartItems').innerHTML = cartHtml;
}

function closeCart() {
    document.getElementById('cartOverlay').style.display = 'none';
}

function clearCart() {
    cart = [];
    updateCartUI();
    saveCart();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.textContent = cart.length;
}

document.getElementById('cartIcon').addEventListener('click', function() {
    document.getElementById('cartOverlay').style.display = 'block';
    updateCartUI();
});

function calculateTotalPrice() {
    let totalPrice = 0;
    cart.forEach(product => {
        totalPrice += parseFloat(product.price.replace(' €', '')) * (product.quantity || 1);
    });
    return totalPrice.toFixed(2);
}

function increaseQuantity(id) {
    const product = cart.find(p => p.id === id);
    if (product) {
        product.quantity += 1;
        updateCartUI();
    }
}

function decreaseQuantity(id) {
    const product = cart.find(p => p.id === id);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
        updateCartUI();
    } else if (product && product.quantity === 1) {
        removeFromCart(id);
    }
}

