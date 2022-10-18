/** Lágmark bolla sem má velja. */
const MIN_NUM_OF_CUPS = 2;

/** Hámark bolla sem má velja. */
const MAX_NUM_OF_CUPS = 10;

/** Fjöldi spilaðra leikja. */
let played = 0;

/** Fjöldi unnra leikja. */
let won = 0;

/** Fjöldi stiga. */
let points = 0;

let spilaAftur = true;

let number = 0;

/**
 * Athugar hvort gefin tala sé á bilinu [min, max].
 *
 * @param {string | number} numAsString Tala sem á að athuga.
 * @param {number} min Lágmark sem tala má vera.
 * @param {number} max Hámark sem tala má vera.
 * @returns `true` ef tala er innan bils, annars `false`.
 */
function isValidNum(numAsString, min, max) {
  if (numAsString > min && numAsString < max) {
    return true;
  }
  return false;
}

/**
 * Nær í gisk frá notanda.
 *
 * @param {number} numOfCups Heildar fjöldi bolla.
 * @returns `null` ef notandi hætti við, annars vali notanda sem tölu.
 */
function getChoice(numOfCups) {
  if (numOfCups === null) {
    return;
  }
  return prompt(`Hvaða bolla veluru af ${numOfCups}`);
}

/**
 * Skilar tölu af handahófi á bilinu [min, max].
 *
 * @param {number} min Lágmark bils.
 * @param {number} max Hámark bils.
 * @returns Tala af handahófi á bili [min, max].
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Spilum leik.
 */
function play() {
  do {
    const numOfCups = prompt(`Hve marga bolla?
    Verður að vera gildi á bilinu [${MIN_NUM_OF_CUPS}, ${MAX_NUM_OF_CUPS}].
    Þú færð N-1 fyrir að finna bolta í N bollum.
    Ýttu á cancel eða ESC til að hætta.`);

    // Ýtt á ESC/Cancel
    if (numOfCups === null) {
      return;
    }
    played += 1;

    number = parseInt(numOfCups);
    if (!Number.isInteger(number) || number < 2 || number > 10) {
      console.error(`${numOfCups} er ekki löglegt gildi`);
      break;
    }

    const gisk = getChoice(numOfCups);

    const bolli = randomNumber(1, numOfCups);

    number = parseInt(gisk);
    if (Number.isInteger(number)) {
      if (isValidNum(number, 0, MAX_NUM_OF_CUPS) && number == bolli) {
        alert(`Rétt þú færð ${number-1} stig`);
        points += number-1;
        won += 1;
      } else {
        alert(`Rangt, boltinn var í bolla númer ${bolli}`);
        spilaAftur = confirm(`Spila aftur?`);
        if (!spilaAftur) {
          break;
        }
      }
    } else {
      console.error(`${gisk} er ekki löglegt gildi`);
      break;
    }
  } while (true)
}

/**
 * Birtir stöðu spilara.
 */
function games() {
  if(played == 0) {
    console.log("Þú hefur ekki spilað neina leiki")
  } else {
    console.log(`Leikir spilaðir: ${played}. Unnir leikir: ${won}. Stig: ${points}`)
  }
}
