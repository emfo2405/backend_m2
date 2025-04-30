//Hämtar in postgres och dotenv
const { Client } = require("pg");
require("dotenv").config();

//Funktion för att koppla till databas och skapa tabell
async function install() {

    //Koppling till databas med inställningar från .env-fil
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

    //Skapande av tabell i databas
    try {
        await client.connect();
        console.log("Anslutning till databas lyckades");
        const sql = `
            CREATE TABLE experience(
            id SERIAL PRIMARY KEY,
            companyname VARCHAR(40) NOT NULL,
            jobtitle VARCHAR(40) NOT NULL,
            location VARCHAR(40) NOT NULL,
            startdate DATE NOT NULL,
            enddate DATE NOT NULL,
            description TEXT NOT NULL);
        `;
        await client.query(sql);
        console.log("Tabell över arbetslivserfarenheter skapade");
            
        //Fångar upp fel ifall databasen inte kopplas/skapas rätt
    } catch(error) {
        console.error(error);
    } finally {
        await client.end();
    }
}

//Kör funktionen för att koppla till databasen
install();