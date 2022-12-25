const dodajPoznanikaDugme = document.getElementById("dodaj_poznanika");

dodajPoznanikaDugme.addEventListener("click", () => {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            // document.getElementById("status").innerHTML = "Red dodan u bazu";
            alert((JSON.parse(ajax.response)).message);
            window.location.reload();
        } else if (ajax.readyState == 4) {
            alert((JSON.parse(ajax.response)).message);
        }
    }

    ajax.open("PUT", "http://localhost:3000/poznanik", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    var objekat = {
        kontaktId: document.forms[0].kontaktId.value,
        poznanikId: document.forms[0].stranci.value
    }
    // console.log(objekat)
    ajax.send(JSON.stringify(objekat))
});