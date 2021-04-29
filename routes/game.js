const express = require('express')
const gameSetting = require("../model/gameSettings");
const gameScores = require("../model/gameScores");

let router = express.Router();

router.get('/submitUserSelection', async (req, res) => {
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

router.get('/restartGame', async (req, res) => {
  try {
      gameProgressResult = await gameSetting.initializeGameVariables();
      res.send({gameProgressResult}); 
  }
  catch (error) {
      console.log(error);
      res.status(404).send("There is a problem in restartGame endpoint.\n");
  }    
})

router.get('/submitScore', async (req, res) => {
  try {
      const playerInitial = req.query.userInitial.toUpperCase();
      gameDataResult = await gameSetting.saveUserScore();

      await gameScores.addUserScore(playerInitial, gameDataResult.startDateTime, gameDataResult.endDateTime, gameDataResult.word, gameDataResult.letterNotFoundCount, gameDataResult.timeCompleted);

      await res.send({status: "success"});
  }
  catch (error) {
      console.log(error);
      res.status(404).send("There is a problem in submitScore endpoint.\n");
  }
})

router.get('/getScores', async (req, res) => {
  try {
      let scores = await gameScores.getScores();

      res.send(await scores.toArray());
  }
  catch (error) {
      console.log(error);
      res.status(404).send("There is a problem in getScores endpoint.\n");
  }
})

module.exports = router