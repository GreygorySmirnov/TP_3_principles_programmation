let nombrePaire = 0;
let nombrePaireRetournee = 0;
let formulaire = document.getElementById("formulaire")
let jeu = document.getElementById("jeu");

let carte1 = null;
let carte2 = null;

let cartes = [];

formulaire.addEventListener("submit", validerFormulaire);
jeu.hidden = true;

function validerFormulaire(e){
    e.preventDefault();
    e.target == formulaire;
    let nom = document.getElementById("txtNom").value;
    nombrePaire = document.getElementById("nombrePaire").value;
    
    let regNom = /^[A-Za-z]{1,}$/;
    
    let erreurDetectee = false;
    if(nombrePaire > 10 || nombrePaire < 2 ){
        document.getElementById("erreur-nombrePaire").textContent = "Vous devez choisir un nombre de paire valide.";
        erreurDetectee = true; 
        e.preventDefault();
    }
    else{
        document.getElementById("erreur-nombrePaire").textContent = "";
    }
    
    if(regNom.test(nom) == false){
        document.getElementById("erreur-nom").textContent = "Vous devez saisir un nom valide.";
        erreurDetectee = true;
        e.preventDefault();
    }
    else{
        document.getElementById("erreur-nom").textContent = "";
    }
    
    if(erreurDetectee == false){
        formulaire.hidden = true;
        jeu.hidden = false;
        
        creerJeu(nombrePaire);
    }
}

function creerJeu(nombrePaire){
    for (let index = 0; index < nombrePaire; index++) {
        CreerCarte(index);
        CreerCarte(index);
    }
    melangerCartes();
}
function melangerCartes() {
    let indexActuel = cartes.length,
        aleatoireIndex,
        temporaire;
    
    while (0 !== indexActuel) {
        aleatoireIndex = Math.floor(Math.random() * indexActuel);
        indexActuel -= 1;

        temporaire = cartes[indexActuel];
        cartes[indexActuel] = cartes[aleatoireIndex];
        cartes[aleatoireIndex] = temporaire;
    }
}

function CreerCarte(numeroCarte){
    const carte = document.createElement("button");
    carte.style.width = "100px";
    carte.style.height = "100px";
    
    carte.setAttribute("id-carte", cartes.length);
    carte.setAttribute("numero-carte", numeroCarte);
    carte.addEventListener("click", function(e) {retournerCarte(e);});
    
    let carteObjet = {
        idCarte: cartes.length,
        numeroCarte: numeroCarte,
        carteHTML: carte,
        retourne: false,
        retournerCarte(){
            if(this.retourne == false){
                this.carteHTML.textContent = this.numeroCarte;
                this.retourne = true;
            }
            else{
                this.carteHTML.textContent = "";
                this.retourne = false;
            }
        }
    };
    
    cartes.push(carteObjet);
    
    jeu.appendChild(carte);
}

function retournerCarte(e){
    let idCarteCliquee = e.target.getAttribute("id-carte");
    let carteCliquee = cartes[idCarteCliquee];
    
    if(carte1 == null){
        carte1 = carteCliquee;
        carte1.retournerCarte();
    }
    else{
        carte2 = carteCliquee;
        carte2.retournerCarte();
        
        if(carte1.numeroCarte == carte2.numeroCarte){
            carte1 = null;
            carte2 = null;
            
            nombrePaireRetournee++;
            if(nombrePaireRetournee == nombrePaire){
                desactiverToutesCartes();
                alert("Vous avez gagné!");
                location.reload();
            }
        }
        else{
            desactiverToutesCartes();
            setTimeout(cacherCartes, 1000);
        }
    }
}

function desactiverToutesCartes() {
    for (let index = 0; index < cartes.length; index++) {
        const element = cartes[index];
        element.carteHTML.disabled = true;
    }
}

function activerToutesCartes() {
    for (let index = 0; index < cartes.length; index++) {
        const element = cartes[index];
        element.carteHTML.disabled = false;
    }
}
    
    function cacherCartes(){
        carte1.retournerCarte();
        carte2.retournerCarte();
        carte1 = null;
        carte2 = null;
        activerToutesCartes();
    }

// prendre le display du timer

const timerDisplay = document.getElementById("timer");

// mettre le temps en secondes
let duree = 300;
let intervalId;

let compteurJeu = jeu.addEventListener("click", function() {
    // commencer le timer
  
      if(!intervalId)
      {
          intervalId = setInterval(function() {
              duree--;
              let minutes = Math.floor(duree / 60);
              let seconds = duree % 60;
  
              // afficher le temps restant
              timerDisplay.innerHTML = minutes + ":" + seconds ;
  
              // si le temps est écoulé, arrêter le timer
              if (duree < 0) {
                  clearInterval(intervalId);
                  timerDisplay.innerHTML = "Time's up!";
                  if (confirm("voulez vous rtourner au formulaire?")) {
                      location.reload();
                      // retoure au formulaire
                  }
              }
  
          }, 1000);
      }
  });