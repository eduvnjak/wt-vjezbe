const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public', {index: 'ajaxForma.html'}))

app.post('/', function (req, res) {
    let tijelo = req.body;
    let novaLinija = "\n" + tijelo['ime'] + "," + tijelo['prezime'] +
        "," + tijelo['adresa'] + "," + tijelo['broj_telefona'];
    fs.appendFile('imenik.txt', novaLinija, function (err) {
        if (err) throw err;
        fs.readFile('imenik.txt', (err, data) => {
            if (err) throw err;
            // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            const podaciCSV = data.toString('utf-8');
            var tabelaHtml = "<style> table, td, th {border-collapse:collapse; border-style:solid; padding: 5px} </style><table><tr><th>Ime</th><th>Prezime</th><th>Adresa</th><th>Broj telefona</th></tr>";

            for (const line of podaciCSV.split('\n')) {
                if (line == "") continue;
                const lineParts = line.split(',');
                tabelaHtml += `<tr><td>${lineParts[0]}</td> <td>${lineParts[1]}</td> <td>${lineParts[2]}</td> <td>${lineParts[3]}</td></tr>`;
            }
            tabelaHtml += "</table>"

            res.status(200).send(tabelaHtml);
        });
    });
});

app.listen(8085);
