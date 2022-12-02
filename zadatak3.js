const http = require('http');
const fs = require('fs');
const url = require('url');
http.createServer(function (req, res) {
    if (req.method == 'POST') {
        let tijeloZahtjeva = '';
        req.on('data', function (data) {
            tijeloZahtjeva += data;
        });
        req.on('end', function () {
            console.log(req);
            //primljen čitav zahtjev
            let parametri = new url.URLSearchParams(tijeloZahtjeva);
            let novaLinija = parametri.get('ime') + "," + parametri.get('prezime') +
                "," + parametri.get('adresa') + "," + parametri.get('broj_telefona') + "\r\n";
            fs.appendFile('imenik.txt', novaLinija, function (err) {
                if (err) throw err;
                console.log("Novi red uspješno dodan!");
                fs.readFile('imenik.txt', (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    const podaciCSV = data.toString('utf-8');
                    var tabelaHtml = "<table><tr><th>Ime</th><th>Prezime</th><th>Adresa</th><th>Broj telefona</th></tr>";

                    for (const line of podaciCSV.split('\r\n')) {
                        if (line == "") continue;
                        const lineParts = line.split(',');
                        tabelaHtml += `<tr><td>${lineParts[0]}</td> <td>${lineParts[1]}</td> <td>${lineParts[2]}</td> <td>${lineParts[3]}</td></tr>`;
                    }
                    console.log(tabelaHtml);
                    tabelaHtml += "</table>"

                    res.end(tabelaHtml);
                });
            });
        });
    }
}).listen(8080);
