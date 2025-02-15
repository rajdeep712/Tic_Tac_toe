const moveAudio = new Audio("ting.mp3");
const gameOverAudio = new Audio("gameover.mp3");
let currTurn = 'X';
let gameOver = false;
const boxes = document.getElementsByClassName('box');

function changeTurn() {
    currTurn = currTurn === 'X' ? '0' : 'X';
    document.getElementById('turninfo').innerText = `Turn for ${currTurn}`;
}

wins = [
    [0,1,2,2.5,5,0],[3,4,5,2.5,15,0],[6,7,8,2.5,25,0],[0,3,6,-7.5,15,90],[1,4,7,2.5,15,90],[2,5,8,12.5,15,90],[0,4,8,2.5,15,45],[2,4,6,2.5,15,-45]
];
// Function to check if someone won
function checkWin() {
    wins.forEach((element) => {
        if((boxes[element[0]].innerText === boxes[element[1]].innerText) && (boxes[element[1]].innerText === boxes[element[2]].innerText) && boxes[element[0]].innerText != '') {
            gameOverAudio.play();
            gameOver = true;
            displayWinner(boxes[element[0]].innerText);
            playGifOn();
            playLineAnimation(element);
        }
    });
}
// Function to check if drawn happened
function checkDraw() {
    let isDraw = true;
    Array.from(boxes).forEach((element) => {
        if (element.innerText === '') {
            isDraw = false;
        }
    });
    if (isDraw && !gameOver) {
        gameOver = true;
        document.getElementById('turninfo').innerText = 'Match drawn';
    }
}
// Function to display the winner
function displayWinner(winner) {
    document.getElementById('turninfo').innerText = `${winner} won`;
}
// Function to play line animation
function playLineAnimation(element) {  
    document.getElementById('line').style.transform = `translate(${element[3]}vw,${element[4]}vw) rotate(${element[5]}deg)`;
    document.getElementById('line').style.width = '25vw';
}

// attach event listeners to all
function play() {
    Array.from(boxes).forEach((element) => {
        element.addEventListener('click',(e) => {
            if(gameOver) {
                document.getElementById('turninfo').innerText = 'Please reset first';
                return;
            }
            if(e.target.innerText == '') {
                moveAudio.play();
                e.target.innerText = currTurn;
                checkWin();
                checkDraw();
                if(!gameOver) {
                    changeTurn();
                }
            }
            else{
                alert('Space already filled');
            }
        });
    });
}
play();

// reset button function
function reset() {
    document.getElementById('reset').addEventListener('click' , () => {
        Array.from(boxes).forEach((element) => {
            element.innerText = '';
        });
        gameOver = false;
        currTurn = '0';
        changeTurn();
        playGifOff();
        // Line animation off
        document.getElementById('line').style.width = '0vw';
    });
}
reset();

function playGifOn() {
    document.getElementById('gif').style.opacity = 1;
}
function playGifOff() {
    document.getElementById('gif').style.opacity = 0;
}