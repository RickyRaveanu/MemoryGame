const moves = document.querySelector(".moves-count");
const gameContainer = document.querySelector(".game-container");
const result = document.querySelector("#result");
const controls = document.querySelector(".controls-container");
const homeB = document.querySelector(".home");
const lvl1 = document.querySelector(".lvlOne");
const lvl2 = document.querySelector(".lvlTwo");
const lvl3 = document.querySelector(".lvlThree");
let firstCard = false;
let secondCard = false;
let cards;

//Items array
const items = [
  { name: "flask", image: "./images/flask-logo.png" },
  { name: "numpy", image: "./images/numpy.png" },
  { name: "opencv", image: "./images/opencv-logo.png" },
  { name: "pandas", image: "./images/pandas-logo.png" },
  { name: "python", image: "./images/python.png" },
  { name: "pytorch", image: "./images/pytorch.png" },
  { name: "tensorflow", image: "./images/Tensorflow.png" },
  { name: "dask", image: "./images/dask-logo.png" },
  { name: "django", image: "./images/django-python-logo.png" },
  { name: "keras", image: "./images/keras.png" },
  { name: "requests", image: "./images/Requests_Python_Logo.png" },
  { name: "seaborn", image: "./images/seaborn-logo.png" },
  { name: "theano", image: "./images/Theano_logo.png" },
  { name: "docker", image: "./images/Docker.png" },
  { name: "kubernetes", image: "./images/Kubernetes_Logo.png" },
  { name: "mongoDB", image: "./images/mongoDB.png" },
  { name: "oracleDB", image: "./images/oracle-database-logo.png" },
  { name: "graphQL", image: "./images/graphql.png" },
  { name: "postgreSQL", image: "./images/postgresql-logo.png" },
];

let movesCount = 0,
  winCount = 0;
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
};

const generateRandom = (size) => {
  let tempArray = [...items];
  let cardValues = [];
  size = Math.pow(size, 2) / 2;
  for (let i = 0; i < size; i++) {
    const rndIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[rndIndex]);
    tempArray.splice(rndIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    /*
        Create Cards
        before => front side (contains question mark)
        after => back side (contains actual image);
        data-card-values is a custom attribute which stores the names of the cards to match later
      */
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          movesCounter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            setTimeout(() => {
              if (winCount == Math.floor(cardValues.length / 2)) {
                result.innerHTML = `<h4>Moves: ${movesCount}</h4>`;
                alert(`You have won this memory game in: ${movesCount} moves!`);
              }
            }, 250);
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

const initializer = (size) => {
  winCount = 0;
  let cardValues = generateRandom(size);
  console.log(cardValues);
  matrixGenerator(cardValues, size);
};

lvl1.addEventListener("click", () => {
  movesCount = 0;
  //controls and buttons visibility
  controls.classList.add("hide");
  lvl1.classList.add("hide");
  homeB.classList.remove("hide");
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer(2);
});

lvl2.addEventListener("click", () => {
  movesCount = 0;
  //controls and buttons visibility
  controls.classList.add("hide");
  lvl2.classList.add("hide");
  homeB.classList.remove("hide");
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer(4);
});

lvl3.addEventListener("click", () => {
  movesCount = 0;
  //controls and buttons visibility
  controls.classList.add("hide");
  lvl3.classList.add("hide");
  homeB.classList.remove("hide");
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer(6);
});

homeB.addEventListener("click", () => {
  location.reload();
});
