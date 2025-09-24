// Récupération des différents éléments
const form = document.querySelector(".search__form");
const input = form.querySelector('input[type="search"]');
const resultsCounter = document.querySelector(".result__counter");
const resultsContainer = document.querySelector(".results");
const footerCopyrightYear = document.querySelector(".footer__text__year");

// Création de la variables data qui va stocker les données renvoyées par l'API
let data = [];

// Déclaration de la fonction fetchWikipedia qui va permettre d'obtenir les données d'un utilisateur
const fetchWikipedia = async (searchTerm) => {
  await fetch(
    `https://fr.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=50&srsearch=${encodeURIComponent(
      searchTerm
    )}`
  )
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      data = value;
      console.log(data);
      // Appel de la fonction displayResults
      displayResults(data.query.search);
    })
    .catch(function (error) {
      // Affichage d'un message d'erreur dans la console
      console.log("Désolé, une erreur est survenue sur le serveur.");
    });
};

// Déclaration de la fonction displayResult qui va permettre l'affichage des différents résultats
const displayResults = (results) => {
  resultsContainer.textContent = "";
  resultsCounter.textContent = `Nombre de résultat obtenu : ${results.length}`;
  results.forEach((result) => {
    // Ajout des éléments HTML et insertion dans le DOM
    const resultElement = document.createElement("div");
    resultElement.classList.add("result");
    resultElement.innerHTML = `

        <h2>${result.title}</h2>
        <p>${result.snippet}</p>
        <a href="https://fr.wikipedia.org/?curid=${result.pageid}" target="_blank">En savoir plus</a>
        `;
    resultsContainer.appendChild(resultElement);
  });
};

// Ecoute de l'événement submit sur le formulaire
form.addEventListener("submit", (e) => {
  // Empêcher la soumission du formulaire par défaut
  e.preventDefault();
  const searchTerm = input.value;
  if (searchTerm) {
    // Appel de la fonction fetchWikipedia
    fetchWikipedia(searchTerm);
  } else {
    // Affichage d'un message d'erreur
    alert("Veuillez saisir votre recherche !");
  }
});

// Déclaration de la fonction getCurrentYear qui va permettre l'affichage dynamique de l'année
const getCurrentYear = () => {
  // Récupération de la date actuelle stockée dans la constante date
  const date = new Date();
  //console.log(date);

  // Récupération de l'année stockée dans la constante year
  const year = date.getFullYear();
  //console.log(year);

  // Affichage dynamique de l'année en cours
  footerCopyrightYear.textContent = `${year}`;
};
// Appel de la fonction getCurrentYear()
getCurrentYear();
