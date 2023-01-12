const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const sequelize = require('./baza.js');
const express = require("express");
const path = require("path");
const { Op } = require("sequelize");

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
    res.render("forma.pug");
});

app.post('/unos', function (req, res) {
    Imenik.create({
        ime: req.body.ime,
        prezime: req.body.prezime,
        adresa: req.body.adresa,
        brojTelefona: req.body.brojTelefona
    }).then((noviUnos) => {
        res.json({ message: "Uspješan unos u bazu", noviUnos: noviUnos });
    }).catch((error) => {
        // console.log(error.message);
        res.status(400).json({ message: error.message });
    })
})
// original
// app.get('/poznanik/:kontakt', function (req, res) {
//     Adresar.findAll({ raw: true, where: { kontaktId: req.params.kontakt } }).then(
//         (poznanici) => {
//             const poznaniciId = poznanici.map((poznanik) => poznanik.poznanikId);
//             Imenik.findAll({ raw: true, where: { id: poznaniciId } }).then(
//                 (poznanici) => {
//                     poznaniciId.push(req.params.kontakt);
//                     //iznad mozda parseint
//                     Imenik.findAll({
//                         raw: true,
//                         where: {
//                             [Op.not]: {
//                                 id: poznaniciId
//                             }
//                         }
//                     }).then((stranci) => {
//                         res.render("tabela_poznanici.pug", {
//                             "poznanici": poznanici,
//                             "stranci": stranci,
//                             "kontaktId": req.params.kontakt
//                         });
//                     })
//                 }
//             )
//         }
//     ).catch((error) => {
//         res.json({ message: error.message });
//     })
// })
// refactor sa await
// app.get('/poznanik/:kontakt', async function (req, res) {
//     try {
//         let poznaniciId = await Adresar.findAll({
//             raw: true,
//             where: {
//                 kontaktId: req.params.kontakt
//             }
//         })
//         poznaniciId = poznaniciId.map((poznanik) => poznanik.poznanikId);
//         let poznanici = await Imenik.findAll({
//             raw: true,
//             where: { id: poznaniciId }
//         })
//         //iznad mozda parseint
//         let stranci = await Imenik.findAll({
//             raw: true,
//             where: {
//                 [Op.not]: {
//                     id: poznaniciId.concat(req.params.kontakt)
//                 }
//             }
//         })
//         res.render("tabela_poznanici.pug", {
//             "poznanici": poznanici,
//             "stranci": stranci,
//             "kontaktId": req.params.kontakt
//         });
//     } catch (error) {
//         res.json({ message: error.message });
//     }
// })
// refactor sa promiseima ljepse
app.get('/poznanik/:kontakt', function (req, res) {
    Adresar.findAll({ raw: true, where: { kontaktId: req.params.kontakt } })
        .then((poznaniciId) => {
            poznaniciId = poznaniciId.map((poznanik) => poznanik.poznanikId);
            //trebal ovdje return
            return Imenik.findAll({
                raw: true,
                where: {
                    id: poznaniciId
                }
            }).then(poznanici => [poznaniciId, poznanici])
        })
        .then(([poznaniciId, poznanici]) => {
            return Imenik.findAll({
                raw: true,
                where: {
                    [Op.not]: {
                        id: poznaniciId.concat(req.params.kontakt)
                    }
                }
            }).then(stranci => [poznanici, stranci])
        })
        .then(([poznanici, stranci]) => {
            res.render("tabela_poznanici.pug", {
                "poznanici": poznanici,
                "stranci": stranci,
                "kontaktId": req.params.kontakt
            });
        }).catch((error) => {
            res.json({ message: error.message });
        })
})
app.get('/edit/:id', function (req, res) {
    Imenik.findByPk(req.params.id).then(
        (kontakt) => {
            if (kontakt === null) {
                res.status(404).json({ message: `Ne postoji korisnik sa id-em ${req.params.id}` });
                return;
            }
            res.render("forma.pug", { "podaci": kontakt })
        }
    )
})
// original
// mozda pametnije da edit ima route parametar a da su atributi u tijelu zahtjeva
app.put('/edit', function (req, res) {
    Imenik.findByPk(req.body.id).then(
        (kontakt) => {
            if (kontakt === null) {
                res.status(404).json({ message: `Ne postoji korisnik sa id-em ${req.body.id}` });
                return;
            }
            console.log(kontakt.get());
            kontakt.set({
                ime: req.body.ime,
                prezime: req.body.prezime,
                adresa: req.body.adresa,
                brojTelefona: req.body.brojTelefona
            });
            return kontakt.save();
        }).then(
            (kontakt) => {
                console.log(kontakt.get());
                res.json({ message: `Uspješno izmijenjen korisnik sa id-em ${kontakt.id}` });
            }
        ).catch((error) => {
            res.status(400).json({ message: error.message });
        })
});
// refactor sa await
// app.put('/edit', async function (req, res) {
//     try {
//         let kontakt = await Imenik.findByPk(req.body.id);
//         if (kontakt === null) {
//             res.status(404).json({ message: `Ne postoji korisnik sa id-em ${req.body.id}` });
//             return;
//         }
//         kontakt.set({
//             ime: req.body.ime,
//             prezime: req.body.prezime,
//             adresa: req.body.adresa,
//             brojTelefona: req.body.brojTelefona
//         });
//         await kontakt.save();
//         res.json({ message: `Uspješno izmijenjen korisnik sa id-em ${req.body.id}` });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
app.put('/poznanik', function (req, res) {
    Adresar.create({
        kontaktId: req.body.kontaktId,
        poznanikId: req.body.poznanikId
    }).then((adresarRed) => {
        res.json({ message: "Uspješan unos u bazu", noviUnos: adresarRed });
    }).catch((error) => {
        //ovo treba srediti
        console.log(error);
        res.status(400).json({ message: error.message });
    })
})
app.listen(3000);