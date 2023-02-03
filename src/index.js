const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const startButton = document.querySelector("#start");
// TODO: Add the missing query selectors:
const score = document.querySelector("#score"); // Use querySelector() to get the score element
const timerDisplay = document.querySelector("#timer"); // use querySelector() to get the timer element.
//const audioHit = new Audio("./assets/hit.mp3");
//const audioStart = new Audio("./assets/cyber.mp3");

let time = 10;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "normal";

startButton.addEventListener("click", startGame);

/*
 * Generates a random integer within a range.
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 */
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  }
  if (difficulty === "normal") {
    return 1000;
  }
  if (difficulty === "hard") {
    return randomInteger(600, 1200);
  }
}

/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of
 * it (lastHole = hole) and return the hole
 *
 * Example:
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */

function chooseHole(holes) {
  // TODO: Write your code here.
  // 1. Generate a random integer from 0 to 8 and assign it to an index variable.
  // 2. Get a random hole with the random index (e.g., const hole = holes[index]).
  // 3. if hole === lastHole, then call chooseHole(holes) again because you don't want to return the same hole.
  // 4. if hole is not the same as the lastHole, then keep track of it (lastHole = hole) and return the hole.
  const index = randomInteger(0, 8);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

function toggleVisibility(hole) {
  // TODO: add hole.classList.toggle so that it adds or removes the 'show' class.
  hole.classList.toggle("show");
  return hole;
}

/**
 *
 * The purpose of this function is to show and hide the mole given
 * a delay time and the hole where the mole is hidden. The function calls
 * `toggleVisibility` to show or hide the mole. The function should return
 * the timeoutID
 *
 */
function showAndHide(hole, delay) {
  toggleVisibility(hole);
  // TODO: call the toggleVisibility function so that it adds the 'show' class.

  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    // TODO: call the toggleVisibility function so that it removes the 'show' class when the timer times out.
    gameOver();
  }, delay); // TODO: change the setTimeout delay to the one provided as a parameter
  return timeoutID;
}

/**
 * This function simply calls the `showAndHide` function with a specific
 * delay and hole. The function needs to call `setDelay()` and `chooseHole()`
 * to call `showAndHide(hole, delay)`.
 **/

function showUp() {
  let delay = setDelay(difficulty); // TODO: Update so that it uses setDelay()
  const hole = chooseHole(holes); // TODO: Update so that it use chooseHole()
  return showAndHide(hole, delay);
}

/**
 *
 * The purpose of this function is simply to determine if the game should
 * continue or stop. The game continues if there is still time `if(time > 0)`.
 * If there is still time then `showUp()` needs to be called again so that
 * it sets a different delay and a different hole. If there is no more time
 * then it should call the `stopGame()` function. The function also needs to
 * return the timeoutId if the game continues or the string "game stopped"
 * if the game is over.
 *
 *  // if time > 0:
 *  //   timeoutId = showUp()
 *  //   return timeoutId
 *  // else
 *  //   gameStopped = stopGame()
 *  //   return gameStopped
 *
 */

function gameOver() {
  if (time > 0) {
    timeoutID = showUp();
    return timeoutID;
  } else {
    let gameStopped = stopGame();
    return gameStopped;
  }
}

/**
 *
 * This is the function that starts the game when the `startButton`
 * is clicked.
 *
 */
function startGame() {
  showUp();
  points = 0;
  clearScore();
  setDuration(15);
  startTimer();
  //audioStart.currentTime = 1.5;
  //audioStart.play();
  //audioStart.volume = 0.3;
  setEventListeners();

  return "game started";
}

/**
 *
 * This function increments the points global variable and updates the scoreboard.
 * Use the `points` global variable that is already defined and increment it by 1.
 * After the `points` variable is incremented proceed by updating the scoreboard
 * that you defined in the `index.html` file. To update the scoreboard you can use
 * `score.textContent = points;`. Use the comments in the function as a guide
 * for your implementation:
 *
 */
function updateScore() {
  // TODO: Write your code here
  points++;
  // Increment the points global variable by 1 point
  score.textContent = points;
  // Update score.textContent with points.
  return points;
}

/**
 *
 * This function clears the score by setting `points = 0`. It also updates
 * the board using `score.textContent = points`. The function should return
 * the points.
 *
 */
function clearScore() {
  // TODO: Write your code here
  points = 0;
  score.textContent = points;
  return points;
}

/**
 *
 * This is the event handler that gets called when a player
 * clicks on a mole. The setEventListeners should use this event
 * handler (e.g. mole.addEventListener('click', whack)) for each of
 * the moles.
 *
 */
function whack() {
  // TODO: Write your code here.
  updateScore();
  //audioHit.currentTime = 0;
  //audioHit.play();
  return points;
}

/**
 *
 * Adds the 'click' event listeners to the moles. See the instructions
 * for an example on how to set event listeners using a for loop.
 */
function setEventListeners() {
  // TODO: Write your code here
  moles.forEach((mole) => mole.addEventListener("click", whack));
  return moles;
}

/**
 *
 * Starts the timer using setInterval. For each 1000ms (1 second)
 * the updateTimer function get called. This function is already implemented
 *
 */
function startTimer() {
  // TODO: Write your code here
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
 *
 * Updates the control board with the timer if time > 0
 *
 */
function updateTimer() {
  // TODO: Write your code here.
  // hint: this code is provided to you in the instructions.
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}

/**
 *
 * This function sets the duration of the game. The time limit, in seconds,
 * that a player has to click on the sprites.
 *
 */
function setDuration(duration) {
  time = duration;
  return time;
}

/**
 *
 * This function is called when the game is stopped. It clears the
 * timer using clearInterval. Returns "game stopped".
 *
 */
function stopGame() {
  //stopAudio(song);  //optional
  //audioStart.pause();
  //audioStart.currentTime = 0;
  clearInterval(timer);
  return "game stopped";
}

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
