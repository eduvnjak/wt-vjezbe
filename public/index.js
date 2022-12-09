const stranica1 = document.getElementById("link_stranica_1");
const stranica2 = document.getElementById("link_stranica_2");
const stranica3 = document.getElementById("link_stranica_3");

stranica1.addEventListener("click", ucitajStranicu1);
stranica2.addEventListener("click", ucitajStranicu2);
stranica3.addEventListener("click", ucitajStranicu3);

function ucitajStranicu1() {
    ucitajStranicu(1);
}

function ucitajStranicu2() {
    ucitajStranicu(2);
}

function ucitajStranicu3() {
    ucitajStranicu(3);
}
function ucitajStranicu(stranica) {
    if (stranica < 1 || stranica > 3) return;

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {// Anonimna funkcija
        if (ajax.readyState == 4 && ajax.status == 200)
            document.getElementById("container").innerHTML = ajax.responseText;
        if (ajax.readyState == 4 && ajax.status == 404)
            document.getElementById("container").innerHTML = "Greska: nepoznat URL";
    }
    switch (stranica) {
        case 1:
            //da li ovjde mora get na server ili moze get fajla ???
            ajax.open("GET", "http://localhost:8085/stranica1", true);
            break;
        case 2:
            ajax.open("GET", "http://localhost:8085/stranica2", true);
            break;
        case 3:
            ajax.open("GET", "http://localhost:8085/stranica3", true);
            break;
        default:
            return;
    }
    ajax.send();
}