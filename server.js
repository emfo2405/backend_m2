require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3000;

//Kontroll av koppling till databas
console.log("Database:", process.env.DB_DATABASE);

//Skapar en koppling till databasen
const connection = mysql.createConnection( {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

//Meddelanden ifall kopplingen inte fungerar eller om kopplingen lyckas
connection.connect((err) => {
    if(err) {
        console.log("Koppling till databasen misslyckades " + err);
    } else {
    console.log("Koppling till databasen lyckades")
    }
});

