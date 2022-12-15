const broj_pokusaja = document.getElementById("broj_pokusaja");
const poruka = document.getElementById("pokusaj_poruka");
const posalji = document.getElementById("posalji");
const pokusajInput = document.getElementById("pokusaj");

posalji.addEventListener("click", () => {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var res = JSON.parse(ajax.responseText);
            broj_pokusaja.innerHTML = res.pokusaj.broj_pokusaja;
            poruka.innerHTML = res.pokusaj.poruka;
        }
        else if (ajax.readyState == 4) {
            poruka.innerHTML = ajax.statusText;
            broj_pokusaja.innerHTML = "";
        }
    }
    ajax.open("POST", "http://localhost:3000", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify({pokusaj: pokusajInput.value}));
});