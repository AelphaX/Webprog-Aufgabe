const modal = document.getElementById("impressumModal");
const btn = document.querySelector("a[href='#impressum']");
const span = document.getElementsByClassName("close")[0];

// Wenn der Benutzer auf den Button klickt, öffnen Sie das Modal
btn.onclick = function() {
    modal.style.display = "block";
}

//Wenn der Benutzer auf das (x) Symbol klickt, schließen Sie das Modal
span.onclick = function() {
    modal.style.display = "none";
}

// Wenn der Benutzer überall außerhalb des Modals klickt, schließen Sie es
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}