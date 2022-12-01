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
                res.writeHead(200, {});
                res.end(parametri.toString());
            });
        });
    }
}).listen(8080);
