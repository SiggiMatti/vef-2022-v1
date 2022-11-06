//import { create } from 'browser-sync';
import { isValidNum, randomNumber } from './lib/helpers.js';
import { createCup, emptyElement, showScreen } from './lib/ui.js';

/** Lágmark bolla sem má velja. */
const MIN_NUM_OF_CUPS = 2;

/** Hámark bolla sem má velja. */
const MAX_NUM_OF_CUPS = 10;

/** Hversu lengi á að bíða þar til við birtum biðskjá eftir leik. */
const SHOW_WAITINGSCREEN_TIME = 1000;

/** Breyta sem heldur utan um stöðuna á leiknum okkar */

  /** Fjöldi spilaðra leikja. */
let played = 0;

  /** Fjöldi unna leikja. */
let won = 0;

  /** Fjöldi stiga. */
let points = 0;

  /** Hvar boltinn er falinn, `null` ef ekki í leik. */
let currentCup = null;

  /** Fjöldi stiga sem eru í boði í núverandi leik. */
let currentPointsAvailable = 0;

let hidden = true;



// Afritum SVG sem er nákvæmlega eitt stykki af í DOM í byrjun
// getum notað það oft í leiknum með:
// element.appendChild(svg.cloneNode(true));
const svg = document.querySelector('svg').cloneNode(true);

// Setjum rétt gildi fyrir hámark í villuskilaboðum.
document.querySelector('#max_cups').innerText = MAX_NUM_OF_CUPS;

/**
 * Meðhöndlar það sem gerist þegar notandi velur bolla:
 * - Ef engin bolti er falinn, birtir biðskjá.
 * - Uppfærir fjölda leikja sem hafa verið spilaðir.
 * - Ef rétt gisk, sýnir boltann og gefur stig, annars sýnir tómt.
 * - Uppfærir fjölda stiga og leikja spilaða.
 * - Birtir biðjskjá eftir skilgreindann tíma þegar notandi er búinn að velja.
 *
 * @param {event} e Atburður sem átti sér stað þegar notandi ýtti á takka fyrir
 *                  ákveðinn bolla.
 * @returns 
 */
function onCupClick(e) {
  hidden = true;

  let bollaNr = parseInt(e.target.innerText)

  // Næ í fjölda bolla
  let fjBolla = document.getElementsByClassName("game")[0].getElementsByClassName("cup");
  let lengd = fjBolla.length;
  console.log("d", lengd)

  // By til random tölu upp að fjölda bolla
  let rand = randomNumber(1, parseInt(lengd));

  console.log("button: ", e.target.innerText, " bollaNr: ", bollaNr, " rand: ", rand);

  if (rand == bollaNr) {

    // Uppfæri stigið í HTML
    const point = document.getElementById("points");
    points += parseInt(e.target.innerText)- 1;
    console.log(e.target.innerText - 1);
    point.innerText = points;

    // Læt svg af bolla hverfa
    let svgg = document.getElementsByClassName("cup")[parseInt(e.target.innerText) - 1].getElementsByClassName("cup__content")[0];
    emptyElement(svgg);

    // Læt kúlu í stað bolla
    let mynd = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    mynd.setAttribute("height", 100);
    mynd.setAttribute("width", 100)

    svgg.appendChild(mynd);

    let circ = document.createElementNS(mynd.namespaceURI, "circle");
    circ.setAttribute("cx", 50);
    circ.setAttribute("cy", 50);
    circ.setAttribute("r", 40);
    circ.setAttribute("fill", "red");

    mynd.appendChild(circ);

    console.log(svgg);

    
    // Tek bollana af skjánum
    const maingame = document.querySelector('.game__main');
    setTimeout(() => {
      maingame.classList.toggle('game__main--hidden');
    }, 1000)
  } else {
    // Læt bollann hverfa
    let svgg = document.getElementsByClassName("cup")[parseInt(e.target.innerText) - 1].getElementsByClassName("cup__content")[0];
    emptyElement(svgg);

    // Tek bollana af skjánum
    const maingame = document.querySelector('.game__main');
    setTimeout(() => {
      maingame.classList.toggle('game__main--hidden');
    }, 1000)
  }
}

/**
 * Tæmir `parent` og býr til `num` bollum og setur þangað inn.
 * @param {number} num Fjöldi bolla
 * @param {element} parent Element sem á að setja bollana inn í.
 */
function createCups(num, parent) {
  // TODO útfæra
  emptyElement(document.getElementsByClassName(parent)[0]);
}

/**
 * Meðhöndlar það að notandi byrjar leikinn með því að skrá fjölda bolla og ýta
 * á takkann eða ýta á enter.
 * Sér um að:
 * - Athuga hvort fjöldi bolla sé réttur, ef ekki sýna villuskilaboð.
 * - Búa til bolla.
 * - Uppfæra fjölda stiga sem eru í boði og undir hvaða bolla boltinn sé.
 * - Sýna bollaskjáinn.
 *
 * @param {event} e Atburður sem átti sér stað þegar form var sent.
 */
let button = document.querySelector('.cup__button');
function onFormSubmit(e) {
  e.preventDefault();

  const formError = document.querySelector('.form__error');

  formError.classList.add('form__error--hidden');

  // TODO útfæra
  const maingame = document.querySelector('.game__main');
  let val = document.getElementById('cups').value

  console.log(val);
  if(!isValidNum(val, 2, 10)) {
    // Ef er ekki valid num
    formError.classList.toggle('form__error--hidden')
  } else {
    // Ef er valid num

    // Ef notandi hefur spilað meira en einn leik
    if (played > 0) {
      createCups(val, "cups");
    }
    const elems = document.getElementsByClassName("cup__button");
    
    // Passa að byrjunarskjárinn kemur ekki aftur upp þegar að maður ýtir á Byrja leik tvisvar í röð
    if (hidden == true) {
      maingame.classList.toggle('game__main--hidden')
    } 
    hidden = false;
     
    // Uppfæri hversu oft leikur hefur verið spilaður
    const games = document.getElementById("games");
    played += 1;
    games.innerText = played;

    // Læt eventlistener á alla takka svo hægt er að ýta á þá
    for (var i = 0; i < elems.length; i++){
      elems[i].addEventListener('click', onCupClick);
    }
    createCup(val, 0, onCupClick);

  }
}
// Tengir event handler við formið.
document.querySelector('form').addEventListener('submit', onFormSubmit);
