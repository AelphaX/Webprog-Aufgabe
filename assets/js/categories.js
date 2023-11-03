
// Funktion zum Anzeigen der Produkte
function displayProducts(products) {
    let resultsHtml = '';

    products.forEach(product => {
        resultsHtml += `
            <div class="product-searchlist" onclick="showDetail(${product.id})">
                <img src="${product.thumbnail}" alt="${product.title} Thumbnail" class="product-thumbnaillist">
                <div class="product-infolist">
                    <button class="product-title-buttonlist">${product.title}</button>
                </div>
            </div>`;
    });

    // Überprüfe, ob Produkte gefunden wurden
    if (resultsHtml === '') {
        resultsHtml = '<div class="error-message">Keine Produkte gefunden.</div>';
    } else {
        document.getElementById('searchResults').classList.add('has-results');
    }

    document.getElementById('searchResults').innerHTML = resultsHtml;
}

// Funktion zum Großschreiben des ersten Buchstabens eines Wortes
function capitalizeFirstLetter(string) {
    return string.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('-');
}

// Funktion zum Laden der Kategorien mit einem repräsentativen Produkt
function loadCategoriesS() {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
            const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)));

            let resultsHtml = '';

            // Schleife durch die eindeutigen Kategorien und erstelle Kategorie-Elemente mit repräsentativen Bildern
            uniqueCategories.forEach(category => {
                const representativeProduct = data.products.find(product => product.category === category);
                const representativeImage = representativeProduct ? representativeProduct.thumbnail : 'default-image-url.jpg';

                resultsHtml += `
            <div class="product-searchlist category-display" onclick="filterProductsByCategory('${category}')">
                <img src="${representativeImage}" alt="${capitalizeFirstLetter(category)}" class="product-thumbnaillist">
                <div class="product-infolist">
                    <button class="product-title-buttonlist">${capitalizeFirstLetter(category)}</button>
                </div>
            </div>`;
            });

            document.getElementById('searchResults').innerHTML = resultsHtml; // Füge das generierte HTML zu den Suchergebnissen hinzu
        });
}

// Warte auf das Laden der DOM-Struktur, bevor die Kategorien (mit repräsentativen Produkten) geladen werden
document.addEventListener('DOMContentLoaded', function () {
    loadCategoriesS();
});
