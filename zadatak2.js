const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer(function (req, res) {
    fs.readFile('imenik.txt', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });

        const urlParsiran = new URL(req.url, `http://${req.headers.host}`);

        // console.log(urlParsiran.search);
        // for (const [key, value] of urlParsiran.searchParams) {
        //     console.log(key + " " + value);
        // }
        const qParametar = urlParsiran.searchParams.get("q");

        const podaciCSV = data.toString('utf-8');
        var podaciJSON = "[";
        for (const line of podaciCSV.split('\r\n')) {
            if (line == "") continue;
            const lineParts = line.split(',');

            if (qParametar != null && lineParts[0].toLowerCase().indexOf(qParametar.toLowerCase()) == -1) continue;
            podaciJSON += "{";

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
        if (podaciJSON[podaciJSON.length - 1] == ",") podaciJSON = podaciJSON.slice(0, -1);
        podaciJSON += "]"

        res.end(podaciJSON);
    });
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});