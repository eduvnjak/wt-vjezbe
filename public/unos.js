const posaljiDugme = document.getElementById("posalji");

posaljiDugme.addEventListener("click", () => {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            // document.getElementById("status").innerHTML = "Red dodan u bazu";
            alert("Kontakt dodan u bazu");
            document.forms[0].reset();
        } else if (ajax.readyState == 4) {
            alert((JSON.parse(ajax.response)).message);
        }
    }

    ajax.open("POST", "http://localhost:3000/unos", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    var objekat = {
        ime: document.forms[0].ime.value,
        prezime: document.forms[0].prezime.value,
        adresa: document.forms[0].adresa.value,
        brojTelefona: document.forms[0].broj_telefona.value
    }
    ajax.send(JSON.stringify(objekat))
})