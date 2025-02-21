import Game from "./game.js";

function cardSelection(container) {
  const errorMSG = document.createElement("div");
  const counter = document.createElement("div");
  let cardCount = 0;
  const red = "#CE1640";

  function init(cards) {
    container.innerHTML = "";
    startDash();
    createCards(cards);
  }

  function startDash() {
    const workingCards = document.createElement("div");
    workingCards.id = "workingCards";
    // const workingCards = document.getElementById("workingCards");
    const startButton = document.createElement("div");
    startButton.addEventListener("mouseup", startRound);
    startButton.textContent = "+";
    startButton.style.cssText =
      "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 7rem; font-weight: 100; cursor: pointer; padding: 40px;";
    workingCards.appendChild(startButton);

    errorMSG.textContent = "Please Select Three Cards.";
    errorMSG.style.cssText = `position: absolute; bottom: 0px; left: 50%; transform: translate(-50%, 110%); font-size: 2rem; color: ${red}; display: none;`;
    workingCards.appendChild(errorMSG);
    container.appendChild(workingCards);
  }

  function startRound() {
    const selected = document.getElementsByClassName("selected");
    if (selected.length === 3) {
      const workingCards = document.getElementById("workingCards");
      workingCards.innerHTML = "";
      workingCards.style.cssText = "";
      container.innerHTML = "";
      container.appendChild(workingCards);
      console.log("Here");

      const cardsGUI = document.getElementsByClassName("cards");
      const game = Game(container, selected, cardsGUI);
    } else {
      errorMSG.style.display = "block";
      setTimeout(() => (errorMSG.style.display = "none"), 2000);
    }
  }

  function createCards(cards) {
    const cardBox = document.createElement("div");
    cardBox.id = "cardBox";
    container.appendChild(cardBox);
    const totalSpan = 20;
    let currentAngle = (totalSpan / 2) * -1;
    currentAngle += totalSpan / cards.length / 2;
    cards.forEach(function (cardValue) {
      const card = document.createElement("div");
      card.textContent = cardValue;
      card.classList.add("card");
      card.getBoundingClientRect();

      cardBox.appendChild(card);
      card.addEventListener("mouseup", toggleSelected);
      // transform: translate(-50%, -20%) rotateZ(-15deg);
      // card.style.transformOrigin = "50% 1400%";
      card.style.transform = `translate(-50%, -30%) rotateZ(${currentAngle}deg)`;
      currentAngle += totalSpan / cards.length;
    });

    counter.classList.add("counter");
    counter.innerHTML = `<p>${cardCount}<br> /<br>  3</p>`;
    cardBox.appendChild(counter);
  }

  function toggleSelected() {
    const selected = document.getElementsByClassName("selected");
    if (selected.length < 3 || this.classList.contains("selected")) {
      if (this.classList.contains("selected")) {
        cardCount -= 1;
      } else {
        cardCount += 1;
      }
      counter.innerHTML = `<p>${cardCount}<br> /<br>  3</p>`;
      this.classList.toggle("selected");
    } else {
      counter.style.color = red;
      setTimeout(() => (counter.style.color = "white"), 100);
    }
  }

  return { init };
}

const container = document.getElementById("container");
const selection = cardSelection(container);
const cards = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
selection.init(cards);
