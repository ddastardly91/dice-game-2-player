// Assigning all elements to variables.
const newGame = document.querySelector(".new-game");
const rollDice = document.querySelector("#roll-dice");
const holdDice = document.querySelector("#hold-dice");
const btnContainer = document.querySelector(".button-container");
const dice = document.querySelector("#dice");
let p1CurScoreText = document.querySelector(".current-score-p1");
let p2CurScoreText = document.querySelector(".current-score-p2");
let p1Header = document.querySelector(".p1-header");
let p2Header = document.querySelector(".p2-header");
let p1TotalScoreText = document.querySelector(".total-score-p1");
let p2TotalScoreText = document.querySelector(".total-score-p2");

//Assigning variables to both players current and total scores and hold bools.
let p1CurScore = 0;
let p1TotalScore = 0;
let holdp1 = false;

let p2CurScore = 0;
let p2TotalScore = 0;
let holdp2 = false;

//Boolean to determine whos turn it is.
let playerTurn = true;

//Variables for total scores for p1 and p2.
p1TotalScore = 0;
p2TotalScore = 0;

//Event listener for new game button.
newGame.addEventListener("click", () => {
  //Resetting current scores to begin new game.
  p1CurScore = 0;
  p2CurScore = 0;

  //Disabling the new game button.
  newGame.disabled = true;

  //Making roll dice and hold buttons visible.
  btnContainer.classList.remove("visible");

  //Enabling roll dice and hold buttons.
  rollDice.disabled = false;
  holdDice.disabled = false;

  //Resetting p1 and p2 header text and currentscore color.
  p1Header.textContent = "Player 1";
  p1Header.style.color = "#fff";
  p1CurScoreText.textContent = 0;
  p1CurScoreText.style.color = "#fff";

  p2Header.textContent = "Player 2";
  p2Header.style.color = "#333";
  p2CurScoreText.textContent = 0;
  p2CurScoreText.style.color = "#333";
});

////////////////////////////////////////////////////////////////////
//Event listener for roll dice button.
rollDice.addEventListener("click", () => {
  //Generate a random number between 1 and 6
  let randNum = Math.floor(Math.random() * 6) + 1;

  //Changing dice image to same as the random number generated
  dice.src = `assets/dice${randNum}.png`;

  //Adding the game logic.
  if (playerTurn) {
    //Checking to see if p1 score is less than 20, if true continue adding score.
    if (p1CurScore <= 20) {
      p1CurScore += randNum;
      p1CurScoreText.textContent = p1CurScore;

      //Checking to see if p1 current score is above 20, if true they lose.
      if (p1CurScore > 20) {
        p1CurScoreText.style.color = "red";
        p1Header.textContent = "BUST!";
        p2TotalScore++;
        p2TotalScoreText.textContent = p2TotalScore;
        rollDice.disabled = true;
        holdDice.disabled = true;
        newGame.disabled = false;
      }
    }
  }

  if (!playerTurn) {
    //Checking to see if p2 score is less than 20, if true continue adding score.
    if (p2CurScore <= 20) {
      p2CurScore += randNum;
      p2CurScoreText.textContent = p2CurScore;

      //Checking to see if p2 current score is above 20, if true they lose.
      if (p2CurScore > 20) {
        p2CurScoreText.style.color = "red";
        p2Header.textContent = "BUST!";
        p1TotalScore++;
        p1TotalScoreText.textContent = p1TotalScore;
        rollDice.disabled = true;
        holdDice.disabled = true;
        newGame.disabled = false;
      }
    }
  }

  //Check to see if both players have the same current score and call a draw.
  if (p1CurScore === p2CurScore) {
    //Setting text and color for both players headers and changing button states.
    p1Header.style.color = "yellow";
    p2Header.style.color = "yellow";

    p1Header.textContent = "DRAW";
    p2Header.textContent = "DRAW";

    rollDice.disabled = true;
    holdDice.disabled = true;
    newGame.disabled = false;
  }

  //Check to see if either player has got to 5 total score.
  if (p1TotalScore === 5) {
    //Setting text and color for p1 header and resetting scores.
    p1Header.textContent = "WINNER!";
    p1Header.style.color = "green";

    p1TotalScore = 0;
    p1TotalScoreText.textContent = 0;

    p2TotalScore = 0;
    p2TotalScoreText.textContent = 0;
  } else if (p2TotalScore === 5) {
    //Setting text and color for p2 header and resetting scores.
    p2Header.textContent = "WINNER!";
    p2Header.style.color = "green";

    p1TotalScore = 0;
    p1TotalScoreText.textContent = 0;

    p2TotalScore = 0;
    p2TotalScoreText.textContent = 0;
  }
});

///////////////////////////////////////////////////////////////////
//Event listener for the hold dice button.
holdDice.addEventListener("click", () => {
  //Checking if its p1's turn, if true p1 HOLD's, if false p2 HOLD's
  if (playerTurn) {
    playerTurn = false;
    p1Header.textContent = "HOLDING";
  } else {
    playerTurn = true;
    p2Header.textContent = "HOLDING";
  }
});
