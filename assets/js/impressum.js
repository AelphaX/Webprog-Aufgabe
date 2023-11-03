document.addEventListener("DOMContentLoaded", function() {
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


    window.onclick = function(event) {
        const sideNav = document.getElementById("sideNav");
        const modal = document.getElementById("impressumModal");
    
        // Überprüfen Sie, ob außerhalb des sideNav geklickt wurde
        if (!sideNav.contains(event.target) && event.target !== sideNav) {
            closeNav();
        }
    
        // Überprüfen Sie, ob außerhalb des Modals geklickt wurde
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    
});


