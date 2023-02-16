let nombrePaire = 0;
let nombrePaireRetournee = 0;
let formulaire = document.getElementById("formulaire")
let jeu = document.getElementById("jeu");
let boutonRocommencer = document.getElementById("boutonRecommencer");
let resultatDuJeu = document.getElementById("resultatJeu");
let carte1 = null;
let carte2 = null;

const cartes = []

formulaire.addEventListener("submit", validerFormulaire);
jeu.hidden = true;
boutonRocommencer.hidden = true;
resultatDuJeu.hidden = true;

resultatDuJeu.addEventListener("click", msgJeu);

function msgJeu(){
    if(nombrePaireRetournee == nombrePaire && duree > 0){
        resultatDuJeu.textContent = "Vous avez gagné!";
        
        boutonRocommencer;
    }
    else{
        resultatDuJeu.textContent = "Vous avez perdu!";
        boutonRocommencer;
    }
    clearInterval(intervalId);
}

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
    //Créer les cartes en mémoire
    for (let index = 0; index < nombrePaire; index++) {
        cartes.push(CreerCarte(index));
        cartes.push(CreerCarte(index));
    }
    //Mélanger les cartes
    let carteMelanger = melangerCartes();
    
    //Créer les cartes dans le DOM
    
    for(let i = 0; i < carteMelanger.length; i++){
        const elementCarte = carteMelanger[i];
        jeu.appendChild(elementCarte.carteHTML);
    }
    
}
function melangerCartes () {
  const cartesAMelanger = [...cartes]
  for (let index = 0; index < cartesAMelanger.length; index++) {
    const element = cartesAMelanger[index]
    const indexAleatoire = Math.floor(Math.random() * cartesAMelanger.length)
    const carteAleatoire = cartesAMelanger[indexAleatoire]

    cartesAMelanger[index] = carteAleatoire
    cartesAMelanger[indexAleatoire] = element
  }

  return cartesAMelanger
}

function CreerCarte (numeroCarte) {
  const carte = document.createElement('button')
  carte.style.width = '100px'
  carte.style.height = '100px'

  carte.setAttribute('id-carte', cartes.length)
  carte.setAttribute('numero-carte', numeroCarte)
  carte.addEventListener('click', function (e) { retournerCarte(e) })

  const carteObjet = {
    idCarte: cartes.length,
    numeroCarte,
    carteHTML: carte,
    retourne: false,
    retournerCarte () {
      if (this.retourne === false) {
        this.carteHTML.textContent = this.numeroCarte
        this.retourne = true
      } else {
        this.carteHTML.textContent = ''
        this.retourne = false
      }
    }
  }

  return carteObjet
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
                boutonRocommencer.hidden = false;
                resultatDuJeu.hidden = false;
                msgJeu();
                
            }
        }
        else{
            desactiverToutesCartes();
            setTimeout(cacherCartes, 1000);
        }
    }
}

boutonRocommencer.addEventListener("click", recommencer);

function recommencer(){
    location.reload();
    msgJeu();
}

function desactiverToutesCartes () {
  for (let index = 0; index < cartes.length; index++) {
    const element = cartes[index]
    element.carteHTML.disabled = true
  }
}

function activerToutesCartes () {
  for (let index = 0; index < cartes.length; index++) {
    const element = cartes[index]
    element.carteHTML.disabled = false
  }
}

function cacherCartes () {
  carte1.retournerCarte()
  carte2.retournerCarte()
  carte1 = null
  carte2 = null
  activerToutesCartes()
}

// prendre le display du timer

const timerDisplay = document.getElementById('timer')

// mettre le temps en secondes
let duree = 300;
let intervalId;

jeu.addEventListener("click", function() {
    // commencer le timer
    
    if(!intervalId)
    {
        intervalId = setInterval(function() {
            duree--;
            let minutes = Math.floor(duree / 60);
            let seconds = duree % 60;
            
            // afficher le temps restant
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if(minutes < 10){
                minutes = "0" + minutes;
            }
            timerDisplay.innerHTML = minutes + ":" + seconds;
            
            
            // si le temps est écoulé, arrêter le timer
            if (duree < 0 ) {
                //clearInterval(intervalId);
                timerDisplay.innerHTML = "Time's up!";
                desactiverToutesCartes();
                boutonRocommencer.hidden = false;
                resultatDuJeu.hidden = false;
                msgJeu();
            }
            
        }, 1000);
    }
});