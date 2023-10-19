document.getElementById('searchInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchData(); // Die searchData-Funktion aufrufen, wenn "Enter" gedrückt wird
    }
});

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

let isFirstInput = true; // Eine Flagge, um den ersten Input zu verfolgen

searchInput.addEventListener('input', () => {
    if (isFirstInput) {
        isFirstInput = false;
        return; // Ignoriere den ersten Input
    }

    if (searchInput.value === '') {
        // Wenn das Suchfeld leer ist, verberge die Suchergebnisse
        searchResults.innerHTML = '';
        document.getElementById('resultCount').innerText = '';
    } else {
        searchData();
    }
});

async function searchData() {
    const url = 'https://dummyjson.com/products';
    const searchInputValue = searchInput.value.toLowerCase();

    try {
        const response = await fetch(url);
        const data = await response.json();

        let resultsHtml = '';

        if (data.products && data.products.length > 0) {
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
                // Wenn es Suchergebnisse gibt, fügen Sie die Klasse hinzu
                searchResults.classList.add('has-results');
            }

            searchResults.innerHTML = resultsHtml;
        } else {
            console.log("Keine Produkte gefunden.");
            searchResults.innerHTML = '<div class="error-message">Keine Produkte gefunden.</div>';
            document.getElementById('resultCount').innerText = '';
            // Wenn es keine Suchergebnisse gibt, entfernen Sie die Klasse
            searchResults.classList.remove('has-results');
        }
        
    } catch (error) {
        console.error("Fehler beim Abrufen der Produkte:", error);
        searchResults.innerHTML = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
        document.getElementById('resultCount').innerText = '';
        // Im Fehlerfall die Klasse entfernen
        searchResults.classList.remove('has-results');
    }
}




function updateSearchSuggestions(suggestions) {
    // Lösche vorhandene Suchvorschläge
    searchSuggestions.innerHTML = '';

    // Füge die neuen Suchvorschläge hinzu
    suggestions.forEach(suggestion => {
        const option = document.createElement('option');
        option.value = suggestion;
        searchSuggestions.appendChild(option);
    });
}


function goBack() {
    document.getElementById('searchSection').style.display = 'block';
    document.getElementById('detailSection').style.display = 'none';
}



document.getElementById('menuButton').addEventListener('click', function() {
    openNav();
});

document.getElementById('closeButton').addEventListener('click', function() {
    closeNav();
});

function openNav() {
    document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
}




document.getElementById('acceptCookies').addEventListener('click', function() {
    document.getElementById('cookieConsentPopup').style.display = 'none';
});

document.getElementById('declineCookies').addEventListener('click', function() {
    document.getElementById('cookieConsentPopup').style.display = 'none';
});

// Beim Laden der Seite wird das Cookie-Bestätigungs-Popup immer angezeigt
//window.onload = function() {
    //document.getElementById('cookieConsentPopup').style.display = 'block';
//}


