console.log('thank you for playing my game :)');

var gameBoard = {
  oneOne: document.querySelector('.game-square11'),
  oneTwo: document.querySelector('.game-square12'),
  oneThree: document.querySelector('.game-square13'),
  oneFour: document.querySelector('.game-square14'),
  twoOne: document.querySelector('.game-square21'),
  twoTwo: document.querySelector('.game-square22'),
  twoOThree: document.querySelector('.game-square23'),
  twoFour: document.querySelector('.game-square24'),
  threeOne: document.querySelector('.game-square31'),
  threeTwo: document.querySelector('.game-square32'),
  threeThree: document.querySelector('.game-square33'),
  threeFour: document.querySelector('.game-square34'),
  fourOne: document.querySelector('.game-square41'),
  fourTwo: document.querySelector('.game-square42'),
  fourThree: document.querySelector('.game-square43'),
  fourFour: document.querySelector('.game-square44')
}

var enemyImage = "<img class='enemy' src='enemy.gif'>"
var explosionImage = "<img class='explosion' src='explosion.gif'>"
var enemy = document.querySelector('.enemy')
var score = document.querySelector('.score')
var highScore = document.querySelector('.high-score')
var startButton = document.querySelector('.start-button')
var timer = document.querySelector('.timer')
var totalTime = 20

// listens for click on entire document
document.addEventListener('click',function(element){
  // checks class name of clicked element
    if(element.target.className == 'start-button'){
      score.innerHTML = 0
      timer.innerHTML = 'go!'
      newSquare()
      startButton.style = 'display: none'
      timer.style = 'display: block'
      startCountdown()
    }
    else if(element.target.className == 'enemy'){
      explodeEnemy()
      moveEnemy()
    }
 })

function startCountdown() {
  var total = totalTime
  var countdown = setInterval(function(){
    timer.innerHTML = total
    total --
    if (total < 5) {
      timer.style = 'display:block; color: red; -webkit-animation: blink-animation 1s steps(5, start) infinite;'
    }
    if (total < 0) {
      removeEnemy()
      clearInterval(countdown)
      timer.style = 'display: block; grid-row: 3/6'
      timer.innerHTML = 'game<br>over'
      startButton.innerHTML = 'play again'
      startButton.style = 'display: block'
      // check high high score
      if (Number(score.innerHTML) > Number(highScore.innerHTML)) {
        highScore.innerHTML = score.innerHTML
      }
    }
  }, 1000)
}

function newSquare() {
  // makes array of all board square names
  var boardSquares = Object.keys(gameBoard)
  // finds a random board square name
  var random = boardSquares[Math.floor(Math.random() * (boardSquares.length))]
  // sets enemy on random square
  return gameBoard[random].innerHTML = enemyImage
}

function explodeEnemy() {
  document.querySelector('.enemy').parentElement.style = "background-image: url('explosion.gif'); background-size: 50px 50px; background-repeat: no-repeat"
  setTimeout(function(){
    var gameBoard = document.querySelector('.game-board').children
    for (var i = 0; i < gameBoard.length; i++) {
      gameBoard[i].style = ''
    }
  }, 700)
}

// to find enemy position and remove contents of parent div
function removeEnemy() {
  document.querySelector('.enemy').parentElement.innerHTML = ''
}

function moveEnemy() {
  score.innerHTML = Number(score.innerHTML) + 1
  removeEnemy()
  newSquare()
}

// bugs/ to do
// better explosion logic, not using backgrounds
// make blinking start button 100% clickable
// if/else to check if new square is same as previous to prevent overlap
// levels? if timer reaches 0 and score > some#, add more time to play
