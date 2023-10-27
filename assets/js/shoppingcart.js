// Hier wird ein leeres Array 'cart' initialisiert, das zur Aufbewahrung von Produkten im Warenkorb verwendet wird.
let cart = [];

// Die Funktion 'addToCart' fügt ein Produkt zum Warenkorb hinzu oder erhöht die Menge, wenn es bereits vorhanden ist.
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

// Die Funktion 'removeFromCart' entfernt ein Produkt aus dem Warenkorb.
function removeFromCart(id) {
    cart = cart.filter(product => product.id !== id);
    updateCartUI();
    updateCartCount();
}

// Die Funktion 'saveCart' speichert den aktuellen Warenkorb im lokalen Speicher des Browsers.
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Die Funktion 'loadCart' lädt den Warenkorb aus dem lokalen Speicher, wenn er vorhanden ist.
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Die Funktion 'updateCartUI' aktualisiert die Benutzeroberfläche des Warenkorbs.
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

// Die Funktion 'closeCart' blendet den Warenkorb-Overlay aus.
function closeCart() {
    document.getElementById('cartOverlay').style.display = 'none';
}

// Die Funktion 'clearCart' leert den Warenkorb und aktualisiert die Benutzeroberfläche und den lokalen Speicher.
function clearCart() {
    cart = [];
    updateCartUI();
    saveCart();
}

// Die Funktion 'updateCartCount' aktualisiert die Anzeige der Warenkorbzählanzeige.
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.textContent = cart.length;
}

// Ein Event-Listener für das Klicken auf das Warenkorb-Symbol, um den Warenkorb anzuzeigen und die Benutzeroberfläche zu aktualisieren.
document.getElementById('cartIcon').addEventListener('click', function () {
    document.getElementById('cartOverlay').style.display = 'block';
    updateCartUI();
});


// Die Funktion 'calculateTotalPrice' berechnet den Gesamtpreis aller Produkte im Warenkorb.
function calculateTotalPrice() {
    let totalPrice = 0;
    cart.forEach(product => {
        totalPrice += parseFloat(product.price.replace(' €', '')) * (product.quantity || 1);
    });
    return totalPrice.toFixed(2);
}

// Die Funktion 'increaseQuantity' erhöht die Menge eines Produkts im Warenkorb und aktualisiert die Benutzeroberfläche.
function increaseQuantity(id) {
    const product = cart.find(p => p.id === id);
    if (product) {
        product.quantity += 1;
        updateCartUI();
    }
}

// Die Funktion 'decreaseQuantity' verringert die Menge eines Produkts im Warenkorb und aktualisiert die Benutzeroberfläche.
function decreaseQuantity(id) {
    const product = cart.find(p => p.id === id);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
        updateCartUI();
    } else if (product && product.quantity === 1) {
        removeFromCart(id);
    }
}
