let flashcards = []; // Tableau pour stocker les flashcards de la catégorie sélectionnée
let currentIndex = 0; // Index de la carte actuelle
let currentCategory = ''; // Catégorie sélectionnée
let flashcardData = {}; // Objet contenant toutes les données du fichier JSON

// ✅ Charger les données depuis le fichier JSON
fetch('./data/flashcards.json')
  .then(response => response.json())
  .then(data => {
    flashcardData = data; // Stocker les données JSON dans flashcardData
    // ✅ GESTION DE LA DROPDOWN PERSONNALISÉE
    // Ajouter un écouteur d'événement pour chaque <li> dans le menu déroulant
    document.querySelectorAll('.dropdown-menu li').forEach(item => {
      item.addEventListener('click', (e) => {
        const selectedCategory = e.target.getAttribute('data-category'); // Récupère la valeur de la catégorie
        document.querySelector('.dropdown-toggle').textContent = `${selectedCategory} ⏷`; // Met à jour le bouton visible
        changeCategory(selectedCategory); // Charge les nouvelles flashcards
        document.querySelector('.custom-dropdown').classList.remove('open'); // Ferme le menu déroulant
      });
    });
    // ✅ Gérer le clic sur le bouton principal pour ouvrir/fermer le menu
    document.querySelector('.dropdown-toggle').addEventListener('click', () => {
      document.querySelector('.custom-dropdown').classList.toggle('open'); // Alterne l'état du menu
    });
    // ✅ Fermer le menu si on clique en dehors de celui-ci
    document.addEventListener('click', (e) => {
      if (!document.querySelector('.custom-dropdown').contains(e.target)) {
        document.querySelector('.custom-dropdown').classList.remove('open');
      }
    });
    // ✅ Initialisation avec la catégorie par défaut ("POO")
    currentCategory = "POO";
    flashcards = flashcardData[currentCategory].flashcards;
    displayCard(); // Affiche la première carte
  });

/**
 * 👀 Affiche la carte actuelle (question + réponse masquée)
 */
function displayCard() {
  if (flashcards.length > 0) {
    const card = flashcards[currentIndex];
    // ✅ Affichage des données dans le DOM
    document.getElementById('id').textContent = `#${card.id} `;
    document.getElementById('titre').textContent = `< ${flashcardData[currentCategory].titre} />`;
    document.getElementById('question').textContent = card.question;
    document.getElementById('reponse').textContent = card.reponse;
    // ✅ Remettre l'état de la carte (face avant, réponse masquée)
    document.getElementById('flashcard').classList.remove('flip');
    document.getElementById('reponse').style.display = 'none';
  }
}

// ✅ Inverse la carte (affiche la réponse)
document.getElementById('flip-btn').addEventListener('click', () => {
  document.getElementById('flashcard').classList.toggle('flip');
  document.getElementById('reponse').style.display = 'block';
});
// ✅ Passe à la carte suivante (avec protection contre les clics rapides)
document.getElementById('next-btn').addEventListener('click', () => {
  const nextBtn = document.getElementById('next-btn');
  // Si le bouton est déjà désactivé, on ne fait rien
  if (nextBtn.disabled) return;
  nextBtn.disabled = true; // Désactive le bouton temporairement
  document.getElementById('reponse').style.display = 'none'; // Masque la réponse
  currentIndex = (currentIndex + 1) % flashcards.length; // Prochaine carte
  displayCard(); // Affiche la nouvelle
  // ✅ Réactive le bouton après un petit délai (ex: 500 ms)
  setTimeout(() => {
    nextBtn.disabled = false;
  }, 500);
});

/**
 * 🔁 Change la catégorie de flashcards
 * @param {string} selectedCategory - La nouvelle catégorie sélectionnée
 */
function changeCategory(selectedCategory) {
  currentCategory = selectedCategory;
  flashcards = flashcardData[currentCategory].flashcards; // Charger les flashcards de la nouvelle catégorie
  currentIndex = 0; // Revenir à la première carte
  displayCard(); // Afficher la nouvelle carte
}

// ✅ Protection e-mail anti-spam pour les bots "simple"
// Crée dynamiquement un lien mailto dans la page
document.addEventListener('DOMContentLoaded', () => {
  const emailLink = document.getElementById('email-link');
  if (emailLink) {
    const parts = ["de", "bo", "ra", "hc", "le", "rc", "kx", "@g", "ma", "il", ".c", "om"];
    const email = parts.join('');
    emailLink.setAttribute('href', `mailto:${email}`);
    // ✅ On insère le SVG dans le lien avec innerHTML
    emailLink.innerHTML = `<svg class="icon-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="presentation" aria-hidden="true"><path d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256l0 32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32l0 80 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/></svg>`;
  }
});