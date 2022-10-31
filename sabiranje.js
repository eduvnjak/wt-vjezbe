function sabiranje() {
    var a = parseInt(document.getElementById("sabirak1").value);
    var b = parseInt(document.getElementById("sabirak2").value);
    var c = a + b;
    document.getElementById("zbir").value = c;
}
var dugme = document.getElementById("dugme");
dugme.addEventListener("click", sabiranje);
