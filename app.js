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
    '1': './images/Hello-Kitty-01.svg',
    '2': './images/Hello-Kitty-02.svg',
    '3': './images/Hello-Kitty-03.svg',
    '4': './images/Hello-Kitty-04.svg',
    '5': './images/Hello-Kitty-05.svg',
    '6': './images/Hello-Kitty-06.svg',
    '7': './images/Hello-Kitty-07.svg',
    '8': './images/Hello-Kitty-08.svg',
    'frontCard': './images/Hello-Kitty-20.svg'
};  

let firstCard, twoCardsSel, timer, timeLeft, totalMatched, totalGuesses;

let cardVal = [];


//setinterval to update timer


function updateTimer() {
    const clockTimer = document.querySelector('h2');
    clockTimer.innerHTML = 'Timer: ' + timeLeft;
    if (timeLeft === 0) {
        timeLeft = null;
        clearInterval(timer);
        clockTimer.innerHTML = `Time's Up!`;
        return;
    }
    timeLeft--;
}

initialize();

//run handleMove function when card is clicked
document.getElementById('hkcards').addEventListener('click', handleMove);
//when button element is clicked.. run initialize function
const playAgainBtn = document.querySelector('button');
playAgainBtn.addEventListener('click', initialize);

function initialize() {
    const cardEls = document.querySelectorAll('img');
    timer = null;
    firstCard = null;
    twoCardsSel = null;
    totalMatched = 0;
    timeLeft = 60;
    cardEls.forEach(function(el) {
        el.setAttribute('src', `${cardImg['frontCard']}`);
        el.classList.remove('back-of-card');
    });
    cardVal = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    //Shuffle Card Function
    shuffle(cardVal);
    console.log(cardVal); 
}

function handleMove(evt) {
    const cardSel = parseInt(evt.target.id.replace('card-',''));
    const currentCardEl = document.getElementById(evt.target.id);
    let firstCardEl;
    console.log(evt.target.id);
    //if cardSel is not a number, do nothing (because it's not a card)
    if (isNaN(cardSel) || twoCardsSel || cardVal[cardSel] === 'matched' || !timeLeft) {
        return;
    }

    if (!timer) {
        timer = setInterval(updateTimer, 1000);
    }

    currentCardEl.setAttribute('src', `${cardImg[cardVal[cardSel]]}`);
    currentCardEl.classList.add('back-of-card');

    console.log('cardSel:' + cardSel + ', cardVal: ' + cardVal[cardSel]);
    if (firstCard === null) {
        firstCard = cardSel; 
    } else {
        if (firstCard === cardSel) {
            console.log('same card');
            return;
        }
        firstCardEl = document.getElementById(`card-${firstCard}`) 

        if (cardVal[firstCard] === cardVal[cardSel]) {
            cardVal[firstCard] = 'matched' ;
            cardVal[cardSel] = 'matched';
            firstCard = null;
            totalMatched++;
            console.log('matched');
        }
        else {
            twoCardsSel = true;
            const gameMsg = document.querySelector('h3');
            gameMsg.innerHTML = 'Not a Match';
            setTimeout(function() {
                firstCardEl.setAttribute('src', `${cardImg['frontCard']}`);
                currentCardEl.setAttribute('src', `${cardImg['frontCard']}`);
                firstCardEl.classList.remove('back-of-card');
                currentCardEl.classList.remove('back-of-card');
                console.log('no match');
                firstCard = null;
                twoCardsSel = null;
                gameMsg.innerHTML = '&nbsp';
            }, 1500); 
        }

    }

}

function renderMsg() {
    
}







