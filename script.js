const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");


document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth < 768) {
        navMenu.classList.add("hidden");
    }
});


window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
        navMenu.classList.remove("hidden");
    } else {
        navMenu.classList.add("hidden");
    }
});


menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("hidden");
});
