# EvolveU-Project1-Hangman

Hangman - Project 1
<br>
<br>
A simple hangman game for EvolveU - Cohort6 project 1

Idea was from old school upright arcade game machines, where you are asked to enter your initial at the end of the game for saving in the database. The game also displays the top 5 players.

My very first web application with database backend...

This program requires a MongoDB database to store game data.

Create a database name it "hangman"
<br>
<br>
Create 2 collections in the hangman database:
<br>
<br>
words
<br>
scores
<br>
<br>
You will find 2 files in JSON format contain the 2 collections in the data files folder:
<br>
<br>
scores.json
<br>
words.json
<br>
<br>
You can use the MongoDBCompass to import the data into the collections

There is still a lot of things that needs to be done in the program:
- Formulate a better scoring system. Currently, it just stores the time (in sec.) it took the player to successfully guess the mystery word.
- Organize program files structure.
- `Implemented!` - Implement express.Router to properly create modular, mountable route handlers.
- Make game interface attractive.
- `Implemented!` - Display a clue about the mystery word (Category: Place, Thing, etc.). My wife gave me heck for this one.
- Clean up the codes specially the variables used.
- Implement React to project
<br>
Many more...
<br>
<br>
Run it with node server.js
<br>
<br>
Enjoy playing the game. Let me know if you find any bugs.
