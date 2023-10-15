// Get the map modal
var mapsAnfahrt = document.getElementById('mapsAnfahrt');

// Get the link that opens the map modal
var mapsLink = document.querySelector("a[href='#']");

// Get the <span> element that closes the map modal
var closeMaps = mapsAnfahrt.querySelector(".close");

// When the user clicks on the link, open the map modal 
mapsLink.onclick = function(event) {
    event.preventDefault();
    mapsAnfahrt.style.display = "block";
}

// When the user clicks on <span> (x), close the map modal
closeMaps.onclick = function() {
    mapsAnfahrt.style.display = "none";
}

// Function to close modals when clicking outside of them
window.onclick = function(event) {
    if (event.target == mapsAnfahrt) {
        mapsAnfahrt.style.display = "none";
    }
    // Add similar code here for other modals if needed.
}
