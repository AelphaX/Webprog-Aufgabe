// Holen der Modal- Schaltflächen- und Schließen-ElementreferenzenzEN.
const modal = document.getElementById("impressumModal");
const btn = document.querySelector("a[href='#impressum']");
const span = document.getElementsByClassName("close")[0];

// Modal anzeigen, wenn auf die Schaltfläche geklickt wird.
btn.onclick = function() {
    modal.style.display = "block";
}

// Modal ausblenden, wenn auf das Schließen-Symbol geklickt wird.
span.onclick = function() {
    modal.style.display = "none";
}

// Modal ausblenden, wenn außerhalb des Modals geklickt wird.
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

