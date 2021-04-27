const gameData = require("./gameData");

let lettersTrackingList = [];
let mysteryWord = [];
let mysteryWordFull = "";
let mysteryWordArray = [];
let letterNotFoundCount = 0;
let plainMysteryWord = "";
let startDateTime  = new Date();
let endDateTime = new Date();
let gameTimeCompleted = 0;
let mysteryWordCategory = "";

// list of complete alphabet with status //Should this go to the database?
const alphabet = [
    {"letter": "A", "status": false},
    {"letter": "B", "status": false},
    {"letter": "C", "status": false},
    {"letter": "D", "status": false},
    {"letter": "E", "status": false},
    {"letter": "F", "status": false},
    {"letter": "G", "status": false},
    {"letter": "H", "status": false},
    {"letter": "I", "status": false},
    {"letter": "J", "status": false},
    {"letter": "K", "status": false},
    {"letter": "L", "status": false},
    {"letter": "M", "status": false},
    {"letter": "N", "status": false},
    {"letter": "O", "status": false},
    {"letter": "P", "status": false},
    {"letter": "Q", "status": false},
    {"letter": "R", "status": false},
    {"letter": "S", "status": false},
    {"letter": "T", "status": false},
    {"letter": "U", "status": false},
    {"letter": "V", "status": false},
    {"letter": "W", "status": false},
    {"letter": "X", "status": false},
    {"letter": "Y", "status": false},
    {"letter": "Z", "status": false}
];


async function saveUserScore() {
    const saveGameData = {
        "startDateTime": startDateTime,
        "endDateTime": endDateTime,
        "word": mysteryWordFull,
        "letterNotFoundCount": letterNotFoundCount,
        "timeCompleted": gameTimeCompleted
    }

    return await saveGameData;
}

async function initializeGameVariables() {   

    //googled up, this is the only way I found that physical copys an array
    lettersTrackingList = JSON.parse(JSON.stringify(alphabet));  

    let mysteryWordFromDb = await gameData.getMysteryWordFromDb();

    //console.log("mysteryWordFromDb = ", mysteryWordFromDb[0].word.split(""));
    
    mysteryWordFull = mysteryWordFromDb[0].word;
    mysteryWord = mysteryWordFromDb[0].word.split("");

    mysteryWordCategory = mysteryWordFromDb[0].category;

    /*    
    FOR TESTING
    console.log("Word from DB = ", mysteryWordFull);

    mysteryWordFull = "AEGEAN";
    mysteryWord = "AEGEAN".split("");
    */    

    mysteryWordArray = [];
    mysteryWord.forEach((letter) => {
        let letterStatus = {}   
        letterStatus.letter = letter;
        letterStatus.status = false;
        mysteryWordArray.push(letterStatus);
    })

    buttonDisable = false;
    findLetter = "";
    letterNotFoundCount = 0;

    plainMysteryWord = trackLettersForDisplay();

    const gameProgressResult = {
        "gameFeedback": "",
        "plainMysteryWord": plainMysteryWord,
        "mysteryWordCategory": mysteryWordCategory,
        "imageFile": "../images/Hangman0.jpg",
        "letterNotFoundCount": 0,
        "buttonDisable": false
    }    

    startDateTime = new Date();
    endDateTime = new Date();

    return gameProgressResult;    
}

function calculateGameTime(startTime, endTime) {
    let timeDiffInSecs = (endTime.getTime() - startTime.getTime()) / 1000;
    
    return Math.abs(Math.round(timeDiffInSecs))
}

function setLetterStatus(findLetter) {
    
    let letterStatusResult = {
        "letterFound": false,
        "letterAlreadySelected": false
    }
    
    let indexOfResult = -1;

    indexOfResult = lettersTrackingList.findIndex(x => x.letter === findLetter);

    if (indexOfResult >= 0) {
        if (lettersTrackingList[indexOfResult].status) {
            letterStatusResult.letterAlreadySelected = true;
        }
        else {            
                lettersTrackingList[indexOfResult].status = true; 
                mysteryWordArray.forEach(element =>  {
                    if (element.letter === findLetter) {
                        element.status = true;
                        letterStatusResult.letterFound = true;
                    }               
                });
            }
    }

    return letterStatusResult;
}

function determineGameProgress(findLetter) {

    const gameProgressResult = {
        "gameFeedback": "",
        "plainMysteryWord": "",
        "mysteryWordCategory": "",
        "imageFile": "",
        "letterNotFoundCount": 0,
        "buttonDisable": false
    }

    let letterStatusResult = setLetterStatus(findLetter);

    gameProgressResult.mysteryWordCategory = mysteryWordCategory;
    gameProgressResult.letterNotFoundCount = letterNotFoundCount;
    gameProgressResult.imageFile = "../images/Hangman" + letterNotFoundCount.toString() + ".jpg";

    let plainMysteryWord = "";

    if (letterStatusResult.letterAlreadySelected) {
        gameProgressResult.gameFeedback = findLetter + " was previously guessed, please enter another letter.";
    }
    else {

        if (letterStatusResult.letterFound) {
            gameProgressResult.gameFeedback = "Good job, you guessed a valid letter.";
        }
        else {
            letterNotFoundCount++;

            gameProgressResult.letterNotFoundCount = letterNotFoundCount;

            gameProgressResult.gameFeedback = "Too bad, you guessed an invalid letter.";

            gameProgressResult.imageFile = "../images/Hangman" + letterNotFoundCount.toString() + ".jpg";
        }
    }

    gameProgressResult.plainMysteryWord = plainMysteryWord = trackLettersForDisplay();
        
    if (letterNotFoundCount === 6) {
        gameProgressResult.gameFeedback = "Game Over!!!!  Mystery word was " + mysteryWordFull;
        gameProgressResult.buttonDisable = true;
    }
    else {
        if (plainMysteryWord === mysteryWordFull) {

            //get end time
            endDateTime = new Date();

            gameTimeCompleted = calculateGameTime(startDateTime, endDateTime);

            gameProgressResult.gameFeedback = "Great!  You guessed the mystery word in " + gameTimeCompleted + " seconds";
            gameProgressResult.buttonDisable = true;
        }
    }

    return gameProgressResult;
};

function trackLettersForDisplay() {
    let unmaskWord = "";

    for (i=0; i < mysteryWordArray.length; i++) {
        if (mysteryWordArray[i].status === false) {
            unmaskWord += "-";
        }
        else {       
            unmaskWord += mysteryWordArray[i].letter;
        }
    };

    return unmaskWord;
}

module.exports = {
    initializeGameVariables,
    determineGameProgress,
    saveUserScore
}