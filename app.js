const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const sequelize = require('./baza.js');
const express = require("express");
const path = require("path");

const app = express();
const Imenik = require('./imenik.js')(sequelize);
Imenik.sync();
const Adresar = require('./adresar.js')(sequelize);
Adresar.sync();


app.use(express.static('public'));
app.use(bodyParser.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


app.get('/imenik', function (req, res) {
    Imenik.findAll({ raw: true }).then((results) => {
        res.render("tabela.pug", { "podaci": results });
    });
});
app.delete('/imenik/:id', function (req, res) {
    Imenik.destroy({ where: { id: req.params.id } }).then((brojObrisanihRedova) => {
        if (brojObrisanihRedova) {
            res.json({ message: `Izbrisan kontakt sa id-em ${req.params.id}` });
        } else {
            res.status(404).json({ message: `Ne postoji korisnik sa id-em ${req.params.id}` });
        }
    }).catch((error) => {
        res.status(500).json({ message: error });
    });
});
app.get('/unos', function (req, res) {
    res.sendFile('public/forma.html', { root: __dirname });
});

app.post('/unos', function (req, res) {
    Imenik.create({ ime: req.body.ime, prezime: req.body.prezime, adresa: req.body.adresa, brojTelefona: req.body.brojTelefona }).then((noviUnos) => {
        res.json({ message: "Uspješan unos u bazu", noviUnos: noviUnos });
    }).catch((error) => {
        // console.log(error.message);
        res.status(400).json({ message: error.message });
    })
})

app.get('/poznanik/:kontakt', function (req, res) {
    Adresar.findAll({ raw: true, where: { kontaktId: req.params.kontakt } }).then(
        (poznanici) => {
            const poznaniciId = poznanici.map((poznanik) => poznanik.poznanikId);
            Imenik.findAll({ raw: true, where: { id: poznaniciId } }).then(
                (results) => {
                    res.render("tabela.pug", { "podaci": results });
                }
            )
        }
    ).catch((error) => {
        res.json({ message: error.message });
    })
})
app.listen(3000);