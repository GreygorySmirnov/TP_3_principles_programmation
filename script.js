function finDePartie(){
    confirm("la partie est terminée, voulez-vous retourner au formulaire?")
  }
 let formulaire = document.getElementById("formulaire");
 let timer = document.getElementById("timer");
 let resultMessage = document.getElementById("result-message");
  
 let intervalId;
 let timeLeft;

  formulaire.addEventListener("click", commencerCompteur);
    
    /*const pairs = document.querySelector("#pairs").value;
    const playerName = document.querySelector("#playerName").value;
    if (pairs < 2 || pairs > 10 || playerName.length === 0) {
      errorMessage.innerHTML = "Veuillez entrer un nombre compris entre 2 et 10 pour le nombre de paires et un nom alphanumérique pour le joueur";
      return;
    }
    errorMessage.innerHTML = "";
    formContainer.style.display = "none";
    gameContainer.style.display = "block";*/
  
    

    function commencerCompteur() {
    // logic for the game here
     // 5 minutes in seconds
     timeLeft = 2;
     intervalId = setInterval(decrementerCompteur, 1000);
}



function decrementerCompteur() {
        timeLeft--;
        timer.textContent = "Temps restant: " + timeLeft + " secondes";
        if (timeLeft == 0) {
            resultMessage.textContent = "Vous avez perdu!";
            clearInterval(intervalId);
        }
}
  