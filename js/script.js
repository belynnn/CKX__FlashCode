let flashcards = [];
let currentIndex = 0;
let currentCategory = ''; // Catégorie en cours
let flashcardData = {}; // Variable pour stocker toutes les données JSON

// Récupérer le fichier JSON avec les flashcards
fetch('./data/flashcards.json')
  .then(response => response.json())
  .then(data => {
    flashcardData = data; // Stocker l'objet JSON dans flashcardData

    // Ajouter un gestionnaire d'événements pour les boutons de catégorie
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        currentCategory = button.getAttribute('data-category');
        flashcards = flashcardData[currentCategory].flashcards; // Utiliser flashcardData ici
        currentIndex = 0; // Remettre l'index à 0 quand on change de catégorie
        displayCard();
      });
    });

    // Définir la catégorie "POO" par défaut et afficher ses flashcards
    currentCategory = "POO"; // Catégorie par défaut
    flashcards = flashcardData[currentCategory].flashcards; // Charger les flashcards de la catégorie par défaut
    displayCard(); // Afficher la première carte de la catégorie par défaut
  });

// Fonction pour afficher la carte (question et réponse)
function displayCard() {
  if (flashcards.length > 0) {
    const card = flashcards[currentIndex];
    document.getElementById('id').textContent = `#${card.id} `; // Récupérer l'ID de la carte actuelle
    document.getElementById('titre').textContent = `< ${flashcardData[currentCategory].titre} />`;
    document.getElementById('question').textContent = card.question;
    document.getElementById('reponse').textContent = card.reponse;

    // Réinitialiser la carte à l'état "face avant" (masquer la réponse)
    document.getElementById('flashcard').classList.remove('flip');
    document.getElementById('reponse').style.display = 'none'; // Masquer la réponse avant de passer à la suivante
  }
}

// Événements pour retourner la carte et passer à la carte suivante
document.getElementById('flip-btn').addEventListener('click', () => {
  document.getElementById('flashcard').classList.toggle('flip');
  document.getElementById('reponse').style.display = 'block'; // Afficher la réponse lorsque la carte est retournée
});

document.getElementById('next-btn').addEventListener('click', () => {
  // Désactiver le bouton "Suivant" pour éviter les clics multiples
  document.getElementById('next-btn').disabled = true;

  // Masquer la réponse de la carte actuelle avant de passer à la suivante
  document.getElementById('reponse').style.display = 'none';

  // Passer à la carte suivante et afficher la nouvelle question
  currentIndex = (currentIndex + 1) % flashcards.length; // Passer à la suivante
  displayCard(); // Afficher la question suivante

  // Réactiver immédiatement le bouton
  document.getElementById('next-btn').disabled = false;
});

// Gérer la sélection dans le select
document.querySelector('.category-select').addEventListener('change', (e) => {
  const selectedCategory = e.target.value;
  changeCategory(selectedCategory);
});

// Gérer le clic sur les boutons
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedCategory = button.getAttribute('data-category');
    changeCategory(selectedCategory);
  });
});

// Fonction pour changer la catégorie
function changeCategory(selectedCategory) {
  currentCategory = selectedCategory;
  flashcards = flashcardData[currentCategory].flashcards; // Charger les flashcards pour la catégorie sélectionnée
  currentIndex = 0; // Remettre l'index à 0 pour la nouvelle catégorie
  displayCard();
}
