const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");
const darkModeToggle = document.getElementById("dark-mode-toggle");



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
    if (navMenu.classList.contains("hidden")) {
        navMenu.classList.remove("hidden");
        navMenu.classList.add("visible");
        menuBtn.innerHTML = "✖";
    } else {
        navMenu.classList.add("hidden");
        navMenu.classList.remove("visible");
        menuBtn.innerHTML = "☰";
    }
});
menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("active"); 
});
document.addEventListener("click", function (event) {
    if (!menuBtn.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.add("hidden");
    }
});
window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        document.querySelector("header").classList.add("scrolled");
    } else {
        document.querySelector("header").classList.remove("scrolled");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    
    if (!darkModeToggle) {
        console.error("Bouton dark mode introuvable !");
        return;
    }

    // Vérifier si le mode sombre est déjà activé
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark");
        darkModeToggle.textContent = "☀️";
    }

    // Gérer le clic sur le bouton
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        // Changer l'icône
        if (document.body.classList.contains("dark")) {
            darkModeToggle.textContent = "☀️";
            localStorage.setItem("darkMode", "enabled");
        } else {
            darkModeToggle.textContent = "🌙";
            localStorage.setItem("darkMode", "disabled");
        }
    });
});

// Vérifie si l'utilisateur avait activé le mode sombre avant
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
}


darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

   
    if (document.body.classList.contains("dark")) {
        darkModeToggle.textContent = "☀️";
        localStorage.setItem("darkMode", "enabled");
    } else {
        darkModeToggle.textContent = "🌙";
        localStorage.setItem("darkMode", "disabled");
    }
});
// Lire la suite
let reduire = document.querySelectorAll(".reduire");
let read = document.querySelectorAll(".read-more");

// Parcourt tous les textes à raccourcir
reduire.forEach((element, index) => {
    if (element.textContent.length > 200) {
        element.dataset.fullText = element.textContent; // Sauvegarde du texte complet
        element.textContent = element.textContent.substring(0, 200) + "...";
    }
});

// Ajoute un événement à chaque bouton "Lire la suite"
read.forEach((button, index) => {
    button.addEventListener("click", function() {
        let targetText = reduire[index]; // L'élément texte correspondant
        
        if (targetText.textContent.length <= 203) {
            targetText.textContent = targetText.dataset.fullText;
            button.textContent = "Réduire";
        } else {
            targetText.textContent = targetText.dataset.fullText.substring(0, 200) + "...";
            button.textContent = "Lire la suite";
        }
    });
});

// Nombre de vue
const vueCompteur = document.getElementById("vue-compteur");


let nombreDeVues = localStorage.getItem("nombreDeVues") || 0;


nombreDeVues++;
localStorage.setItem("nombreDeVues", nombreDeVues);


vueCompteur.textContent = nombreDeVues;

// Nombre de likes par article
const likeButtons = document.querySelectorAll(".like-btn");
const likeCompteurs = document.querySelectorAll(".like-compteur");


likeButtons.forEach((button, index) => {
    
    let compteur = likeCompteurs[index];

    
    let nombreDeLikes = localStorage.getItem(`likes-article-${index}`) || 0;
    compteur.textContent = nombreDeLikes; 

    
    button.addEventListener("click", function () {
        nombreDeLikes++;
        localStorage.setItem(`likes-article-${index}`, nombreDeLikes); 
        compteur.textContent = nombreDeLikes; 
    });
});

