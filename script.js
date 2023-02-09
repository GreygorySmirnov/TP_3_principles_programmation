let nombrePaire = 0;
let formulaire = document.getElementById("formulaire").addEventListener("submit", function(e) {validerFormulaire(e);});

function validerFormulaire(e){
    e.preventDefault();
    let nombrePaire = 0;
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
        document.getElementById("jeu").hidden = false;
    }
}
