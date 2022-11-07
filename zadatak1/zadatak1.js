
var divs = document.getElementsByClassName("meni");
for (let index = 0; index < divs.length; index++) {
    const element = divs[index];
    element.getElementsByClassName("godina")[0].addEventListener("click", function () {
        element.classList.toggle("meni");
    });
}