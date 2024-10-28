// https://restcountries.com/v3.1/all?fields=name,capital,currencies

// Initiation de la page
window.addEventListener("load", init)

function init() {
  document.querySelector("#btnDarkMode").addEventListener("click", darkModeToggle.bind(this))
}

function darkModeToggle() {
  document.querySelector("body").classList.toggle("darkMode")
  document.querySelector("body").classList.toggle("lightMode")
}
