var mapsAnfahrt = document.getElementById('mapsAnfahrt');
var mapsLink = document.querySelector("a[href='#']");
var closeMaps = mapsAnfahrt.querySelector(".close");

// Funktion, die beim Klicken auf den 'mapsLink' aufgerufen wird
mapsLink.onclick = function(event) {
    event.preventDefault();
    mapsAnfahrt.style.display = "block"; 
}

// Funktion, die beim Klicken auf das Fenster (außerhalb des Inhalts) aufgerufen wird
window.onclick = function(event) {
    if (event.target == mapsAnfahrt) {
        mapsAnfahrt.style.display = "none";
    }
}

// Funktion, die beim Klicken auf 'closeMaps' aufgerufen wird
closeMaps.onclick = function() {
    mapsAnfahrt.style.display = "none";
}
