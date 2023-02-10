//Shuffle Function for Cards
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
} 

// Code Begins Here
const cardImg = {
    '1': './images/Hello-Kitty-03.svg',
    '2': './images/Hello-Kitty-08.svg',
    '3': './images/Hello-Kitty-11.svg',
    '4': './images/Hello-Kitty-12.svg',
    '5': './images/Hello-Kitty-22.svg',
    '6': './images/Hello-Kitty-27.svg',
    '7': './images/Hello-Kitty-28.svg',
    '8': './images/Hello-Kitty-155.svg',
    'frontCard': './images/Hello-Kitty-20.svg'
};  

let firstCard, twoCardsSel, timer, timeLeft, totalMatched, totalGuesses, finalResult;

let cardVal = [];

initialize();

//event listeners
const playAgainBtn = document.querySelector('button');
//run handleMove function when card is clicked
document.getElementById('hkcards').addEventListener('click', handleMove);
//when button element is clicked.. run initialize function
playAgainBtn.addEventListener('click', initialize);



function initialize() {
    const hkcardsEl = document.getElementById('hkcards');
    const cardEls = hkcardsEl.querySelectorAll('img');
    clearInterval(timer);
    timer = null;
    firstCard = null;
    twoCardsSel = null;
    finalResult = null;
    totalGuesses = 0;
    totalMatched = 0;
    timeLeft = 60;
    document.querySelector('h3').innerHTML = 'Timer: 01:00';
    document.querySelector('h4').innerHTML = '&nbsp;';
    cardEls.forEach(function(el) {
        el.setAttribute('src', `${cardImg['frontCard']}`);
        el.classList.remove('back-of-card');
    });
    cardVal = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    shuffle(cardVal);
    renderMsg();
}

function handleMove(evt) {
    const cardSel = parseInt(evt.target.id.replace('card-',''));
    const currentCardEl = document.getElementById(evt.target.id);
    let firstCardEl;

    //if cardSel is not a number, do nothing (because it's not a card)
    if (isNaN(cardSel) || twoCardsSel || cardVal[cardSel] === 'matched' || !timeLeft) {
        return;
    }

    if (!timer) {
        timer = setInterval(updateTimer, 1000);
    }

    //flip current card to back side
    currentCardEl.setAttribute('src', `${cardImg[cardVal[cardSel]]}`);
    currentCardEl.classList.add('back-of-card');

    //if this isn't the first card
    if (firstCard === null) {
        firstCard = cardSel; 
    } else {
        //if user is clicking the same card as the first card
        if (firstCard === cardSel) {
            return;
        }
        //store the id element for the firstCard
        firstCardEl = document.getElementById(`card-${firstCard}`) 

        //if the first and second card selected match
        if (cardVal[firstCard] === cardVal[cardSel]) {
            cardVal[firstCard] = 'matched' ;
            cardVal[cardSel] = 'matched';
            totalMatched++;
        }
        else {
            //if the first and second card selected don't match
            twoCardsSel = true;
            const gameMsg = document.querySelector('h4');
            gameMsg.innerHTML = 'Not a Match';
            setTimeout(function() {
                firstCardEl.setAttribute('src', `${cardImg['frontCard']}`);
                currentCardEl.setAttribute('src', `${cardImg['frontCard']}`);
                firstCardEl.classList.remove('back-of-card');
                currentCardEl.classList.remove('back-of-card');
                twoCardsSel = null;
                if (!finalResult) {
                gameMsg.innerHTML = '&nbsp';
                }
            }, 1500); 
        }
        totalGuesses++;
        firstCard = null;

    }
    finalResult = getFinalResult();
    renderMsg();
    
}

//setinterval to update timer
function updateTimer() {
    const clockTimer = document.querySelector('h3');
    if (timeLeft <= 0) {
        timeLeft = null;
        clearInterval(timer);
        clockTimer.innerHTML = `Time's Up!`;
        finalResult = getFinalResult();
        renderMsg();
        return;
    }
    timeLeft--;
    if (timeLeft >= 10) {
    clockTimer.innerHTML = 'Timer: 00:'+ timeLeft;
    }
    else {
        clockTimer.innerHTML = 'Timer: 00:0'+ timeLeft;
    }
}


function getFinalResult() {
    const hkcardsEl = document.getElementById('hkcards');
    const cardEls = hkcardsEl.querySelectorAll('img');
    if (totalMatched === cardEls.length/2) {
        clearInterval(timer);
        return 'winner';
    }
    else if (!timeLeft) {
        return 'loser';
    }
}


function renderMsg() {
    const guessMsg = document.querySelector('h2');
    const gameMsg = document.querySelector('h4');

    guessMsg.innerHTML = 'Guesses: '+totalGuesses;

    if (finalResult) {
        if (finalResult === 'winner') {
            gameMsg.innerHTML = 'Congratulations, You Won!';
        }
        else if (finalResult === 'loser') {
            gameMsg.innerHTML = 'Sorry, Not a Winner!';
        }
        else {
            gameMsg.innerHTML = 'Your Game is Broken! Report to Gamemaker!';
        }
    }
}







