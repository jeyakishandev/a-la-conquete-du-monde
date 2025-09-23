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
const darkModeBtn = document.getElementById("dark-mode-btn");

// Vérifie si l'utilisateur avait déjà activé le mode sombre
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeBtn.textContent = "☀️"; // Soleil pour indiquer le mode clair
}

// Gestion du clic sur le bouton
darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        darkModeBtn.textContent = "☀️"; // Icône soleil pour désactiver
    } else {
        localStorage.setItem("darkMode", "disabled");
        darkModeBtn.textContent = "🌙"; // Icône lune pour activer
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

// Sélection de la barre de recherche et des articles
const searchBar = document.getElementById("search-bar");
const articles = document.querySelectorAll(".article-card");

// Écouteur d'événement sur la barre de recherche
searchBar.addEventListener("input", function () {
    const searchText = searchBar.value.toLowerCase(); // Récupère et met en minuscule l'entrée utilisateur

    articles.forEach(article => {
        const title = article.querySelector("h2").textContent.toLowerCase(); // Récupère le titre de l'article
        const description = article.querySelector("p").textContent.toLowerCase(); // Récupère la description
        
        // Recherche dans le titre ET la description
        if (title.includes(searchText) || description.includes(searchText)) {
            article.style.display = "block"; // Affiche l'article si le texte est trouvé
        } else {
            article.style.display = "none"; // Cache l'article sinon
        }
    });
    
    // Réinitialiser la pagination après recherche
    currentPage = 1;
    showPage(currentPage);
    updatePagination();
});

// Pagination
const articlesPerPage = 3;
let currentPage = 1;
const totalPages = Math.ceil(articles.length / articlesPerPage);

// Fonction pour afficher les articles de la page courante
function showPage(page) {
    articles.forEach((article, index) => {
        const startIndex = (page - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        
        if (index >= startIndex && index < endIndex) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
}

// Fonction pour mettre à jour les boutons de pagination
function updatePagination() {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const pageNumbers = document.getElementById("page-numbers");
    
    // Boutons précédent/suivant
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Numéros de page
    pageNumbers.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.textContent = i;
        pageBtn.className = `px-3 py-2 rounded-lg ${
            i === currentPage 
                ? "bg-orange-500 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`;
        pageBtn.addEventListener("click", () => {
            currentPage = i;
            showPage(currentPage);
            updatePagination();
        });
        pageNumbers.appendChild(pageBtn);
    }
}

// Événements des boutons
document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updatePagination();
    }
});

document.getElementById("next-btn").addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        updatePagination();
    }
});

// Initialisation
showPage(currentPage);
updatePagination();

// Améliorations mobile
function handleMobileOptimizations() {
    // Optimisation de la barre de recherche sur mobile
    const searchBar = document.getElementById("search-bar");
    if (window.innerWidth <= 768) {
        searchBar.addEventListener("focus", function() {
            // Scroll vers la barre de recherche pour éviter le clavier virtuel
            setTimeout(() => {
                searchBar.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 300);
        });
    }
    
    // Amélioration des boutons de pagination sur mobile
    const paginationBtns = document.querySelectorAll(".pagination-btn");
    paginationBtns.forEach(btn => {
        btn.addEventListener("touchstart", function() {
            this.style.transform = "scale(0.95)";
        });
        btn.addEventListener("touchend", function() {
            this.style.transform = "scale(1)";
        });
    });
}

// Détection du changement de taille d'écran
window.addEventListener("resize", function() {
    handleMobileOptimizations();
});

// Initialisation des optimisations mobile
handleMobileOptimizations();

// Filtres par catégorie
const categoryBtns = document.querySelectorAll(".category-btn");

categoryBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        // Retirer la classe active de tous les boutons
        categoryBtns.forEach(b => {
            b.classList.remove("active", "bg-orange-500", "text-white");
            b.classList.add("bg-gray-200", "text-gray-700");
        });
        
        // Ajouter la classe active au bouton cliqué
        this.classList.add("active", "bg-orange-500", "text-white");
        this.classList.remove("bg-gray-200", "text-gray-700");
        
        // Filtrer les articles
        const selectedCategory = this.dataset.category;
        filterArticlesByCategory(selectedCategory);
    });
});

// Fonction pour filtrer les articles par catégorie
function filterArticlesByCategory(category) {
    articles.forEach(article => {
        if (category === "all" || article.dataset.category === category) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
    
    // Réinitialiser la pagination après filtrage
    currentPage = 1;
    showPage(currentPage);
    updatePagination();
}

// Système de favoris
const favoriteBtns = document.querySelectorAll(".favorite-btn");

// Initialiser les favoris au chargement
function initializeFavorites() {
    favoriteBtns.forEach((btn, index) => {
        const isFavorite = localStorage.getItem(`favorite-${index}`) === "true";
        updateFavoriteButton(btn, isFavorite);
    });
}

// Mettre à jour l'apparence du bouton favoris
function updateFavoriteButton(btn, isFavorite) {
    if (isFavorite) {
        btn.classList.remove("bg-gray-200", "text-gray-700");
        btn.classList.add("bg-yellow-400", "text-yellow-900");
        btn.textContent = "⭐ Favori";
    } else {
        btn.classList.remove("bg-yellow-400", "text-yellow-900");
        btn.classList.add("bg-gray-200", "text-gray-700");
        btn.textContent = "⭐ Favoris";
    }
}

// Gestion des clics sur les boutons favoris
favoriteBtns.forEach((btn, index) => {
    btn.addEventListener("click", function() {
        const isCurrentlyFavorite = localStorage.getItem(`favorite-${index}`) === "true";
        const newFavoriteState = !isCurrentlyFavorite;
        
        localStorage.setItem(`favorite-${index}`, newFavoriteState.toString());
        updateFavoriteButton(btn, newFavoriteState);
    });
});

// Initialisation des favoris
initializeFavorites();

// Compteur de favoris
function updateFavoritesCount() {
    let favoritesCount = 0;
    favoriteBtns.forEach((btn, index) => {
        if (localStorage.getItem(`favorite-${index}`) === "true") {
            favoritesCount++;
        }
    });
    document.getElementById("favorites-count").textContent = favoritesCount;
}

// Bouton pour afficher/masquer les favoris
document.getElementById("favorites-btn").addEventListener("click", function() {
    const articles = document.querySelectorAll(".article-card");
    
    articles.forEach((article, index) => {
        const isFavorite = localStorage.getItem(`favorite-${index}`) === "true";
        if (isFavorite) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
    
    // Réinitialiser la pagination
    currentPage = 1;
    showPage(currentPage);
    updatePagination();
});

// Mettre à jour le compteur de favoris
updateFavoritesCount();

// Optimisation des images
function optimizeImages() {
    const images = document.querySelectorAll('.article-card img');
    
    images.forEach(img => {
        // Ajouter la classe loading
        img.classList.add('loading');
        
        // Gérer le chargement
        img.addEventListener('load', function() {
            this.classList.remove('loading');
            this.classList.add('loaded');
        });
        
        // Gérer les erreurs
        img.addEventListener('error', function() {
            this.classList.remove('loading');
            this.style.display = 'none';
        });
    });
}

// Initialisation de l'optimisation des images
optimizeImages();

// Système de commentaires
const toggleCommentsBtns = document.querySelectorAll(".toggle-comments");
const addCommentBtns = document.querySelectorAll(".add-comment");

// Gestion des boutons d'affichage des commentaires
toggleCommentsBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        const articleIndex = this.dataset.article;
        const commentsList = this.closest('.comments-section').querySelector('.comments-list');
        const isHidden = commentsList.classList.contains('hidden');
        
        if (isHidden) {
            commentsList.classList.remove('hidden');
            this.textContent = 'Masquer';
        } else {
            commentsList.classList.add('hidden');
            this.textContent = 'Afficher';
        }
    });
});

// Gestion de l'ajout de commentaires
addCommentBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        const commentForm = this.closest('.comment-form');
        const nameInput = commentForm.querySelector('input[type="text"]');
        const commentTextarea = commentForm.querySelector('textarea');
        const commentsDisplay = commentForm.nextElementSibling;
        
        const name = nameInput.value.trim();
        const comment = commentTextarea.value.trim();
        
        if (name && comment) {
            // Créer le commentaire
            const commentElement = document.createElement('div');
            commentElement.className = 'comment bg-gray-50 p-3 rounded mb-2 text-sm';
            commentElement.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <strong class="text-orange-600">${name}</strong>
                        <p class="mt-1">${comment}</p>
                    </div>
                    <span class="text-xs text-gray-500">${new Date().toLocaleDateString()}</span>
                </div>
            `;
            
            commentsDisplay.appendChild(commentElement);
            
            // Vider le formulaire
            nameInput.value = '';
            commentTextarea.value = '';
            
            // Mettre à jour le compteur
            const commentCount = this.closest('.comments-section').querySelector('.comment-count');
            const currentCount = parseInt(commentCount.textContent);
            commentCount.textContent = currentCount + 1;
        }
    });
});

// Système de partage
const shareBtns = document.querySelectorAll(".share-btn");

shareBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        const platform = this.dataset.platform;
        const article = this.closest('.article-card');
        const title = article.querySelector('h2').textContent;
        const url = window.location.href;
        
        let shareUrl = '';
        
        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    });
});

// Système de notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

