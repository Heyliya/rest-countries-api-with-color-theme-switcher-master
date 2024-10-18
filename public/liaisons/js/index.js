// todo: ajouter contenue du filtre par programmation

// Initiation de la page
window.addEventListener("load", init)

function init() {
  document.querySelector("#btnDarkMode").addEventListener("click", darkModeToggle.bind(this))
}

function darkModeToggle() {
  document.querySelector("body").classList.toggle("darkMode")
  document.querySelector("body").classList.toggle("lightMode")
}