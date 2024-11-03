// Ref Page

let commonName;
let nativeName;
let flag;
let population;
let region;
let subregion;
let capital;
let tld;
let currencies;
let languages;
let refBorders;


 
// Initiation de la page
window.addEventListener("load", init)

function init() {
  commonName = document.querySelector('#commonName')
  nativeName = document.querySelector('#nativeName')
  flag = document.querySelector('#flag')
  population = document.querySelector('#population')
  region = document.querySelector('#region')
  subregion = document.querySelector('#subregion')
  capital = document.querySelector('#capital')
  tld = document.querySelector('#tld')
  currencies = document.querySelector('#currencies')
  languages = document.querySelector('#languages')
  refBorders = document.querySelector('#borders')
  console.log(refBorders);
  
  peuplerFiche();
}

function peuplerFiche() { 
  let codePays = getCodePays();

  let url = `https://restcountries.com/v3.1/alpha/${codePays}?fields=name,population,region,subregion,capital,flags,tld,currencies,languages,borders`

  console.log(url);

  fetch(url)
  .then(response => response.json())
  .then(pays => { 
    commonName.innerText = pays.name.common
    nativeName.innerText = Object.values(pays.name.nativeName)[0].common
    flag.src = pays.flags.png
    flag.alt = pays.flags.alt
    population.innerText = pays.population
    region.innerText = pays.region
    subregion.innerText = pays.subregion
    capital.innerText = pays.capital
    tld.innerText = pays.tld
    currencies.innerText = Object.values(pays.currencies)[0].name
    languages.innerText = Object.values(pays.languages).join(', ')
    

    if (pays.borders.length === 0) {
      refBorders.innerHTML = "<li>No bordering countries</li>"
      
    } else {
      for (const borderedCountryCode of pays.borders) {
        let refLi = document.createElement('li')
        let refA = document.createElement('a')
        
        fetch(`https://restcountries.com/v3.1/alpha/${borderedCountryCode}?fields=name,cca2`)
        .then(response => response.json())
        .then(borderedPays => {
          refA.innerText = borderedPays.name.common
          refA.setAttribute('href', `fiche.html?pays=${borderedPays.cca2}`)
        })
        .catch(error => console.error(error))
        refLi.appendChild(refA)
        refBorders.appendChild(refLi)
      }
    }

  })
  .catch(error => console.error(error))
}

function getCodePays() {
  let url = getCurrentURL()
  let params = parseURLParams(url)
  return params.pays[0]
}

// https://ui.dev/get-current-url-javascript
function getCurrentURL() {
  return window.location.href
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