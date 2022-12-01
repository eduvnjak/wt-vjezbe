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
        var podaciJSON = "[";
        for (const line of podaciCSV.split('\r\n')) {
            if (line == "") continue;
            podaciJSON += "{";
            const lineParts = line.split(',');
            podaciJSON += "\"ime\": \"";
            podaciJSON += lineParts[0];
            podaciJSON += "\",";

            podaciJSON += "\"prezime\": \""
            podaciJSON += lineParts[1];
            podaciJSON += "\",";

            podaciJSON += "\"adresa\": \"";
            podaciJSON += lineParts[2];
            podaciJSON += "\",";


            podaciJSON += "\"broj_telefona\": \"";
            podaciJSON += lineParts[3];
            podaciJSON += "\""

            podaciJSON += "},";
        }
        podaciJSON = podaciJSON.slice(0, -1);
        podaciJSON += "]"

        res.end(podaciJSON);
    });

}).listen(8080);