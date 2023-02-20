let nombrePaire = 0
let nombrePaireRetournee = 0
const formulaire = document.getElementById('formulaire')
const jeu = document.getElementById('jeu')
const boutonRecommencer = document.getElementById('boutonRecommencer')
const resultatDuJeu = document.getElementById('resultatJeu')
let carte1 = null
let carte2 = null

const cartes = []

formulaire.addEventListener('submit', validerFormulaire)
jeu.hidden = true
boutonRecommencer.hidden = true
resultatDuJeu.hidden = true

resultatDuJeu.addEventListener('click', msgJeu)

function msgJeu () {
  if (nombrePaireRetournee === nombrePaire && duree > 0) {
    resultatDuJeu.textContent = 'Vous avez gagné!'
  } else {
    resultatDuJeu.textContent = 'Vous avez perdu!'
  }
  boutonRecommencer.hidden = false
  resultatDuJeu.hidden = false
  clearInterval(intervalId)
}

function validerFormulaire (e) {
  e.preventDefault()
  const nom = document.getElementById('txtNom').value
  nombrePaire = parseInt(document.getElementById('nombrePaire').value)

  const regNom = /^[A-Za-z]{1,}$/

  let erreurDetectee = false
  if (nombrePaire > 10 || nombrePaire < 2) {
    document.getElementById('erreur-nombrePaire').textContent = 'Vous devez choisir un nombre de paire valide.'
    erreurDetectee = true
    e.preventDefault()
  } else {
    document.getElementById('erreur-nombrePaire').textContent = ''
  }

  if (regNom.test(nom) === false) {
    document.getElementById('erreur-nom').textContent = 'Vous devez saisir un nom valide.'
    erreurDetectee = true
    e.preventDefault()
  } else {
    document.getElementById('erreur-nom').textContent = ''
  }

  if (erreurDetectee === false) {
    formulaire.hidden = true
    jeu.hidden = false

    creerJeu(nombrePaire)
  }
}

function creerJeu (nombrePaire) {
  // Créer les cartes en mémoire
  for (let index = 0; index < nombrePaire; index++) {
    cartes.push(CreerCarte(index))
    cartes.push(CreerCarte(index))
  }
  // Mélanger les cartes
  const carteMelanger = melangerCartes()

  // Créer les cartes dans le DOM

  for (let i = 0; i < carteMelanger.length; i++) {
    const elementCarte = carteMelanger[i]
    jeu.appendChild(elementCarte.carteHTML)
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
  const carteHTML = document.createElement('button')
  carteHTML.style.width = '236px'
  carteHTML.style.height = '364px'

  /* carteHTML.style.width = jeu.offsetWidth / (nombrePaire * 2) - 4 + 'px'
  carteHTML.style.height = (jeu.offsetWidth / (nombrePaire * 2)) * 1.6 + 'px'
  carteHTML.style.fontSize = (jeu.offsetWidth / (nombrePaire * 2)) * 0.5 + 'px' */

  carteHTML.classList.add('carte')
  carteHTML.classList.add('carte-cachee')
  carteHTML.setAttribute('id-carte', cartes.length)
  carteHTML.addEventListener('click', function (e) { CliqueCarte(e) })

  const carteObjet = {
    idCarte: cartes.length,
    numeroCarte,
    carteHTML,
    retourne: false,
    paireTrouver: false,
    retournerCarte () {
      if (this.retourne === false) {
        this.carteHTML.textContent = this.numeroCarte
        this.retourne = true
        this.carteHTML.classList.replace('carte-cachee', 'carte-retournee')
      } else {
        this.carteHTML.textContent = ''
        this.retourne = false
        this.carteHTML.classList.replace('carte-retournee', 'carte-cachee')
      }
    }
  }

  return carteObjet
}

function CliqueCarte (e) {
  const idCarteCliquee = e.target.getAttribute('id-carte')
  const carteCliquee = cartes[idCarteCliquee]

  if (carte1 == null) {
    carte1 = carteCliquee
    carte1.retournerCarte()
  } else if (carte1 !== carteCliquee) {
    carte2 = carteCliquee
    carte2.retournerCarte()

    if (carte1.numeroCarte === carte2.numeroCarte) {
      carte1.carteHTML.classList.add('carte-valide')
      carte2.carteHTML.classList.add('carte-valide')

      carte1.paireTrouver = true
      carte2.paireTrouver = true

      carte1.carteHTML.disabled = true
      carte2.carteHTML.disabled = true

      carte1 = null
      carte2 = null

      nombrePaireRetournee++
      if (nombrePaireRetournee === nombrePaire) {
        desactiverToutesCartes()
        msgJeu()
      }
    } else {
      carte1.carteHTML.classList.add('carte-invalide')
      carte2.carteHTML.classList.add('carte-invalide')

      desactiverToutesCartes()
      setTimeout(cacherCartes, 1000)
    }
  }
}

boutonRecommencer.addEventListener('click', recommencer)

function recommencer () {
  location.reload()
  msgJeu()
}

function desactiverToutesCartes () {
  for (let index = 0; index < cartes.length; index++) {
    const carte = cartes[index]
    carte.carteHTML.disabled = true
  }
}

function activerToutesCartes () {
  for (let index = 0; index < cartes.length; index++) {
    const carte = cartes[index]
    if (carte.paireTrouver === false) {
      carte.carteHTML.disabled = false
    }
  }
}

function cacherCartes () {
  carte1.retournerCarte()
  carte2.retournerCarte()
  carte1.carteHTML.classList.remove('carte-invalide')
  carte2.carteHTML.classList.remove('carte-invalide')

  carte1 = null
  carte2 = null
  activerToutesCartes()
}

// prendre le display du timer

const timerDisplay = document.getElementById('timer')

// mettre le temps en secondes
let duree = 300
let intervalId

jeu.addEventListener('click', function () {
  // commencer le timer

  if (!intervalId) {
    intervalId = setInterval(function () {
      duree--
      let minutes = Math.floor(duree / 60)
      let seconds = duree % 60

      // afficher le temps restant
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      timerDisplay.innerHTML = minutes + ':' + seconds

      // si le temps est écoulé, arrêter le timer
      if (duree < 0) {
        // clearInterval(intervalId);
        timerDisplay.innerHTML = "Time's up!"
        desactiverToutesCartes()
        msgJeu()
      }
    }, 1000)
  }
})
