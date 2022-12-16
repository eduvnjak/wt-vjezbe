const posaljiDugme = document.getElementById("posalji");

posaljiDugme.addEventListener("click", () => {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("status").innerHTML = "Red dodan u bazu";
        }
    }

    ajax.open("POST", "http://localhost:3000/unos", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    var objekat = {
        ime_prezime: document.forms[0].ime_prezime.value,
        adresa: document.forms[0].adresa.value,
        broj_telefona: document.forms[0].broj_telefona.value
    }
    console.log("forma.js " + JSON.stringify(objekat));
    ajax.send(JSON.stringify(objekat))
})