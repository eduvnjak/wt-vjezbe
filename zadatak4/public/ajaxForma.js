const dugmePosalji = document.getElementById("dugmePosalji");

dugmePosalji.addEventListener("click", posaljiPostZahtjev);

function posaljiPostZahtjev() {
    const forma = document.forms[0];

    const objekat = { ime: forma.ime.value, prezime: forma.prezime.value, adresa: forma.adresa.value, broj_telefona: forma.broj_telefona.value };

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {// Anonimna funkcija
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("divTabela").innerHTML = ajax.responseText;
        }
        if (ajax.readyState == 4 && ajax.status == 404)
            console.log("Greška");
    }
    ajax.open("POST", "http://localhost:8085/", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(objekat));
}