// Initialisieren des Index der aktuellen angezeigten Produktbilder
let currentImageIndex = 0;

// Funktion zur Anzeige von Produktdetails basierend auf der Produkt-ID
function showDetail(id) {
    fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(json => {
        // Extrahieren der Produktinformationen aus der JSON-Antwort
        const productTitle = json.title;
        const productDescription = json.description;
        const productPrice = `${json.price.toFixed(2)} €`;
        const productRating = json.rating;
        const productDiscount = json.discountPercentage;
        const productBrand = json.brand;
        const productThumbnail = json.thumbnail;
        const productRatingStars = ratingToStars(json.rating);
        const productImages = json.images;
        const discountedAmount = json.price * (json.discountPercentage / 100);
        const originalPrice = (json.price + discountedAmount).toFixed(2);
        const productCategory = json.category;

        // HTML für Bilder und Produktdetails generieren
        let imagesHtml = `
        <div class="image-container">
            <img src="${productImages[currentImageIndex]}" alt="${productTitle} Image" class="product-image" id="currentImage">
            <div class="image-navigation">
                <button data-images="${productImages.join('|')}" onclick="changeImage(-1, this)">❮</button>
                <button data-images="${productImages.join('|')}" onclick="changeImage(1, this)">❯</button>
            </div>
        </div>
        `;

        let productDetailsHtml = `
        <div class="product-details">
            <div class="product-text">
                <h2>${productTitle}</h2>
                <p>${productBrand}</p>
                ${imagesHtml}
            <div class="product-description-container">
                <span class="description-text">${productDescription}</span>
            </div>
                <div class="price-details">
                    <div class="price-discount">
                        <div>
                            <p class="highlighted-price">Preis: ${productPrice}</p>
                            <p class="original-price">UVP: ${originalPrice} €</p>
                        </div>
                        <div class="discount-container">
                            <p class "highlighted-discount"> -${productDiscount}%</p>
                        </div>
                    </div>
                    <p>Bewertung: ${productRatingStars}</p>
                    <a href="https://www.google.com/search?q=${encodeURIComponent(productTitle)}" target="_blank" class="addInfoButton">Weitere Infos</a>
                    <a href="#" onclick="addToCart(${json.id}, '${productTitle}', '${productPrice}')" class="addToCardButton">Zum Warenkorb hinzufügen</a>
                </div>
            </div>
        </div>
        `;

        document.getElementById('detailData').innerHTML = productDetailsHtml;
        
        // Ähnliche Produkte abrufen und anzeigen
        return getRelatedProducts(productCategory, id);
    })
    .then(relatedProducts => {
        let relatedProductsHtml = '<div class="related-products"><h3>Ähnliche Produkte:</h3><div class="product-grid">';
        relatedProducts.forEach(product => {
            relatedProductsHtml += `
                <div class="product-card">
                    <img src="${product.thumbnail}" alt="${product.title} Thumbnail" class="product-thumbnail">
                    <div class="product-info">
                        <h4>${product.title}</h4>
                        <a href="javascript:showDetail(${product.id})" class="view-product-button">Ansehen</a>
                    </div>
                </div>
            `;
        });
        relatedProductsHtml += '</div></div>';

        document.getElementById('detailData').innerHTML += relatedProductsHtml;
        document.getElementById('searchSection').style.display = 'none';
        document.getElementById('detailSection').style.display = 'block';

        attachFullscreenListeners(); 
    })
    .catch(error => {
        console.error("Fehler beim Abrufen der Detaildaten:", error);
        document.getElementById('detailData').innerHTML = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
    });
}

// Funktion zum Abrufen ähnlicher Produkte basierend auf der Kategorie und der aktuellen Produkt-ID
function getRelatedProducts(category, currentProductId) {
    return fetch(`https://dummyjson.com/products/category/${category}`)
        .then(res => res.json())
        .then(response => {
            // Filtern der ähnlichen Produkte, indem das aktuelle Produkt ausgeschlossen wird
            if (response.products && Array.isArray(response.products)) {
                return response.products.filter(product => product.id !== currentProductId);
            }
            return [];
        });
}

// Funktion zur Umwandlung einer Bewertung in Sternsymbole
function ratingToStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars += '<i class="fas fa-star"></i>';
        } else if (rating > i - 0.75) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Funktion zur Änderung des angezeigten Bilds
function changeImage(direction, button) {
    const images = button.getAttribute('data-images').split('|');
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    document.getElementById('currentImage').src = images[currentImageIndex];
}

// Funktion zum Anhängen von Event-Listenern für den Vollbildmodus auf verschiedenen Browsern
function attachFullscreenListeners() {
    let images = document.querySelectorAll(".product-image");
    images.forEach(img => {
        img.addEventListener("click", function() {
            if (!document.fullscreenElement) {
                if (img.requestFullscreen) {
                    img.requestFullscreen();
                } else if (img.mozRequestFullScreen) {
                    img.mozRequestFullScreen();
                } else if (img.webkitRequestFullscreen) {
                    img.webkitRequestFullscreen();
                } else if (img.msRequestFullscreen) {
                    img.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        });
    });
};
