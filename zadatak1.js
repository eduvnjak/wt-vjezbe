var odgovor = prompt("Unesi neki tekst");
if (odgovor != null && odgovor != "") {
	alert(odgovor.split("").reverse().join(''));
}