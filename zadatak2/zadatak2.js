function pomjeri() {
    const element = document.getElementById("loptica");
    // console.log(parseInt(getComputedStyle(element).left));
    const trenutnoX = parseInt(getComputedStyle(element).left);
    const trenutnoY = parseInt(getComputedStyle(element).top);
    if (desno) {
        if (trenutnoX != 150) {
            element.style.left = trenutnoX + 3 + "px";
        }
        if (trenutnoX == 150) {
            desno = false;
        }
    } else {
        if (trenutnoX != 0) {
            element.style.left = trenutnoX - 3 + "px";
        }
        if (trenutnoX == 0) {
            desno = true;
        }
    }
    if (gore) {
        if (trenutnoY != 0) {
            element.style.top = trenutnoY - 3 + "px";
        }
        if (trenutnoY == 0) {
            gore = false;
        }
    } else {
        if (trenutnoY != 150) {
            element.style.top = trenutnoY + 3 + "px";
        }
        if (trenutnoY == 150) {
            gore = true;
        }
    }
}
var desno = true;
var gore = true;
setInterval(pomjeri, 20)