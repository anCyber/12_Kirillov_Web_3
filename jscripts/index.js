const GRAY = 0;
const YELLOW = 1;
const GREEN = 2;

const MIN_NUMBER = 10000
const MAX_NUMBER = 100000

function digitfyNumber(number) {
    let firstDigit = Math.floor(number / 10000);
    let secondDigit = Math.floor(number / 1000) - (firstDigit * 10);
    let thirdDigit = Math.floor(number / 100) - (secondDigit * 10) - (firstDigit * 100);
    let fourthDigit = Math.floor(number / 10) - (thirdDigit * 10) - (secondDigit * 100) - (firstDigit * 1000);
    let fifthDigit = number - (fourthDigit * 10) - (thirdDigit * 100) - (secondDigit * 1000) - (firstDigit * 10000);

    let digitfiedNumber = [firstDigit, secondDigit, thirdDigit, fourthDigit, fifthDigit];
    return digitfiedNumber;
}

function checkInput(userInput) {
    for (let symbol of userInput) {
        if ((symbol.charCodeAt(0) < 48) || (symbol.charCodeAt(0) > 57)) {
            alert("Вводи только цифры!");
            userInput = prompt(`${allGuessesString}\n Давай ещё раз. Введи 5-значное число:`);
            checkInput(userInput);
        }
        else {
            return;
        }
    }
}


function startGame() {
    if (!confirm("Будешь в Numble?")){
        alert("Ну и зачем тогда вообще жмал...");
        return;
    }

    const numbleAnswer = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER)) + MIN_NUMBER;
    const numbleAnswerDigits = digitfyNumber(numbleAnswer);
    
    let allGuessesString = "";

    let usersGuess = -1;
    while (usersGuess != numbleAnswer) {
        usersGuess = prompt(`${allGuessesString}\n Введи 5-значное число:`);
        checkInput(usersGuess);

        if (usersGuess == null) {
            alert(`Не хочешь значит играть((. Если что загаданным числом было: ${numbleAnswer}. Пока!`);
            return;
        }

        if ((usersGuess < MIN_NUMBER) || (usersGuess >= MAX_NUMBER) || (usersGuess == NaN)) {
            alert("ало число должно быть пятизначным");
        }
        else {
            let usersGuessDigitsArray = digitfyNumber(usersGuess);
            let digitCorrectColors = checkAnswer(usersGuessDigitsArray, numbleAnswerDigits);
                
            allGuessesString += `${usersGuess} | ${digitCorrectColors}\n`;
        }
    }
    alert(`Точно! Числом и вправду было ${numbleAnswer}. Пока!`);
}


function checkAnswer(usersGuess, answer) {
    let COLORS = [GRAY, GRAY, GRAY, GRAY, GRAY];
    let wereAnswerDigitsTypedArray = [false, false, false, false, false];
    let wereGuessDigitsTypedArray = [false, false, false, false, false];

    for (let digitIndex = 0; digitIndex < 5; digitIndex++) {
        if (usersGuess[digitIndex] == answer[digitIndex]) {
            COLORS[digitIndex] = GREEN;
            wereAnswerDigitsTypedArray[digitIndex] = true;
            wereGuessDigitsTypedArray[digitIndex] = true;
        }
    }

    for (let digitIndex = 0; digitIndex < 5; digitIndex++) {
        if (wereGuessDigitsTypedArray[digitIndex] == true) {
            continue;
        }
        else {
            for (let iteratingDigitIndex = 0; iteratingDigitIndex < 5; iteratingDigitIndex++) {
                if ((wereAnswerDigitsTypedArray[iteratingDigitIndex] == false) && (usersGuess[digitIndex] == answer[iteratingDigitIndex])) {
                    COLORS[digitIndex] = YELLOW;
                    wereAnswerDigitsTypedArray[iteratingDigitIndex] = true;
                    break;
                }
            }
        }
    }
    return COLORS;
}


const game_activation_button = document.getElementById("game_activation");
game_activation_button.addEventListener("click", startGame);