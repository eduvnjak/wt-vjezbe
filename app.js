const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const sequelize = require('./baza.js');
const express = require("express");
const path = require("path");

const app = express();
const Imenik = require('./imenik.js')(sequelize);
Imenik.sync();

app.use(express.static('public'));
app.use(bodyParser.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


app.get('/imenik', function (req, res) {
    // connection.query('SELECT * FROM imenik', function (error, results, fields) {
    //     if (error) throw error;
    //     res.render("tabela.pug", { "podaci": results });
    // });
    Imenik.findAll().then((results) => {
        res.render("tabela.pug", { "podaci": results });
    });
});

app.get('/unos', function (req, res) {
    res.sendFile('public/forma.html', { root: __dirname });
})

app.post('/unos', function (req, res) {
    Imenik.create({ ime: req.body.ime, prezime: req.body.prezime, adresa: req.body.adresa, brojTelefona: req.body.brojTelefona }).then((noviUnos) => {
        res.json({ message: "Uspješan unos u bazu", noviUnos: noviUnos });
    }).catch((error) => {
        // console.log(error.message);
        res.status(400).json({ message: error.message });
    })

    // connection.query('INSERT INTO imenik (`ime i prezime`,adresa,`broj telefona`) VALUES (?,?,?)', [req.body.ime_prezime, req.body.adresa, req.body.broj_telefona], function (error, results, fields) {
    //     if (error) throw error;
    //     res.send("OK");
    // });
})

// app.get('/poznanik/:kontakt', function (req, res) {
//     connection.query('SELECT * FROM imenik WHERE id IN (SELECT idPoznanik FROM adresar WHERE idKontakt=?)', [req.params.kontakt], function (error, results, fields) {
//         if (error) throw error;
//         res.render("tabela.pug", { "podaci": results });
//     });
// })
app.listen(3000);