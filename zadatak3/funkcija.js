function ulazValidan(input) {
    const re = /^([+-]?((x(\^\d+)?)|((\d+)(x(\^\d+)?)?)))+$/g;
    return (input.match(re) !== null)
}
function obradiUlaz(input) {
    const re = /([+-]?((x(\^\d+)?)|((\d+)(x(\^\d+)?)?)))/g;
    return input.match(re);
}
function obradiMonom(input) {
    var monom = {
        pozitivanPredznak: true,
        koeficijent: 0,
        eksponent: 0
    };
    if (input[0] == '-') {
        monom.pozitivanPredznak = false;
    }
    if (input[0] == '-' || input[0] == '+') {
        input = input.substring(1);
    }
    //console.log(element);
    var pozicijaX = input.indexOf("x");
    if (pozicijaX != 0) {
        if (pozicijaX != -1) {
            monom.koeficijent = parseInt(input.substring(0, pozicijaX));
        } else {
            monom.koeficijent = parseInt(input.substring(0, input.length))
        }
    } else {
        monom.koeficijent = 1;
    }
    if (pozicijaX != -1) {
        var pozicijaStepen = input.indexOf("^");
        if (pozicijaStepen != -1) {
            monom.eksponent = parseInt(input.substring(pozicijaStepen + 1, input.length))
        } else {
            monom.eksponent = 1;
        }
    }
    return monom;
}
function dajMonom(pozitivanPredznak, koeficijent, eksponent) {
    if (pozitivanPredznak) {
        return function (x) {
            return koeficijent * (x ** eksponent);
        };
    } else {
        return function (x) {
            return -koeficijent * (x ** eksponent);
        };
    }
}
function napraviNizFunkcija(obradjenUlaz) {
    var funkcije = [];
    obradjenUlaz.forEach(element => {
        var monomObjekat = obradiMonom(element);
        var monomFunkcija = dajMonom(monomObjekat.pozitivanPredznak, monomObjekat.koeficijent, monomObjekat.eksponent);
        // console.log(funkcija(1));
        // console.log(f(1));
        funkcije.push(monomFunkcija);
    });
    return funkcije;
}
function napraviFunkcijuOdNizaFunkcija(nizFunkcija) {
    return function (x) {
        var suma = 0;
        nizFunkcija.forEach(element => { suma += element(x); });
        return suma;
    };
}
function crtaj() {
    var input = document.getElementById("funkcija").value
    if (!ulazValidan(input)) {
        alert("Unos neispravan");
        return;
    }
    var obradjenUlaz = obradiUlaz(input)
    console.log(obradjenUlaz);
    var nizFunkcija = napraviNizFunkcija(obradjenUlaz);
    const funkcija = napraviFunkcijuOdNizaFunkcija(nizFunkcija);
    //console.log(funkcija(1.1));
    /* var sum = 0;
    nizFunkcija.forEach(funkcija => {
        sum += funkcija(1);
    });
    console.log(sum); */
    const canvas = document.getElementById("slika");
    const context = canvas.getContext("2d");
    context.moveTo(0, -funkcija(-10) * 50 + 250);
    for (let x = -10; x <= 10; x += (10 / 500)) {
        context.lineTo(x * 50 + 250, -funkcija(x) * 50 + 250);
    }
    context.stroke();
}
var dugmeCrtaj = document.getElementById("dugme");
dugmeCrtaj.addEventListener("click", crtaj);


