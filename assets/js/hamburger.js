// Funktion zum Öffnen des Seitenmenüs
function openNav() {
    document.getElementById("sideNav").style.width = "250px";
}

// Eventlistener für das Menü öffnen
document.getElementById('menuButton').addEventListener('click', function(event) {
    openNav();
    event.stopPropagation();  // Verhindert, dass das Event weitergeleitet wird
});

// Eventlistener für das Menü schließen
document.getElementById('closeButton').addEventListener('click', function(event) {
    closeNav();
    event.stopPropagation();  // Verhindert, dass das Event weitergeleitet wird
});


function closeNav() {
    document.getElementById("sideNav").style.width = "0";
}


// Funktion zum Laden der Kategorien mithilfe von Fetch-API
function loadCategories() {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
            // Extrahiere eindeutige Kategorien aus den Produktdaten
            const categories = new Set(data.products.map(product => product.category));
            const sideNav = document.getElementById('sideNav');

            // Schleife durch die Kategorien und erstelle Links im Seiten-Navigationsmenü
            categories.forEach(category => {
                const categoryLink = document.createElement('a');
                categoryLink.innerText = capitalizeFirstLetter(category);
                categoryLink.href = "#";
                categoryLink.onclick = function () {
                    filterProductsByCategory(category);
                };
                const placeholder = document.getElementById('categoryPlaceholder'); // Hole das Platzhalter-Element
                sideNav.insertBefore(categoryLink, placeholder); // Füge den Link vor den Platzhalter ein
            });
        });
}

document.addEventListener('DOMContentLoaded', function () {
    loadCategories();
});

