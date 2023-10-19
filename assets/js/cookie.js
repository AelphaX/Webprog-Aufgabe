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
