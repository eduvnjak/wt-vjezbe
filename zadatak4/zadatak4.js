function zamijeni() {
    var kod = textArea.value;
    const re = /for\s*\((.*?);\s*(.*?);\s*(.*)\)(?:\s*{(?:\n*|\r*))((?:.|\n|\r)*?)}/g;
    kod = kod.replace(re,"$1;\nwhile($2) {\n$4$3;\n}")
    textArea.value = kod;
}
const button = document.getElementById("button");
const textArea = document.getElementById("text_area");
button.addEventListener("click", zamijeni)