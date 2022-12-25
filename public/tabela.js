function deleteKontakt(id) {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            // document.getElementById("status").innerHTML = "Red dodan u bazu";
            window.location.reload();
        } else if (ajax.readyState == 4) {
            alert((JSON.parse(ajax.response)).message);
        }
    }

    ajax.open("DELETE", `/imenik/${id}`, true);
    ajax.send();
}
function prikaziPoznanike(id) {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            // document.getElementById("status").innerHTML = "Red dodan u bazu";
            window.location.reload();
        } else if (ajax.readyState == 4) {
            alert((JSON.parse(ajax.response)).message);
        }
    }

    ajax.open("GET", `/poznanik/${id}`, true);
    ajax.send();
}