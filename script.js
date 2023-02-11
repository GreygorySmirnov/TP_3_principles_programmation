let nombrePaire = 0;
let formulaire = document.getElementById("formulaire")
let jeu = document.getElementById("jeu");

let carte1 = null;
let carte2 = null;

formulaire.addEventListener("submit", validerFormulaire);
jeu.hidden = true;

function validerFormulaire(e){
    e.preventDefault();
    e.target == formulaire;
    let nom = document.getElementById("txtNom").value;
    let nombrePaire = document.getElementById("nombrePaire").value;

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
}

function CreerCarte(numeroCarte){
    const carte = document.createElement("button");
    carte.style.width = "100px";
    carte.style.height = "100px";

    carte.setAttribute("numero-carte", numeroCarte);
    carte.addEventListener("click", function(e) {retournerCarte(e);});

    jeu.appendChild(carte);
}

function retournerCarte(e){
    if(carte1 == null){
        carte1 = e.target;
        e.target.textContent = e.target.getAttribute("numero-carte");
    }
    else{
        carte2 = e.target;
        e.target.textContent = e.target.getAttribute("numero-carte");

        if(carte1.getAttribute("numero-carte") == carte2.getAttribute("numero-carte")){
            e.target.textContent = e.target.getAttribute("numero-carte");
            carte1 = null;
            carte2 = null;
        }
        else{
            setTimeout(cacherCartes, 1000);
        }
    }
}

function cacherCartes(){
    carte1.textContent = "";
    carte2.textContent = "";
    carte1 = null;
    carte2 = null;
}