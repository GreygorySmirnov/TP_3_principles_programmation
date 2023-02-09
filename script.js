const formulaire = document.getElementById("parametres-creation")
formulaire.addEventListener("submit", gererSoumission)
let nombrePaire = 0;
formulaire = document.getElementById("formulaire").addEventListener("submit", function(e) {validerFormulaire(e);});
let startBtn = document.getElementById("start-btn")
const jeu = document.getElementById("jeu")
const urlCarte = "images/etoile.jpg"
let carte1 = null
let carte2 = null

function validerFormulaire(e){
    let nombrePaire = 0;
    let nom = ""
    let prenom = ""
    nombrePaire = document.getElementById("nombrePaire").value;
    
    let erreurDetectee = false;
    if(nombrePaire > 10 || nombrePaire < 2 ){
        document.getElementById("erreur-nombrePaire").textContent = "Vous devez choisir un nombre de paire valide.";
        erreurDetectee = true; 
        e.preventDefault();
    }
    else{
        
        document.getElementById("erreur-nombrePaire").textContent = "";

    }

    if(nom == "" || nom == NaN || nom != "^[A-Za-z0-9]"){
        document.getElementById("erreur-nom").textContent = "Vous devez saisir un nom valide.";
        erreurDetectee = true;
        e.preventDefault();
    }
    else{
        
        document.getElementById("erreur-nom").textContent = "";

    }

    if(prenom == "" || prenom == NaN || prenom != "^[A-Za-z0-9]"){
        document.getElementById("erreur-prenom").textContent = "Vous devez saisir un prenom valide.";
        erreurDetectee = true;
        e.preventDefault();
    }
    else{
        
        document.getElementById("erreur-prenom").textContent = "";

}
};



function gererSoumission(e){
    e.preventDefault()
    const nbCartes = document.getElementById("nb-cartes").value
    if(nbCartes < 2 || nbCartes > 10){
        alert("vous devez entrer un chiffre entre 2 et 10")
    }else{
        formulaire.remove()
        creerCartes(nbCartes)
    }
}

function creerCartes(nbCartes){
    for(let i = 0; i < nbCartes; i++){
        creerCarte(i)
        creerCarte(i)
    }
}

function creerCarte(numero){
        const carte = document.createElement("button")
        const imageCarte = document.createElement("img")
        imageCarte.src = urlCarte
        carte.appendChild(imageCarte)
        carte.classList.add("btn")
        carte.classList.add("btn-info")
        carte.classList.add("p-5")
        carte.setAttribute("data-num", numero)
        carte.addEventListener("click", gereClicCarte)
        jeu.appendChild(carte)
}

function gereClicCarte(e){
    const numeroCarte = e.target.getAttribute("data-num")
    if(!carte1){
        carte1 = e.target
        e.target.textContent = numeroCarte
    }else{
        carte2 = e.target
        e.target.textContent = numeroCarte
        if(carte1==carte1 && carte2==carte2 && duration != 0){
            alert("Vous avez gagné")
        }
        else{ 
            alert("Vous avez perdu")
        }

        //si deux cartes pareilles
            //si fin --> gagné
            // sinon
        //retourner cartes
        // vider carte1 et carte2 en mettant null
    }
}

// timer commence avec le bouton commencer
const startButton = document.getElementById("start-button");
const timerDisplay = document.getElementById("timer");

// temps en secondes
let duration = 300;

startButton.addEventListener("click", function() {
  // demarrer le timer
  let intervalId = setInterval(function() {
    duration--;
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;

    // compteur en minutes et secondes
    timerDisplay.innerHTML = minutes + " minutes " + seconds + " seconds";

    // si le timer arrive à 0 on arrête le compteur
    if (duration === 0) {
      clearInterval(intervalId);
      timerDisplay.innerHTML = "Time's up!";
    }
  }, 1000);
});

if (duration != 0 && carte1==carte1 && carte2==carte2) {
    clearInterval(intervalId)
    alert("Vous avez gagne")
    
}
