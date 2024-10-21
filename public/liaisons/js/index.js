// todo: ajouter contenue du filtre par programmation
// todo: Filter Response https://restcountries.com/v3.1/{service}?fields={field},{field},{field}
https://restcountries.com/v3.1/all?fields=name,capital,currencies



// Initiation de la page
window.addEventListener("load", init)

function init() {
  document.querySelector("#btnDarkMode").addEventListener("click", darkModeToggle.bind(this))
  peuplerListePays("all")
}

function darkModeToggle() {
  document.querySelector("body").classList.toggle("darkMode")
  document.querySelector("body").classList.toggle("lightMode")
}

function peuplerListePays(filtre) {
  const url = `https://restcountries.com/v3.1/${filtre}?fields=name,population,region,capital,flags`

  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.forEach(pays => {
        let nomPays = pays.name.common
        let infos = [
          ['Population', pays.population], 
          ['Region', pays.region],
          ['Capital', pays.capital]
        ]
        let img = pays.flags.png

        let refCarte = document.createElement('li')
          refCarte.classList.add('carte_pays')

          let refLien = document.createElement("a")
            refLien.setAttribute('href', `fiche.html?pays=${pays.cca2}`)
            refLien.classList.add('carte_pays--lien')

            let refImg = document.createElement('img')
              refImg.classList.add('carte_pays--img')
              refImg.src = img
              refImg.setAttribute('alt', '')
            refLien.appendChild(refImg)

            let refh2 = document.createElement('h2')
              refh2.classList.add('carte_pays--pays', 'h2')
              refh2.innerText = nomPays
            refLien.appendChild(refh2)

            let refListeInfo = document.createElement('ul')
              refListeInfo.classList.add('carte_pays--info')
              infos.forEach(info => {
                let refInfo = document.createElement('li')
                refInfo.innerHTML = `${info[0]}: <span class="info">${info[1]}</span>`
                refInfo
                refListeInfo.appendChild(refInfo)
              });
            refLien.appendChild(refListeInfo)
          refCarte.appendChild(refLien)
        document.querySelector(".liste_pays").appendChild(refCarte)
      });
    })
    .catch(error => console.error('Erreur:', error));
}


// https://stackoverflow.com/questions/814613/how-to-read-get-data-from-a-url-using-javascript
function parseURLParams(url) {
  var queryStart = url.indexOf("?") + 1,
      queryEnd   = url.indexOf("#") + 1 || url.length + 1,
      query = url.slice(queryStart, queryEnd - 1),
      pairs = query.replace(/\+/g, " ").split("&"),
      parms = {}, i, n, v, nv;

  if (query === url || query === "") return;

  for (i = 0; i < pairs.length; i++) {
      nv = pairs[i].split("=", 2);
      n = decodeURIComponent(nv[0]);
      v = decodeURIComponent(nv[1]);

      if (!parms.hasOwnProperty(n)) parms[n] = [];
      parms[n].push(nv.length === 2 ? v : null);
  }
  return parms;
}