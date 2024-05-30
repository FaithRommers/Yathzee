let p1Scores = []; //sla hierin de gebruikte nummers op, dit zijn de nummers die beige gekleurd zijn
let rollsLeft = 3; // het aantal rollen die in de header moeten staan
let dice = ["Die1", "Die2", "Die3", "Die4", "Die5"]; //sla hierin de dobbesteen html elementen op, zodat je deze kan aanpassen via js
let diceImg = [
  "Images/Dice-1.png",
  "Images/Dice-2.png",
  "Images/Dice-3.png",
  "Images/Dice-4.png",
  "Images/Dice-5.png",
  "Images/Dice-6.png",
];
let scoreCounters = [
  "acesP1",
  "twosP1",
  "threesP1",
  "foursP1",
  "fivesP1",
  "sixesP1",
];
let destructButton = ["aceP1", "twoP1", "threeP1", "fourP1", "fiveP1", "sixP1"];
let numberSingles = [0, 0, 0, 0, 0, 0];
let numberCombos = [0, 0, 0, 0, 0, 0, 0];

let valueDice = [1, 2, 3, 4, 5, 6];
let holdArray = [false, false, false, false, false];
let valueArray = [];

let diceAmount = [0, 0, 0, 0, 0, 0];

// temporary score counter
let totalP1;
let bonus = 0;

let totalTop = 0;
let totalBottom = 0;

let number = 0;

// makes the dice usable
dice[0] = document.getElementById("die1");
dice[1] = document.getElementById("die2");
dice[2] = document.getElementById("die3");
dice[3] = document.getElementById("die4");
dice[4] = document.getElementById("die5");

//voorbeeld code hoe je een button interactable kan maken, zodat je deze op hold kan zetten and adds borders on hold

for (let i = 0; i < 5; i++) {
  dice[i].onclick = function () {
    holdArray[i] = !holdArray[i];

    if (holdArray[i] == true) {
      dice[i].setAttribute("style", "border: 5px solid black");
    } else {
      dice[i].setAttribute("style", "border: 1px solid black");
    }
  };
}

//schrijf hier de rest van je code

//upcoming are the calculators for the single numbers
function calcSingles(valueClicked) {
  //lock button on click
  let buttonLock = document.getElementById(
    `${destructButton[valueClicked - 1]}`
  );
  buttonLock.disabled = true;
  document.getElementById(`${destructButton[valueClicked - 1]}`).innerHTML =
    "LOCKED";

  //calculate total of singles
  for (let i = 0; i < 5; i++) {
    if (valueArray[i] === valueClicked) {
      number += valueClicked;
      document.getElementById(
        `${scoreCounters[valueClicked - 1]}`
      ).innerHTML = `${number}`;
    }
  }
  rollDie("true");

  numberSingles[valueClicked - 1] = number;
  number = 0;

  //score berekenen
  calcSubTotal();

  rollsLeft = 3;
  document.getElementById("rolls").innerHTML = `${rollsLeft}`;
}

// three of a kind
function calcTkind() {
  let buttonLock = document.getElementById("tKindP1");
  buttonLock.disabled = true;
  document.getElementById("tKindP1").innerHTML = "LOCKED";

  calcDiceAmount();
  totalP1 = 0;

  for (let j = 0; j < 6; j++) {
    if (diceAmount[j] == 3) {
      for (let i = 0; i < 5; i++) {
        totalP1 += valueArray[i];
        document.getElementById("tkind--p1--locked").innerHTML = `${totalP1}`;
        numberCombos[0] = totalP1;
      }
    }
  }
  rollDie("true");
  calcSubTotal();
  rollsLeft = 3;
  document.getElementById("rolls").innerHTML = `${rollsLeft}`;
}

// four of a kind
function calcFkind() {
  let buttonLock = document.getElementById("fKindP1");
  buttonLock.disabled = true;
  document.getElementById("fKindP1").innerHTML = "LOCKED";

  calcDiceAmount();
  totalP1 = 0;

  for (let j = 0; j < 6; j++) {
    if (diceAmount[j] == 4) {
      for (let i = 0; i < 5; i++) {
        totalP1 += valueArray[i];
        document.getElementById("fkind--p1--locked").innerHTML = `${totalP1}`;
        numberCombos[1] = totalP1;
      }
    }
  }
  rollDie("true");
  calcSubTotal();
  rollsLeft = 3;
  document.getElementById("rolls").innerHTML = `${rollsLeft}`;
}

// full house
function calcFhouse() {
  let buttonLock = document.getElementById("fHouseP1");
  buttonLock.disabled = true;
  document.getElementById("fHouseP1").innerHTML = "LOCKED";

  calcDiceAmount();

  // 2 for loops de ene check voor 2 de zelfde en de andere voor 3 dezelfede dice
  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < 6; i++) {
      if (diceAmount[j] == 2 && diceAmount[i] == 3) {
        document.getElementById("fouse--p1--locked").innerHTML = `25`;
        numberCombos[2] = 25;
      }
    }
  }
  rollDie("true");
  calcSubTotal();
  rollsLeft = 3;
  document.getElementById("rolls").innerHTML = `${rollsLeft}`;
}

// small straight
function calcSmall() {
  let buttonLock = document.getElementById("smallP1");
  buttonLock.disabled = true;
  document.getElementById("smallP1").innerHTML = "LOCKED";

  calcDiceAmount();

  for (let i = 0; i < 3; i++) {
    if (
      diceAmount[i] >= 1 &&
      diceAmount[i + 1] >= 1 &&
      diceAmount[i + 2] >= 1 &&
      diceAmount[i + 3] >= 1
    ) {
      document.getElementById("small--p1--locked").innerHTML = `30`;
      numberCombos[3] = 30;
    }
  }
  rollDie("true");
  calcSubTotal();
  rollsLeft = 3;
  document.getElementById("rolls").innerHTML = `${rollsLeft}`;
}

// large straight
function calcBig() {
  let buttonLock = document.getElementById("bigP1");
  buttonLock.disabled = true;
  document.getElementById("bigP1").innerHTML = "LOCKED";

  calcDiceAmount();

  for (let i = 0; i < 2; i++) {
    if (
      diceAmount[i] >= 1 &&
      diceAmount[i + 1] >= 1 &&
      diceAmount[i + 2] >= 1 &&
      diceAmount[i + 3] >= 1 &&
      diceAmount[i + 4] >= 1
    ) {
      document.getElementById("large--p1--locked").innerHTML = `40`;
      numberCombos[4] = 40;
    }
  }
  rollDie("true");
  calcSubTotal();
  rollsLeft = 3;
  document.getElementById("rolls").innerHTML = `${rollsLeft}`;
}

// yahtzee
function calcYahtzee() {
  let buttonLock = document.getElementById("yahtzeeP1");
  buttonLock.disabled = true;
  document.getElementById("yahtzeeP1").innerHTML = "LOCKED";

  calcDiceAmount();
  totalP1 = 0;

  for (let i = 0; i < 6; i++) {
    if (diceAmount[i] == 5) {
      document.getElementById("yahtzee--p1--locked").innerHTML = `50`;
      numberCombos[5] = 50;
    }
  }
  rollDie("true");
  calcSubTotal();
  rollsLeft = 3;
  document.getElementById("rolls").innerHTML = `${rollsLeft}`;
}

// chance
function calcChance() {
  let buttonLock = document.getElementById("chanceP1");
  buttonLock.disabled = true;
  document.getElementById("chanceP1").innerHTML = "LOCKED";

  totalP1 = 0;

  for (let x = 0; x < 5; x++) {
    totalP1 += valueArray[x];
    document.getElementById("chance--p1--locked").innerHTML = `${totalP1}`;
    numberCombos[6] = totalP1;
  }
  rollDie("true");
  calcSubTotal();
  rollsLeft = 3;
  document.getElementById("rolls").innerHTML = `${rollsLeft}`;
}

//rolls the dice
function rollDie(forceRoll) {
  if (rollsLeft > 0) {
    for (let i = 0; i < 5; i++) {
      if (!holdArray[i]) {
        valueArray[i] = valueDice[Math.floor(Math.random() * valueDice.length)];

        dice[i].setAttribute("src", `${diceImg[valueArray[i] - 1]}`);
      }
    }
    rollsLeft--;
  }

  if (forceRoll) {
    for (let i = 0; i < 5; i++) {
      if ((holdArray[i] = true)) {
        holdArray[i] = !holdArray[i];
      }
      dice[i].setAttribute("style", "border: 1px solid black");
    }
  }
  // rolls left reset
  if (rollsLeft < 0) {
    rollsLeft = 3;
  }

  document.getElementById("rolls").innerHTML = `${rollsLeft}`;
}

//this calculates the number of numbers there are for each dice, for example 1x2 2x4 2x5 1x6 would get logged like this: (0, 1, 0, 2, 2, 1)
function calcDiceAmount() {
  for (let i = 0; i < 6; i++) {
    diceAmount[i] = 0;
  }
  // it checks the value of the dice for every possible dice-value and if it matches that value gets stored as +1
  //so if you have 4 dice with a value of 3 then it counts +1 4 times so its stores it as 4 which means you have 4 3-dices
  for (let i = 0; i < 5; i++) {
    for (let x = 0; x < 6; x++) {
      if (valueArray[i] == valueDice[x]) {
        diceAmount[x] += 1;
      }
    }
  }
  console.log(diceAmount);
}

//calculates the total and bonus for everything
function calcSubTotal() {
  //top half
  totalP1 = 0;
  for (let i = 0; i < 6; i++) {
    totalP1 += numberSingles[i];
  }
  document.getElementById("subtotalP1").innerHTML = `${totalP1}`;

  if (totalP1 >= 63) {
    bonus = 35;
  }
  document.getElementById("bonus--p1--locked").innerHTML = `${bonus}`;

  totalTop = totalP1 + bonus;
  document.getElementById("total--p1--locked").innerHTML = `${totalTop}`;
  document.getElementById("top--p1--total").innerHTML = `${totalTop}`;

  //bottom half
  totalBottom = 0;
  for (let i = 0; i < 7; i++) {
    totalBottom += numberCombos[i];
  }
  document.getElementById(
    "totalCombo--p1--locked"
  ).innerHTML = `${totalBottom}`;
  document.getElementById("bottom--p1--locked").innerHTML = `${totalBottom}`;

  document.getElementById("grand--p1--locked").innerHTML = `${
    totalTop + totalBottom
  }`;
}
