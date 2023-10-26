var mapsAnfahrt = document.getElementById('mapsAnfahrt');

var mapsLink = document.querySelector("a[href='#']");

var closeMaps = mapsAnfahrt.querySelector(".close");

mapsLink.onclick = function(event) {
    event.preventDefault();
    mapsAnfahrt.style.display = "block";
}

closeMaps.onclick = function() {
    mapsAnfahrt.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == mapsAnfahrt) {
        mapsAnfahrt.style.display = "none";
    }
}
