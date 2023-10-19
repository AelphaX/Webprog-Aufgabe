function loadCategories() {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        const categories = new Set(data.products.map(product => product.category)); // Erstellt ein Set von einzigartigen Kategorien
        const sideNav = document.getElementById('sideNav');  // Stellen Sie sicher, dass 'sideNav' die richtige ID für Ihr Navigationsmenü ist.

        categories.forEach(category => {
            const categoryLink = document.createElement('a');
            categoryLink.innerText = capitalizeFirstLetter(category); 
            categoryLink.href = "#";
            categoryLink.onclick = function() {
                filterProductsByCategory(category);
            };
            const placeholder = document.getElementById('categoryPlaceholder');
            sideNav.insertBefore(categoryLink, placeholder);  // Fügt die Kategorie direkt vor dem Platzhalter hinzu
        });
        
    });
}

function filterProductsByCategory(category) {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        const filteredProducts = data.products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    });
}

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

    if (resultsHtml === '') {
        resultsHtml = '<div class="error-message">Keine Produkte gefunden.</div>';
    } else {
        // Wenn es Suchergebnisse gibt, fügen Sie die Klasse hinzu
        document.getElementById('searchResults').classList.add('has-results');
    }

    document.getElementById('searchResults').innerHTML = resultsHtml;
}


document.addEventListener('DOMContentLoaded', function() {
    loadCategories(); // Laden der Kategorien beim Start
    // Sie können hier auch andere Initialisierungscode hinzufügen.
});

function capitalizeFirstLetter(string) {
    return string.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('-');
}


function loadCategoriesS() {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)));
        
        let resultsHtml = '';
        uniqueCategories.forEach(category => {
            const representativeProduct = data.products.find(product => product.category === category);
            const representativeImage = representativeProduct ? representativeProduct.thumbnail : 'default-image-url.jpg';  // Ersetzen Sie 'default-image-url.jpg' durch den Pfad zu einem Standardbild Ihrer Wahl

            resultsHtml += `
            <div class="product-searchlist category-display" onclick="filterProductsByCategory('${category}')">
                <img src="${representativeImage}" alt="${capitalizeFirstLetter(category)}" class="product-thumbnaillist">
                <div class="product-infolist">
                    <button class="product-title-buttonlist">${capitalizeFirstLetter(category)}</button>
                </div>
            </div>`;
        });

        document.getElementById('searchResults').innerHTML = resultsHtml;
    });
}


document.addEventListener('DOMContentLoaded', function() {
    loadCategoriesS();
});
