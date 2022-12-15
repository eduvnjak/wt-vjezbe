const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//pitanja 
//sta znaci get/post, da li jedan od ova dva ili jedno dugme jedan zahtjev drugo drugi zahtjev
app.get('/', function (req, res) {
    fs.readFile('imenik.txt', (err, data) => {
        if (err) throw err;
        const podaciCSV = data.toString('utf-8');

        var tabelaHtml = dajHtmlTabelu(podaciCSV);

        res.set({ "Content-Type": "text/html" }); //cini se suvisno
        res.send(tabelaHtml);
    });
});

app.get('/unos', function (req, res) {
    res.sendFile("forma.html", { root: __dirname });
});

app.get('/ime/:ime', function (req, res) {
    fs.readFile('imenik.txt', (err, data) => {
        if (err) throw err;
        const trenutniImenik = data.toString("utf-8");
        var noviImenik = "";
        var novaTabela = dajPocetakTabele();

        for (const line of trenutniImenik.split('\n')) {
            if (line == "") continue;

            const lineParts = line.split(',');
            if (lineParts[0] != req.params.ime) {
                novaTabela += dajRedTabele(lineParts);
                noviImenik += "\n" + lineParts[0] + "," + lineParts[1] +
                    "," + lineParts[2] + "," + lineParts[3];
            }

        }

        novaTabela += dajKrajTabele();
        fs.writeFile('imenik.txt', noviImenik, (err) => {
            if (err) throw err;
        })
        res.send(novaTabela);
    })
});

app.get('/edit/:ime/:prezime/:adresa/:broj_telefona', (req, res) => {
    const htmlForma = `<form action="http://localhost:8085" method="post">
        <label>Ime: <input type="text" name="ime" value="${req.params.ime}"> </label><br>
        <label>Prezime: <input type="text" name="prezime" value="${req.params.prezime}"> </label><br>
        <label>Adresa: <input type="text" name="adresa" value="${req.params.adresa}"> </label><br>
        <label>Broj telefona: <input type="text" name="broj_telefona" value="${req.params.broj_telefona}"> </label> <br>
        <input type="submit" name="posalji">
        </form>`
    res.send(htmlForma);
});
app.post('/', function (req, res) {
    let tijelo = req.body;
    let novaLinija = "\n" + tijelo['ime'] + "," + tijelo['prezime'] +
        "," + tijelo['adresa'] + "," + tijelo['broj_telefona'];
    fs.appendFile('imenik.txt', novaLinija, function (err) {
        if (err) throw err;
        fs.readFile('imenik.txt', (err, data) => {
            if (err) throw err;
            const podaciCSV = data.toString('utf-8');
            const tabelaHtml = dajHtmlTabelu(podaciCSV);

            res.set({ "Content-Type": "text/html" }); //cini se suvisno
            res.send(tabelaHtml);
        });
    });
});

function dajHtmlTabelu(podaci) {
    var tabelaHtml = dajPocetakTabele();

    for (const line of podaci.split('\n')) {
        if (line == "") continue;
        const lineParts = line.split(',');
        tabelaHtml += dajRedTabele(lineParts);
    }
    tabelaHtml += dajKrajTabele();
    return tabelaHtml;
}

function dajPocetakTabele() {
    return "<style> table, td, th {border-collapse:collapse; border-style:solid; padding: 5px} </style><table><tr><th>Ime</th><th>Prezime</th><th>Adresa</th><th>Broj telefona</th></tr>";
}

function dajRedTabele(podaci) {
    return `<tr><td>${podaci[0]}</td> <td>${podaci[1]}</td> <td>${podaci[2]}</td> <td>${podaci[3]}</td>
    <td> <form action="http://localhost:8085/edit/${podaci[0]}/${podaci[1]}/${podaci[2]}/${podaci[3]}" method="get"><input type="submit" value="Edit"></form></td>
    <td> <form action="http://localhost:8085/ime/${podaci[0]}" method="get"><input type="submit" value="Delete"></form></td>
    </tr>`;
}

function dajKrajTabele() {
    return "</table>";
}
app.listen(8085);
