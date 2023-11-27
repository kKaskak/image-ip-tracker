document.getElementById('hostedImage').onload = function() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            logRequest(ipAddress);
            console.log(ipAddress)
        })
        .catch(console.error);
};

function logRequest(ip) {
    // Replace with your Google Apps Script web app URL
    const loggingUrl = 'https://script.google.com/macros/s/AKfycbzwtEja3hmkiK_gPLA8HLbSbcC9Qq2mwROJxpCNfwUSF40yIVjuOOYvZxfBBh8K0mNlJg/exec';

    fetch(loggingUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip: ip, timestamp: new Date().toISOString() }),
    }).catch(console.error);
}