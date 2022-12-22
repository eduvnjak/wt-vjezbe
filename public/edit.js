const posaljiDugme = document.getElementById("posalji");

posaljiDugme.addEventListener("click", () => {
    // console.log(document.forms[0].id.value);
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            // document.getElementById("status").innerHTML = "Red dodan u bazu";
            alert((JSON.parse(ajax.response)).message);
            window.location.href = "/imenik";
        } else if (ajax.readyState == 4) {
            alert((JSON.parse(ajax.response)).message);
        }
    }

    ajax.open("PUT", "http://localhost:3000/edit", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    var objekat = {
        id: document.forms[0].id.value,
        ime: document.forms[0].ime.value,
        prezime: document.forms[0].prezime.value,
        adresa: document.forms[0].adresa.value,
        brojTelefona: document.forms[0].broj_telefona.value
    }
    ajax.send(JSON.stringify(objekat))
});