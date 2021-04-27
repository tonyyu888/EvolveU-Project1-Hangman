function fillScores(updateScoresObject) {
    updateScoresObject.forEach((score, i) => {

        let x = i + 1;

        let playerId = document.getElementById("player" + x);
        playerId.innerHTML = score.userInitial;
    
        let dateId = document.getElementById("date" + x);
        dateId.innerHTML = score.startDateTime.substring(0, 10);
        
        let wordId = document.getElementById("word" + x);
        wordId.innerHTML = score.word;
    
        let timeId = document.getElementById("time" + x);
        timeId.innerHTML = score.timeCompleted;
    })
};

function updateMysteryWord(updatedWordObject) {

//    console.log("updatedWordObject.gameProgressResult.plainMysteryWord = ", updatedWordObject.gameProgressResult.mysteryWordCategory);

    let userInputLetter = document.getElementById("userInput");

    let mysteryWordId = document.getElementById("mysteryWord");
    mysteryWordId.innerHTML = updatedWordObject.gameProgressResult.plainMysteryWord;

    let categoryId = document.getElementById("mysteryWordCategory");
    categoryId.innerHTML = updatedWordObject.gameProgressResult.mysteryWordCategory;

    let hagmanImageId = document.getElementById("hangmanImage");
    hagmanImageId.src = updatedWordObject.gameProgressResult.imageFile;

    let gameMessageId = document.getElementById("gameMessage");
    gameMessageId.innerHTML = updatedWordObject.gameProgressResult.gameFeedback;

    let submitLetterId = document.getElementById("submitLetter");
    submitLetterId.disabled = updatedWordObject.gameProgressResult.buttonDisable;

    let saveScorePromptId = document.getElementById("saveScorePrompt");
    if (updatedWordObject.gameProgressResult.buttonDisable && updatedWordObject.gameProgressResult.gameFeedback.substring(0, 9) !== "Game Over") {
        saveScorePromptId.style.display = "block";
    }
    else {
        saveScorePromptId.style.display = "none";
    }

    userInputLetter.value = "";
    userInputLetter.value.trim();
    userInputLetter.focus();
};

function refreshScreen(updatedWordObject) {
    let userInputLetter = document.getElementById("userInput");

    //console.log("updatedWordObject.gameProgressResult.plainMysteryWord = ", updatedWordObject.gameProgressResult.mysteryWordCategory);

    let mysteryWordId = document.getElementById("mysteryWord");
    mysteryWordId.innerHTML = updatedWordObject.gameProgressResult.plainMysteryWord;

    let categoryId = document.getElementById("mysteryWordCategory");
    categoryId.innerHTML = updatedWordObject.gameProgressResult.mysteryWordCategory;

    let hagmanImageId = document.getElementById("hangmanImage");
    hagmanImageId.src = updatedWordObject.gameProgressResult.imageFile;

    let gameMessageId = document.getElementById("gameMessage");
    gameMessageId.innerHTML = updatedWordObject.gameProgressResult.gameFeedback;

    let submitLetterId = document.getElementById("submitLetter");
    submitLetterId.disabled = updatedWordObject.gameProgressResult.buttonDisable;

    let saveScorePromptId = document.getElementById("saveScorePrompt");
    saveScorePromptId.style.display = "none";

    let userInputId = document.getElementById("userInput");
   
    userInputId.value = "";
    userInputLetter.focus();
};

function submitLetter() {
    let userInputLetter = document.getElementById("userInput");

    if (userInputLetter.value.trim() === "") {
        userInputLetter.value = "";
        userInputLetter.focus();
        return false;
    };

    fetch('/submitUserSelection?userLetter=' + userInputLetter.value)
    .then((response) => {
        return response.json()                
    })
    .then((updatedWordObject) => {
        updateMysteryWord(updatedWordObject);
    })
};

function restartGame() {

    fetch('/restartGame')
    .then((response) => {
        return response.json()                
    })
    .then((updatedWordObject) => {
        refreshScreen(updatedWordObject);
    })
}

function loadGamePage() {
    location.href = "gamePage.html";                
}

function startGame() {

    fetch('/restartGame')
    .then((response) => {
        return response.json()                
    })
    .then((updatedWordObject) => {
//        location.href = "gamePage.html";                
        refreshScreen(updatedWordObject);
    })
}

function submitScore() {
    let userInitial = document.getElementById("userInitial");

    fetch('/submitScore?userInitial=' + userInitial.value)
    .then((response) => {

        response.json().then(jsonResult => {
            if (jsonResult.status === 'success') {
                location.href = "index.html";
            }    
        })
    })
};

function getScores() {

    fetch('/getScores')
    .then((response) => {
        return response.json()                
    })
    .then((updatedScoresObject) => {

        fillScores(updatedScoresObject);

    })
};