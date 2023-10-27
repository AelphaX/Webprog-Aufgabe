// Funktion zum Laden der Kategorien mithilfe von Fetch-API
function loadCategories() {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        // Extrahiere eindeutige Kategorien aus den Produktdaten
        const categories = new Set(data.products.map(product => product.category));
        const sideNav = document.getElementById('sideNav'); // Holen Sie sich das Seiten-Navigations-Element

        // Schleife durch die Kategorien und erstelle Links im Seiten-Navigationsmenü
        categories.forEach(category => {
            const categoryLink = document.createElement('a');
            categoryLink.innerText = capitalizeFirstLetter(category); // Setze den Kategorienamen (erste Buchstabe großgeschrieben) als Text
            categoryLink.href = "#"; // Setze den Link auf "#" (kann später angepasst werden)
            categoryLink.onclick = function() {
                filterProductsByCategory(category); // Füge einen Klick-Handler hinzu, um Produkte nach Kategorie zu filtern
            };
            const placeholder = document.getElementById('categoryPlaceholder'); // Hole das Platzhalter-Element
            sideNav.insertBefore(categoryLink, placeholder); // Füge den Link vor den Platzhalter ein
        });
    });
}

// Funktion zum Filtern von Produkten nach Kategorie
function filterProductsByCategory(category) {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        // Filtere Produkte nach der ausgewählten Kategorie
        const filteredProducts = data.products.filter(product => product.category === category);
        displayProducts(filteredProducts); // Zeige die gefilterten Produkte an
    });
}

// Funktion zum Anzeigen der Produkte
function displayProducts(products) {
    let resultsHtml = '';

    // Schleife durch die Produkte und erstelle HTML für jedes Produkt
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
        document.getElementById('searchResults').classList.add('has-results'); // Füge eine CSS-Klasse hinzu, wenn Ergebnisse vorhanden sind
    }

    document.getElementById('searchResults').innerHTML = resultsHtml; // Füge das generierte HTML zu den Suchergebnissen hinzu
}

// Warte auf das Laden der DOM-Struktur, bevor die Kategorien geladen werden
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
});

// Funktion zum Großschreiben des ersten Buchstabens eines Wortes
function capitalizeFirstLetter(string) {
    return string.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('-');
}

// Funktion zum Laden der Kategorien mit einem repräsentativen Produkt
function loadCategoriesS() {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        // Extrahiere eindeutige Kategorien aus den Produktdaten
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
document.addEventListener('DOMContentLoaded', function() {
    loadCategoriesS();
});
