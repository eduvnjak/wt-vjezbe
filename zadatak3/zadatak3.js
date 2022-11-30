function zamijeni() {
    var kod = textArea.value;
    var regex_drugi = /\<.+?\>/g; //regex asistentov sa vjezbi
    kod = kod.replaceAll(/\s*?<.+?>\s*?/g,"").replaceAll(/&amp;/g,"&").replaceAll(/&nbsp;/g," ").replaceAll(/&quot;/g,'"');
    textArea.value = kod;
}
const button = document.getElementById("button");
const textArea = document.getElementById("text_area");
button.addEventListener("click", zamijeni)