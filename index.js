const express = require("express");
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "./public");

console.log(publicDirectoryPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.send();
});



app.listen(port, () => {
    console.log("Sever is up on port 3000!");
});