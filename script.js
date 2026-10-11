//DOM ELEMNTS 
const gameBrd = document.getElementById("gameBoard");
const movesDis = document.getElementById("movesDisplay");
const matchesDis = document.getElementById("matchesDisplay");
const btnRestart = document.getElementById("restartBtn");
let firstCard = null;
let secondCard = null;
let moves = 0;
let matches = 0;

//ARRAY
const cardValues = ["🐶", "🐱", "🐵", "🦊", "🐯", "🐼", "🐹", "🐮", "🐶", "🐱", "🐵", "🦊", "🐯", "🐼", "🐹", "🐮"];

//SHUFFLE ARRAY 
function shuffleCards() {
    cardValues.sort(function (a, b) {
        return Math.random() - 0.5;
    });
}

//BOARD FUNCTION
function createBoard() {
    cardValues.forEach(function (value) {
        const li = document.createElement('li');

        li.classList.add("card");
        li.dataset.cardValues = value;
        li.textContent = "?";

        li.addEventListener("click", function () {

            // ignore clicks while two cards are already face up (during the delay)
            if (secondCard !== null) {
                return;
            }
            // ignore cards that were already matched
            if (li.classList.contains("matched")) {
                return;
            }
            // ignore a second click on the same card
            if (li === firstCard) {
                return;
            }

            if (firstCard === null) {
                li.textContent = li.dataset.cardValues;
                firstCard = li;

            } else {
                li.textContent = li.dataset.cardValues;
                secondCard = li;
                moves = moves + 1; 
                movesDis.textContent = moves;

                if (firstCard.dataset.cardValues === secondCard.dataset.cardValues) {
                    // match: keep both face up and reset for the next pair
                    firstCard.classList.add("matched");
                    secondCard.classList.add("matched");
                    matches = matches + 1;
                    matchesDis.textContent = matches;

                    if (matches === 8) {
                        alert("you win!");
                    }

                    firstCard = null;
                    secondCard = null;

                } else {
                    // no match: wait 1 second, then flip both back
                    setTimeout(function () {
                        firstCard.textContent = "?";
                        secondCard.textContent = "?";
                        firstCard = null;
                        secondCard = null;
                    }, 1000);
                }
            }
        });
        gameBrd.appendChild(li);
    });
}

//RESTART BUTTON 
btnRestart.addEventListener("click", function(){
    gameBrd.innerHTML = '';
    firstCard = null 
    secondCard = null 
    moves = 0 
    matches = 0 
    movesDis.textContent = moves; 
    matchesDis.textContent = matches
    shuffleCards();
    createBoard();  
});

//START THE GAME
shuffleCards();
createBoard();