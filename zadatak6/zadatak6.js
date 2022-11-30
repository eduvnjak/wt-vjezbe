function oznaciUnosValidan(element) {
    element.classList.remove("nevalidan");
    element.classList.add("validan");
}

function oznaciUnosNevalidan(element) {
    element.classList.remove("validan");
    element.classList.add("nevalidan");
}
const greska = document.getElementById('greska');
// ili document.body.children[0]
const forma = document.getElementById('mfid');

function validacijaImena() {
    if (forma.ime.value.length > 10 || forma.ime.value.length < 3) {
        oznaciUnosNevalidan(forma.ime);
        if (greska.innerHTML.indexOf("Predugo/prekratko ime<br>") == -1) {
            greska.innerHTML += "Predugo/prekratko ime<br>";
        }
        return false;
    } else {
        oznaciUnosValidan(forma.ime);
        greska.innerHTML = greska.innerHTML.replace("Predugo/prekratko ime<br>", "");
        return true;
    }
}

function validacijaPrezimena() {
    if (forma.prezime.value.trim() == "") {
        if (greska.innerHTML.indexOf("Prezime nije unseseno<br>") == -1) {
            greska.innerHTML += "Prezime nije unseseno<br>";
        }
        oznaciUnosNevalidan(forma.prezime);
        return false;
    } else {
        oznaciUnosValidan(forma.prezime);
        greska.innerHTML = greska.innerHTML.replace("Prezime nije unseseno<br>", "");
        return true;
    }
}

function validacijaTelefona() {
    var telefonRegEx = /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{3})$/;
    if (!telefonRegEx.test(forma['telefon'].value)) {
        if (greska.innerHTML.indexOf("Telefon format: (061)-123-345 ili 061-123-456 ili 061123456<br>") == -1) {
            greska.innerHTML += "Telefon format: (061)-123-345 ili 061-123-456 ili 061123456<br>";
        }
        oznaciUnosNevalidan(forma['telefon']);
        return false;
    } else {
        oznaciUnosValidan(forma['telefon']);
        greska.innerHTML = greska.innerHTML.replace("Telefon format: (061)-123-345 ili 061-123-456 ili 061123456<br>", "");
        return true;
    }
}

function validacijaEmaila() {
    var emailRegEx = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/g;
    if (!emailRegEx.test(forma['email'].value)) {
        if (greska.innerHTML.indexOf("Email nevalidan!<br>") == -1) {
            greska.innerHTML += "Email nevalidan!<br>";
        }
        oznaciUnosNevalidan(forma['email']);
        return false;
    } else {
        oznaciUnosValidan(forma['email']);
        greska.innerHTML = greska.innerHTML.replace("Email nevalidan!<br>", "");
        return true;
    }
}

function validacijaPassworda() {
    if (forma.password.value == "") {
        if (greska.innerHTML.indexOf("Password nije unesen<br>") == -1) {
            greska.innerHTML += "Password nije unesen<br>";
        }
        oznaciUnosNevalidan(forma['password']);
        return false;
    } else {
        oznaciUnosValidan(forma['password']);
        greska.innerHTML = greska.innerHTML.replace("Password nije unesen<br>", "");
        return true;
    }
}

function validacijaPotvrdiPassword() {
    const potvrdiPassword = document.getElementById("potvrdi_password");
    if (forma.password.value != potvrdiPassword.value) {
        if (greska.innerHTML.indexOf("Passwordi se ne podudaraju<br>") == -1) {
            greska.innerHTML += "Passwordi se ne podudaraju<br>";
        }
        oznaciUnosNevalidan(potvrdiPassword);
        return false;
    } else {
        oznaciUnosValidan(potvrdiPassword);
        greska.innerHTML = greska.innerHTML.replace("Passwordi se ne podudaraju<br>", "");
        return true;
    }

}
forma.ime.addEventListener("blur", validacijaImena);
forma.prezime.addEventListener("blur", validacijaPrezimena);
forma.telefon.addEventListener("blur", validacijaTelefona);
forma.email.addEventListener("blur", validacijaEmaila);
forma.password.addEventListener("blur", validacijaPassworda);
document.getElementById("potvrdi_password").addEventListener("blur", validacijaPotvrdiPassword);

function provjeriFormu() {
    greska.innerHTML = "";
    var formaIspravna = true;

    formaIspravna = validacijaImena() &
        validacijaPrezimena() & validacijaTelefona() &
        validacijaEmaila() & validacijaPassworda() & validacijaPotvrdiPassword();

    if (!forma.sretan.checked) {
        greska.innerHTML += "Moraš biti sretan!<br>";
        formaIspravna = false;
    }

    var sel = forma.godina.options[forma.godina.selectedIndex].text;
    // vazan je i .value
    if (sel !== "Druga") {
        greska.innerHTML += "Moraš biti druga godina!<br>";
        formaIspravna = false;
    }
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