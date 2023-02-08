let nombrePaire = 0;
let formulaire = document.getElementById("formulaire").addEventListener("submit", function(e) {validerFormulaire(e);});


function validerFormulaire(e){
    let nombrePaire = 0;
    let nom = ""
    let prenom = 0
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
}
