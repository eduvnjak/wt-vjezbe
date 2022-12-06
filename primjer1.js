const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/', function (req, res) {
    let tijelo = req.body;
    let novaLinija = "\n" + tijelo['ime'] + "," + tijelo['prezime'] +
        "," + tijelo['adresa'] + "," + tijelo['broj_telefona'];
    fs.appendFile('imenik.txt', novaLinija, function (err) {
        if (err) throw err;
        res.json({ message: "Uspješno dodan red", data: novaLinija });
    });
});
app.listen(8085);
