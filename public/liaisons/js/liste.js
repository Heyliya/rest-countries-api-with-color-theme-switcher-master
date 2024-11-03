// https://restcountries.com/v3.1/all?fields=name,capital,currencies

let arrPays = []

// Initiation de la page
window.addEventListener("load", init)

function init() {
  document.querySelector("#filter").addEventListener("change", filterPays.bind(this))
  document.querySelector('#btn_search').addEventListener('input', chercher.bind(this))
  peuplerListePays()
}

function filterPays() { 
  let filter = document.querySelector("#filter").value
  
  arrPays.forEach(refPays => { 
    let region = refPays.getAttribute('data-region')
    
      if (region === filter) {
        // console.log(refPays);
        refPays.classList.remove('paysCache')
      } else {
        // console.log('pays hidden');
        refPays.classList.add('paysCache')
      }
  });
}

function peuplerListePays() {
  // Reset de la liste
  document.querySelector(".liste_pays").innerHTML = ""

  let url = `https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca2`

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
          refCarte.setAttribute('data-region', pays.region)
          refCarte.setAttribute('data-common_name', nomPays)

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
    }).then(() => { 
      arrPays = document.querySelectorAll('.carte_pays')
    })
    .catch(error => console.error('Erreur:', error));
}

function chercher(e) {
  let search = e.currentTarget.value.toLowerCase()
  arrPays.forEach(refPays => {
    let nomPays = refPays.getAttribute('data-common_name').toLowerCase()
    if (nomPays.includes(search)) {
      refPays.classList.remove('paysCache')
    } else {
      refPays.classList.add('paysCache')
    }
  });
}