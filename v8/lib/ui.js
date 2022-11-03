// Föll sem stýra útliti/búa til element

/**
 * Fjarlægir öll element sem eru innan gefins element.
 * @param {element} element Element sem á að tæma.
 */
export function emptyElement(element) {
  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
}

/**
 * Birta skjá og fela aðra.
 * @param {string} screen Annað hvort `main` eða `waiting` eftir því hvort á að birta.
 */
export function showScreen(screen) {
  // TODO útfæra
}

/**
 * Býr til DOM element fyrir bolla og skilar því.
 *
 * @param {number} num Fjöldi bolla sem á að búa til.
 * @param {element} svg SVG element fyrir mynd af bolla.
 * @param {function} onClick Fall sem keyrir þegar smellt er á bolla.
 * @returns Elementi fyrir bolla.
 */
export function createCup(num, svg, onClick) {


  const elems = document.getElementsByClassName("cup__button");

  for (var i = 0; i < num; i++){
    const currentDiv = document.getElementsByClassName("cups")[0];

    // cup div
    const cup = document.createElement('div');
    cup.classList.add("cup")

    currentDiv.append(cup);

    // cup__content div
    const cup__content = document.createElement('div');
    cup__content.classList.add("cup__content")

    cup.append(cup__content)

    // button div
    const button = document.createElement("button");
    button.classList.add("cup__button");

    const buttonNumer = document.createTextNode(i+1);
    button.appendChild(buttonNumer);

    cup.appendChild(button)

    // svg
    const mynd = document.createElement("svg");
    mynd.classList.add("cup__svg");
    mynd.setAttribute("viewBox", "0 0 32 32");
    mynd.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const svg = document.querySelector('svg').cloneNode(true);
    cup__content.appendChild(svg.cloneNode(true))

    // path
    const path = document.createElement("path");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("d", "M31 2H1a1 1 0 0 0-1 1v22a3 3 0 0 0 3 3h2v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1h2a3 3 0 0 0 3-3v-3.05c4.72-.52 6-4.68 6-6.95V3a1 1 0 0 0-1-1Zm-7 23a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4h22Zm6-10c0 .19-.06 4.32-4 4.92V4h4Z");

    mynd.appendChild(path);


    elems[i].addEventListener('click', onClick);
  }
}
