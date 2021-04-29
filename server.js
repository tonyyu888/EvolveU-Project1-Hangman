const gameRoutes = require("./routes/game");

const express = require('express')
const app = express();
let PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', gameRoutes)

app.use(express.static('static'))

app.listen(PORT)