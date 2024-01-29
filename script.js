// Déclaration de la variable data
var data;

// Attente du chargement du DOM avant d'exécuter le code et utilisation de Fetch pour récupérer les données depuis le fichier "data.json"
document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json").then(function (response) {
    response.json().then(function (datajson) {
      console.log(data);

      // Attribution des données récupérées à la variable 'data'
      data = datajson;

      // Création des éléments du portrait
      var liste = document.querySelector(".liste-analogies");

      // Boucle à travers les données pour créer les éléments du portrait
      data.forEach(function (element, numCase) {

      // Création d'un élément conteneur pour chaque paire texte-image
      var elementContainer = document.createElement("section");
      elementContainer.classList.add("element");

      // Injection du HTML avec les données de chaque élément
      elementContainer.innerHTML = `
      <h2> Si j'étais ${element.analogies}, je serais ${element.valeurAnalogies} </h2>
      <img class='imagesAnalogie' src='${element.Image}' alt='${element.analogies} Image'>
      <p class='element-texte'>${element.texte}</p> 
      `;

         // Ajout du conteneur à la liste
         liste.appendChild(elementContainer);
        });
      });
  
    // Rubrique "Mentions Légales"
    const legalNotice = document.getElementById('legalNotice');
    const legalContent = document.getElementById('legalContent');
  
    legalContent.style.display = 'none';

    // Ajout d'un gestionnaire d'événement pour afficher/masquer le contenu des "Mentions Légales"
    legalNotice.addEventListener('click', function () {
      if (legalContent.style.display === 'block') {
        legalContent.style.display = 'none';
      } else {
        legalContent.style.display = 'block';
      }
    });
  
    // Détecteur de clavier de modification du formulaire
    document.querySelector('form').addEventListener('input', function (event) {
      console.log(event.target.value);
    });

    // Construction de l'URL pour l'envoi des données via fetch/
    var mailupem = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=alyssa.karahan&courriel=alyssa.karahan@univ-eiffel.fr=Si j'étais " + document.querySelector("#mail").value + " je serais " + document.querySelector("#analogies").value + " texte " + document.querySelector("#valeurAnalogies").value;

    // Utilisation de fetch pour envoyer des données à une API
    fetch(mailupem).then(function (response) {
      response.json().then(function (data) {
          // Traitement de la réponse JSON de l'API
          if (data.status == "success") {
              document.querySelector("#messageApresEnvoi").innerHTML = "Votre message a bien été reçu";
          } else {
              document.querySelector("#messageApresEnvoi").innerHTML = "Problème : votre message n'a pas été reçu";
        }
      });
    })
    .catch(function(error) {
      console.log("Erreur lors de l'envoi des données :", error);
      document.querySelector("#message").innerHTML = "Erreur lors de l'envoi des données.";
    });
  
  // Détecteur de changement dans le formulaire
  document.querySelector("#valeurAnalogies").addEventListener("input", function() {

    var nouvelleValeur = document.querySelector("#valeurAnalogies").value;
    console.log("Nouvelle valeur de #valeurAnalogies :", nouvelleValeur);

});
});
});
