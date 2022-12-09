const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.static('public'))

app.get('/stranica1', function (req, res) {
    res.sendFile(__dirname + '/stranica1.html');
});
app.get('/stranica2', function (req, res) {
    res.sendFile(__dirname + '/stranica2.html');
});
app.get('/stranica3', function (req, res) {
    res.sendFile(__dirname + '/stranica3.html');
});
app.listen(8085);