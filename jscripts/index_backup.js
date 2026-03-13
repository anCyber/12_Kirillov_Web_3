
let KEYS = ["first", "second", "third", "fourth", "fifth"];

// 0 = grey; 1 = yellow; 2 = green;
let GUESSED_COLORS = {
    [KEYS[0]]: 0,
    [KEYS[1]]: 0,
    [KEYS[2]]: 0,
    [KEYS[3]]: 0,
    [KEYS[4]]: 0
};



/* Creates an object consisting every digit of a given number as a separate key */ 
function digitfyNumber(number) {
    let firstDigit = Math.floor(number / 10000);
    let secondDigit = Math.floor(number / 1000) - (firstDigit * 10);
    let thirdDigit = Math.floor(number / 100) - (secondDigit * 10) - (firstDigit * 100);
    let fourthDigit = Math.floor(number / 10) - (thirdDigit * 10) - (secondDigit * 100) - (firstDigit * 1000);
    let fifthDigit = number - (fourthDigit * 10) - (thirdDigit * 100) - (secondDigit * 1000) - (firstDigit * 10000);

    let digitfiedNumber = {
        [KEYS[0]]: firstDigit,
        [KEYS[1]]: secondDigit,
        [KEYS[2]]: thirdDigit,
        [KEYS[3]]: fourthDigit,
        [KEYS[4]]: fifthDigit
    };
    return digitfiedNumber;
}




function startGame() {
    const MIN_NUMBER = 10000;
    const MAX_NUMBER = 100000;
    const numleAnswer = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER);
    const numleAnswerDigits = digitfyNumber(numleAnswer);

    //let repeatingDigitsInAnswer = checkForRepeatingDigits(numleAnswerDigits);

    let usersGuess = parseInt(prompt(`Правильное число: [${numleAnswer}]. COLORS: [${GUESSED_COLORS[KEYS[0]]}][${GUESSED_COLORS[KEYS[1]]}][${GUESSED_COLORS[KEYS[2]]}][${GUESSED_COLORS[KEYS[3]]}][${GUESSED_COLORS[KEYS[4]]}]   Введите пятизначное число:`));
    let usersGuessDigits = digitfyNumber(usersGuess);
    //let repeatingDigitsInGuess = checkForRepeatingDigits(usersGuessDigits);
    checkAnswer(usersGuessDigits, numleAnswerDigits,/* repeatingDigitsInGuess, repeatingDigitsInAnswer*/);
    
    while(usersGuess != numleAnswer) {
        usersGuess = parseInt(prompt(`Правильное число: [${numleAnswer}]. COLORS: [${GUESSED_COLORS[KEYS[0]]}][${GUESSED_COLORS[KEYS[1]]}][${GUESSED_COLORS[KEYS[2]]}][${GUESSED_COLORS[KEYS[3]]}][${GUESSED_COLORS[KEYS[4]]}]   Введите пятизначное число:`));
        usersGuessDigits = digitfyNumber(usersGuess);
        //repeatingDigitsInGuess = checkForRepeatingDigits(usersGuessDigits);
        checkAnswer(usersGuessDigits, numleAnswerDigits,/* repeatingDigitsInGuess, repeatingDigitsInAnswer*/);
    }
}

function checkAnswer(usersGuessDigits, numleAnswerDigits,/* repeatingDigitsInGuess, repeatingDigitsInAnswer*/) {
    GUESSED_COLORS = {
        [KEYS[0]]: 0,
        [KEYS[1]]: 0,
        [KEYS[2]]: 0,
        [KEYS[3]]: 0,
        [KEYS[4]]: 0
    };   

    for (digitKey of KEYS) {
        for (correctDigitKey of KEYS) {
            
            if (usersGuessDigits[digitKey] == numleAnswerDigits[correctDigitKey]) {
                if ((digitKey == correctDigitKey) && (GUESSED_COLORS[correctDigitKey] != 2)) {
                    GUESSED_COLORS[correctDigitKey] = 2;  // Paint position green if the indexes are the same;
                }
                else {
                    GUESSED_COLORS[correctDigitKey] = 1;  // Otherwise paint in yellow;
                }

            }
        }
    }

}



/*if (repeatingDigitsInAnswer[correctDigitKeyKey] > 1) {     To perform actions if the digits are repeating
    if (repeatingDigitsInGuess[digitKey] > 1) {
                        
    }
}*/












function checkForRepeatingDigits(numleAnswerDigits) {   
    let digitRepeats = {
        [numleAnswerDigits[KEYS[0]]]: 0,
        [numleAnswerDigits[KEYS[1]]]: 0,
        [numleAnswerDigits[KEYS[2]]]: 0,
        [numleAnswerDigits[KEYS[3]]]: 0,
        [numleAnswerDigits[KEYS[4]]]: 0
    };
    let skipRepeatedKeys = [];

    for (repeatingDigitKey of KEYS) {
        if (repeatingDigitKey in skipRepeatedKeys) {
            continue;
        }
        for (iteratingDigitKey of KEYS) {
            if (numleAnswerDigits[repeatingDigitKey] == numleAnswerDigit[iteratingDigitKey]) {
                digitRepeats[numleAnswerDigits[repeatingDigitKey]] ++;
                skipRepeatedKeys.push(iteratingDigitKey);
            }
        }
    }
    return digitRepeats;
}














const game_activation_button = document.getElementById("game_activation");
game_activation_button.addEventListener("click", startGame);