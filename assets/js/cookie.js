// Wenn auf den "Akzeptieren"-Button geklickt wird, wird das Cookie-Bestätigungs-Popup ausgeblendet
document.getElementById('acceptCookies').addEventListener('click', function() {
    document.getElementById('cookieConsentPopup').style.display = 'none';
});

// Wenn auf den "Ablehnen"-Button geklickt wird, wird das Cookie-Bestätigungs-Popup ebenfalls ausgeblendet
document.getElementById('declineCookies').addEventListener('click', function() {
    document.getElementById('cookieConsentPopup').style.display = 'none';
    alert("PECH GEHABT! Sie haben trotzdem akzeptiert");
});

// Beim Laden der Seite wird das Cookie-Bestätigungs-Popup immer angezeigt
window.onload = function() {
    document.getElementById('cookieConsentPopup').style.display = 'block';
}
