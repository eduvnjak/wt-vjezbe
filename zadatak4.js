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
            //primljen čitav zahtjev
            const urlParsiran = new URL(req.url, `http://${req.headers.host}`);

            let novaLinija = "";
            if (urlParsiran.pathname == "/json") {
                try {
                    const objekatZahtjev = JSON.parse(tijeloZahtjeva);
                    novaLinija = objekatZahtjev.ime + "," + objekatZahtjev.prezime +
                        "," + objekatZahtjev.adresa + "," + objekatZahtjev.broj_telefona + "\r\n";
                } catch (e) {
                    res.writeHead(400, { "Content-Type": "text/plain" });
                    res.end("Invalid JSON");
                    return;
                }

            } else {
                let parametri = new url.URLSearchParams(tijeloZahtjeva);
                novaLinija = parametri.get('ime') + "," + parametri.get('prezime') +
                    "," + parametri.get('adresa') + "," + parametri.get('broj_telefona') + "\r\n";
            }

            fs.appendFile('imenik.txt', novaLinija, function (err) {
                if (err) throw err;
                console.log("Novi red uspješno dodan!");
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Novi red uspješno dodan");
            });
        });
    }
}).listen(8080);
