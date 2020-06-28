const gameStart = document.querySelector('.gameStart .startGame');
const leftAnswer = document.querySelector('.right .answerLeft');
const rightAnswer = document.querySelector('.right .answerRight');
const gameOverScore = document.querySelector('.gameOver span');
const leftBg = document.querySelector('.left');
const rightBg = document.querySelector('.right');

const numberOfItems = 7;

const answers = [{
        img: 'img/car.jpeg',
        name: 'Samochód',
        date: 1886
    },
    {
        img: 'img/soccer.jpg',
        name: 'Piłka Nożna',
        date: 1866
    },
    {
        img: 'img/plane.jpg',
        name: 'Samolot',
        date: 1903
    },
    {
        img: 'img/aparat.jpg',
        name: 'Fotografia',
        date: 1839
    },
    {
        img: 'img/basketball.jpeg',
        name: 'Koszykówka',
        date: 1891
    },
    {
        img: 'img/moto.jpg',
        name: 'Motocykl',
        date: 1885
    },
    {
        img: 'img/hockey.jpg',
        name: 'Hokej',
        date: 1872
    }

];
// // answers[1].img;
// answers[1].img;

const images = ['img/car.jpeg', 'img/soccer.jpg', 'img/plane.jpg', 'img/aparat.jpg', 'img/basketball.jpeg', 'img/moto.jpg', 'img/hockey.jpg'];
const names = ['Samochód', 'Piłka Nożna', 'Samolot', 'Fotografia', 'Koszykówka', 'Motocykl', 'Hokej'];
const dates = [1886, 1886, 1903, 1839, 1891, 1885, 1872];

const leftImage = document.querySelector('.left img');
const rightImage = document.querySelector('.right img');

const leftName = document.querySelector('.left .name');
const rightName = document.querySelector('.right .name');

const leftDate = document.querySelector('.left .date');
const rightDate = document.querySelector('.right .date');

const questionLeft = document.querySelector('.right #questionItemLeft');
const questionRight = document.querySelector('.right #questionItemRight');

const scoreMeter = document.querySelector('.actuallPoints');
var score = 0;
var x = 0;
var y = 0;
var milliseconds;

function myFunction() {
    setTimeout(function () {
        alert("Hello");
    }, 2000);
}
//var stan = "start";
const gameWindows = [
    document.querySelector('.gameStart'),
    document.querySelector('.gameMain'),
    document.querySelector('.gameOver')
];

function gameBegin() {
    score = 0;
    gameWindows[0].classList.toggle('off');
    gameWindows[1].classList.toggle('off');
}

function gameOver() {
    gameWindows[1].classList.toggle('off');
    gameWindows[2].classList.toggle('off');
    gameOverScore.textContent = `Twój wynik to: ${score}`;
}

function gameReset() {
    gameWindows[2].classList.toggle('off');
    gameWindows[0].classList.toggle('off');
}

leftAnswer.addEventListener("click", function () {
    var result = checkAnswer("left");
    fTestowa(result);
});

rightAnswer.addEventListener("click", function () {
    var result = checkAnswer("right");
    fTestowa(result);
});


function randomNumbers() {
    var itemLeftIndex = Math.floor(Math.random() * 10) % numberOfItems;
    var itemRightIndex = Math.floor((Math.random() * 10)) % numberOfItems;
    while (itemRightIndex == itemLeftIndex) {
        itemRightIndex = Math.floor((Math.random() * 10)) % numberOfItems;
    }
    var arr = [itemLeftIndex, itemRightIndex];
    return arr;
}


function fTestowa(result) {
    if (result == "bad") {
        setTimeout(gameOver, 2000);
    } else {
        score++;
        scoreMeter.textContent = "Punkty: " + score;
        setTimeout(gameLogic, 2000);
    }
}

function gameLogic() {
    waitForAnswer();
    if (score == 0) {
        var indexes = randomNumbers();
    } else {
        var indexes = continueGame();
    }
    x = indexes[0];
    y = indexes[1];
    changes();
    // leftAnswer.disabled = false;
    // rightAnswer.disabled = false;
    // leftAnswer.disabled = true;
    // rightAnswer.disabled = true;
}

function continueGame() {

    var holder = x

    x = y;

    y = randomNumberRight();

    while (x == y || y == holder) {
        y = randomNumberRight();
    }

    var arr = [x, y];
    return arr;
}

function changes() {

    leftImage.src = answers[x].img;
    rightImage.src = answers[y].img;
    leftDate.textContent = "Data wynalezienia: " + answers[x].date;
    leftName.textContent = answers[x].name;
    rightName.textContent = answers[y].name;
    leftAnswer.textContent = answers[x].name;
    rightAnswer.textContent = answers[y].name;
    questionRight.textContent = answers[y].name;
    questionLeft.textContent = answers[x].name;
}

function checkCorrect() {
    var correct;
    if (answers[x].date > answers[y].date) {
        correct = "right";
    } else {
        correct = "left";
    }

    return correct;
};


function randomNumberRight() {
    var itemRightIndex = Math.floor(Math.random() * 10) % numberOfItems;
    return itemRightIndex;
}

function checkAnswer(side) {
    var correct = checkCorrect();
    var isGood;
    if (side == correct) {
        if (correct == "left") {
            goodAnswerLeft();
        } else {
            goodAnswerRight();
        }

        isGood = "good";
    } else {
        if (correct == "left") {
            badAnswerLeft();
        } else {
            badAnswerRight();
        }
        isGood = "bad";
    }
    return isGood;
}

function goodAnswerLeft() {
    leftBg.classList.add('correctAnswer');
}

function goodAnswerRight() {
    rightBg.classList.add('correctAnswer');
}

function badAnswerLeft() {
    leftBg.classList.add('badAnswer');
}

function badAnswerRight() {
    rightBg.classList.add('badAnswer');
}

document.querySelector('.gameOver button').addEventListener("click", function () {
    gameReset();
});

function waitForAnswer() {
    leftBg.classList.remove('correctAnswer');
    rightBg.classList.remove('correctAnswer');
    leftBg.classList.remove('badAnswer');
    rightBg.classList.remove('badAnswer');
}

gameStart.addEventListener("click", function () {
    gameBegin();
    gameLogic();
});