const express = require('express')
const gameSetting = require("./model/gameSettings");
const gameScores = require("./model/gameScores");

const app = express();

let PORT = process.env.PORT || 3000;

app.use(express.json());
//app.use(express.static("./static"))

app.get('/submitUserSelection', async (req, res) => {
    try {
        const findLetter = req.query.userLetter.toUpperCase();

        gameProgressResult = await gameSetting.determineGameProgress(findLetter);

        res.send({gameProgressResult});
    }
    catch (error) {
        console.log(error);
        res.status(404).send("There is a problem in submitUserSelection endpoint.\n");
    }
})

app.get('/restartGame', async (req, res) => {
    try {
        gameProgressResult = await gameSetting.initializeGameVariables();
        res.send({gameProgressResult}); 
    }
    catch (error) {
        console.log(error);
        res.status(404).send("There is a problem in restartGame endpoint.\n");
    }    
})

app.get('/submitScore', async (req, res) => {
    try {
        const playerInitial = req.query.userInitial.toUpperCase();
        gameDataResult = await gameSetting.saveUserScore();

        await gameScores.addUserScore(playerInitial, gameDataResult.startDateTime, gameDataResult.endDateTime, gameDataResult.word, gameDataResult.letterNotFoundCount, gameDataResult.timeCompleted);

        //res.send("Score accepted.");
        //res.redirect("/getScores");
        //res.sendFile(__dirname + "/static/scores.html");

        await res.send({status: "success"});
    }
    catch (error) {
        console.log(error);
        res.status(404).send("There is a problem in submitScore endpoint.\n");
    }
})

app.get('/getScores', async (req, res) => {
    try {
        let scores = await gameScores.getScores();

        //console.log(await scores);
        //console.log(await scores.toArray());
        //res.send("Score pulled.");
        res.send(await scores.toArray());
    }
    catch (error) {
        console.log(error);
        res.status(404).send("There is a problem in getScores endpoint.\n");
    }
})

app.use(express.static('static'))
app.listen(PORT)