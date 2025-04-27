require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3000;




//Meddelanden ifall kopplingen inte fungerar eller om kopplingen lyckas
connection.connect((err) => {
    if(err) {
        console.log("Koppling till databasen misslyckades " + err);
    } else {
    console.log("Koppling till databasen lyckades")
    }
});

app.use(cors());
app.use(express.json());

//Skapar routes
