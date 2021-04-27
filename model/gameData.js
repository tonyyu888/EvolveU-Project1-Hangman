const { ObjectId } = require('mongodb');
const db = require("./db");

async function getWordsCollection() {
    return db.getCollection("words");
}

//get a random record from collection
async function getMysteryWordFromDb() {
    let wordsCollection = await getWordsCollection();

    //Get a 1 random record from collection
    let wordResult = await wordsCollection.aggregate(
        [{$sample:{size:1}}, 
        {"$project": {word: 1, _id: 0}}
    ]);

    //let wordResult = await wordsCollection.aggregate([{$sample:{size:1}}]);
    //console.log("wordResult = ", await wordResult.toArray());

    return wordResult.toArray();
}



module.exports = {
    getMysteryWordFromDb
}