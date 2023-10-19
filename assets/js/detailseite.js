let currentImageIndex = 0;



function showDetail(id) {
    fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(json => {
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
            <div class="product-description-container">
                <span class="description-text">${productDescription}</span>
            </div>
            ${imagesHtml}
                <div class="price-details">
                    <div class="price-discount">
                        <div>
                            <p class="highlighted-price">Preis: ${productPrice}</p>
                            <p class="original-price">UVP: ${originalPrice} €</p>
                        </div>
                        <div class="discount-container">
                            <p class="highlighted-discount"> -${productDiscount}%</p>
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
        relatedProductsHtml += '</div></div>';  // Schließen Sie die product-grid und related-products Divs
    
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

function getRelatedProducts(category, currentProductId) {
    return fetch(`https://dummyjson.com/products/category/${category}`)
        .then(res => res.json())
        .then(response => {
            // Stellen Sie sicher, dass "products" vorhanden ist und ein Array ist
            if (response.products && Array.isArray(response.products)) {
                // Produkte filtern, die nicht das aktuelle Produkt sind
                return response.products.filter(product => product.id !== currentProductId);
            }
            return []; // Leeres Array zurückgeben, wenn "products" nicht vorhanden oder kein Array ist
        });
}






function ratingToStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars += '<i class="fas fa-star"></i>';  // vollen Stern hinzufügen
        } else if (rating > i - 0.75) {
            stars += '<i class="fas fa-star-half-alt"></i>';  // halben Stern hinzufügen
        } else {
            stars += '<i class="far fa-star"></i>';  // leeren Stern hinzufügen
        }
    }
    return stars;
}

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

function attachFullscreenListeners() {
    let images = document.querySelectorAll(".product-image");
    images.forEach(img => {
        img.addEventListener("click", function() {
            if (!document.fullscreenElement) {
                if (img.requestFullscreen) {
                    img.requestFullscreen();
                } else if (img.mozRequestFullScreen) { /* Firefox */
                    img.mozRequestFullScreen();
                } else if (img.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                    img.webkitRequestFullscreen();
                } else if (img.msRequestFullscreen) { /* IE/Edge */
                    img.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) { /* Firefox */
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE/Edge */
                    document.msExitFullscreen();
                }
            }
        });
    });
};

