const express = require("express");
const { Client } = require("pg");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

const client = new Client ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect((err) => {
if(err) {
    console.error("Fel vid anslutning: " + err);
}
});

//Skapa routes
app.get("/api", (req, res) => {
    res.json({message: "Välkommen till mitt API"});
});

app.get("/api/experience", (req, res) => {
    //Hämta in information
    client.query(`SELECT * FROM experience;`, (err, results) => {
         if(err) {
        res.status(500).json({error: "Något gick fel: " + err});
        return;
         }
         console.log(results);
         if(results.length === 0) {
            res.status(200).json({error: ""});
         } else {
            res.json(results);
         }
    })
});




//Starta server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Startad på: http://localhost: " + port);
})


