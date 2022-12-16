const express = require("express");
var bodyParser = require('body-parser');

const path = require("path");

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vjezba9'
});
connection.connect();

app.get('/imenik', function (req, res) {
    connection.query('SELECT * FROM imenik', function (error, results, fields) {
        if (error) throw error;
        res.render("tabela.pug", { "podaci": results });
    });
});

app.get('/unos', function (req, res) {
    res.sendFile('public/forma.html', { root: __dirname });
})

app.post('/unos', function (req, res) {
    connection.query('INSERT INTO imenik (`ime i prezime`,adresa,`broj telefona`) VALUES (?,?,?)', [req.body.ime_prezime, req.body.adresa, req.body.broj_telefona], function (error, results, fields) {
        if (error) throw error;
        res.send("OK");
    });
})
app.get('/poznanik/:kontakt', function (req, res) {
    connection.query('SELECT * FROM imenik WHERE id IN (SELECT idPoznanik FROM adresar WHERE idKontakt=?)', [req.params.kontakt], function (error, results, fields) {
        if (error) throw error;
        res.render("tabela.pug", { "podaci": results });
    });
})
app.listen(3000);