document.write("<table>");
for (var i = 0; i < 11; i++) {
    document.write("<tr>");
    if (i == 0) {
        for (var j = 0; j < 11; j++) {
            document.write("<th>");
            if (j == 0) {
                document.write("X");
            } else {
                document.write(j);
            }
            document.write("</th>");
        }
    } else {
        for (var j = 0; j < 11; j++) {
            if (j == 0) {
                document.write("<th>" + i + "</th>");
            } else {
                document.write("<td>" + i * j + "</td>");
            }
        }
    }
    document.write("</tr>")
}
document.write("</table>");