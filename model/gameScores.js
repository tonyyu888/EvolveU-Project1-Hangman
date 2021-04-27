const { ObjectId } = require('mongodb');
const db = require("./db");

async function getScoresCollection() {
    return db.getCollection("scores");
}

async function addUserScore(userInitial, startDateTime, endDateTime, word,  letterNotFoundCount, timeCompleted) {
    let scoresCollection = await getScoresCollection(); 
    await scoresCollection.insertOne({userInitial, startDateTime, endDateTime, word,  letterNotFoundCount, timeCompleted});
}

async function getScores() {
    let scoresCollection = await getScoresCollection();
    let scoresResult = await scoresCollection.find().sort({timeCompleted:1}).limit(5);

    return scoresResult;
}

module.exports = {
    addUserScore,
    getScores
}