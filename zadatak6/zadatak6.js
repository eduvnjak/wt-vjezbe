function provjeriFormu() {
    var greska = document.getElementById('greska');
    // ili document.body.children[0]
    greska.innerHTML = ""; // ocistimo prethodne greske
    var formaIspravna = true;

    var forma = document.getElementById('mfid');
    if (forma.ime.value.length > 10 || forma.ime.value.length < 3) {
        forma.ime.classList.remove("validan");
        forma.ime.classList.add("nevalidan");
        greska.innerHTML += "Predugo/prekratko ime<br>";
        formaIspravna = false;
    } else {
        forma.ime.classList.remove("nevalidan");
        forma.ime.classList.add("validan");
    }

    if (forma.prezime.value.trim() == "") {
        greska.innerHTML += "Prezime nije unseseno<br>";
        formaIspravna = false;
        forma.prezime.classList.remove("validan");
        forma.prezime.classList.add("nevalidan");
    } else {
        forma.prezime.classList.remove("nevalidan");
        forma.prezime.classList.add("validan");
    }

    // Ovaj regex ukucajte u regex101.com za tumacenje:
    var telefonRegEx = /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{3})$/;
    if (!telefonRegEx.test(forma['telefon'].value)) {
        greska.innerHTML += "Telefon format: (061)-123-345 ili 061-123-456 ili 061123456<br>";
        formaIspravna = false;
        forma['telefon'].classList.add("nevalidan");
        forma['telefon'].classList.remove("validan");
    } else {
        forma['telefon'].classList.remove("nevalidan");
        forma['telefon'].classList.add("validan");
    }

    var emailRegEx = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/g;
    if (!emailRegEx.test(forma['email'].value)) {
        greska.innerHTML += "Email nevalidan!<br>";
        formaIspravna = false;
        forma['email'].classList.add("nevalidan");
        forma['email'].classList.remove("validan");
    } else {
        forma['email'].classList.remove("nevalidan");
        forma['email'].classList.add("validan");
    }

    if (forma.password.value == "") {
        greska.innerHTML += "Password nije unesen<br>";
        formaIspravna = false;
        forma['password'].classList.add("nevalidan");
        forma['password'].classList.remove("validan");
    } else {
        forma['password'].classList.remove("nevalidan");
        forma['password'].classList.add("validan");
    }

    const potvrdiPassword = document.getElementById("potvrdi_password");
    if (forma.password.value != potvrdiPassword.value) {
        greska.innerHTML += "Passwordi se ne podudaraju<br>";
        formaIspravna = false;
        potvrdiPassword.classList.add("nevalidan");
        potvrdiPassword.classList.remove("validan");
    } else {
        potvrdiPassword.classList.remove("nevalidan");
        potvrdiPassword.classList.add("validan");
    }

    if (!forma.sretan.checked) {
        greska.innerHTML += "Moraš biti sretan!<br>";
        formaIspravna = false;
    }

    var sel = forma.godina.options[forma.godina.selectedIndex].text;
    // vazan je i .value
    if (sel !== "Druga") {
        greska.innerHTML += "Moraš biti druga godina!";
        formaIspravna = false;
    }
    console.log(formaIspravna);
    return formaIspravna;
}

document.getElementById("mfid").addEventListener("submit",
    (event) => {
        if (!provjeriFormu()) {
            event.preventDefault();
        }
    }, false);

document.getElementById("stela").addEventListener("click", function (ev) {
    document.forms.mojaforma.submit();
}, false);