const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile('imenik.txt', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const podaciCSV = data.toString('utf-8');
        //napravi json objekat
        var podaciJSON = [];
        for (const line of podaciCSV.split('\r\n')) {
            if (line == "") continue;
            const lineParts = line.split(',');
            let objekat = { ime: lineParts[0], prezime: lineParts[1], adresa: lineParts[2], broj_telefona: lineParts[3] }
            podaciJSON.push(objekat);
        }

        res.end(JSON.stringify(podaciJSON));
    });

}).listen(8080);