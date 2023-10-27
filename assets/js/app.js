// Eventlistener für Tastenanschläge auf dem Sucheingabefeld
document.getElementById('searchInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchData();
    }
});

// Variablendeklarationen für Sucheingabe und Suchergebnisse
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

let isFirstInput = true;

// Eventlistener für Eingaben im Sucheingabefeld
searchInput.addEventListener('input', () => {
    if (isFirstInput) {
        isFirstInput = false; // Überspringe die erste Eingabe
        return;
    }

    if (searchInput.value === '') {
        searchResults.innerHTML = '';
    } else {
        searchData(); // Starte die Suche, wenn eine Eingabe erfolgt
    }
});

// Asynchrone Funktion für die Produktsuche
async function searchData() {
    const url = 'https://dummyjson.com/products';
    const searchInputValue = searchInput.value.toLowerCase();

    try {
        const response = await fetch(url);
        const data = await response.json();

        let resultsHtml = '';

        if (data.products && data.products.length > 0) {
            // Filtere Produkte basierend auf der Eingabe und generiere HTML
            const filteredProducts = data.products.filter(item => item.title.toLowerCase().includes(searchInputValue));

            filteredProducts.forEach(item => {
                resultsHtml += `
                    <div class="product-searchlist" onclick="showDetail(${item.id})">
                        <img src="${item.thumbnail}" alt="${item.title} Thumbnail" class="product-thumbnaillist">
                        <div class="product-infolist">
                            <button class="product-title-buttonlist">${item.title}</button>
                        </div>
                    </div>`;
            });
            
            const resultCount = filteredProducts.length;
            
            if (resultsHtml === '') {
                resultsHtml = '<div class="error-message">Keine Produkte gefunden.</div>';
            } else {
                searchResults.classList.add('has-results'); // Hinzufügen der Klasse, um die Ergebnisse anzuzeigen
            }

            searchResults.innerHTML = resultsHtml; // Anzeige der Suchergebnisse
        } else {
            console.log("Keine Produkte gefunden.");
            searchResults.innerHTML = '<div class="error-message">Keine Produkte gefunden.';
            searchResults.classList.remove('has-results');
        }
        
    } catch (error) {
        console.error("Fehler beim Abrufen der Produkte:", error);
        searchResults.innerHTML = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
        searchResults.classList.remove('has-results');
    }
}

// Funktion zur Aktualisierung von Suchvorschlägen
function updateSearchSuggestions(suggestions) {
    searchSuggestions.innerHTML = '';
    suggestions.forEach(suggestion => {
        const option = document.createElement('option');
        option.value = suggestion;
        searchSuggestions.appendChild(option);
    });
}

// Funktion zum Zurückkehren zur Suchansicht
function goBack() {
    document.getElementById('searchSection').style.display = 'block';
    document.getElementById('detailSection').style.display = 'none';
}

// Eventlistener für das Menü öffnen
document.getElementById('menuButton').addEventListener('click', function() {
    openNav();
});

// Eventlistener für das Menü schließen
document.getElementById('closeButton').addEventListener('click', function() {
    closeNav();
});

// Funktion zum Öffnen des Seitenmenüs
function openNav() {
    document.getElementById("sideNav").style.width = "250px";
}

// Funktion zum Schließen des Seitenmenüs
function closeNav() {
    document.getElementById("sideNav").style.width = "0";
}
