import express from 'express';
import fetch from 'node-fetch';
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

  
app.get('/image', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Log the IP address to Google Spreadsheet
    logRequest(ip);

    // Send the image file
    res.sendFile(__dirname + '/1280px-HD_transparent_picture.png', function (err) {
        if (err) {
            console.error('File failed to send:', err);
            res.status(404).send("File not found");
        }
    });
});

function logRequest(ip) {
    const loggingUrl = 'https://script.google.com/macros/s/AKfycbzwtEja3hmkiK_gPLA8HLbSbcC9Qq2mwROJxpCNfwUSF40yIVjuOOYvZxfBBh8K0mNlJg/exec';

    fetch(loggingUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip: ip, timestamp: new Date().toISOString() }),
    })
    .then(response => response.text())
    .then(text => console.log(text))
    .catch(console.error);
}

export default app;