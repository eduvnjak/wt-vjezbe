var string = ""
string += "<table>";
for (var i = 0; i < 11; i++) {
    string += "<tr>"
    if (i == 0) {
        for (var j = 0; j < 11; j++) {
            string += "<th>";
            if (j == 0) {
                string += "X";
            } else {
                string += j;
            }
            string += "</th>";
        }
    } else {
        for (var j = 0; j < 11; j++) {
            if (j == 0) {
                string += `<th>${i}</th>`;
            } else {
                string += `<td>${i * j}</td>`;
            }
        }
    }
    string += "</tr>";
}
string += "</table>";
document.write(string);