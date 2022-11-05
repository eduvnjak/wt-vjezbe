
var divs = document.getElementsByClassName("zatvoren_meni");
for (let index = 0; index < divs.length; index++) {
    const element = divs[index];
    element.addEventListener("click", function () {
        this.classList.toggle("otvoren_meni");
        this.classList.toggle("zatvoren_meni");
    });
}