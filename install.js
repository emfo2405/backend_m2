const { Client } = require("pg");
require("dotenv").config();

async function install() {
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

    try {
        await client.connect();
        console.log("Anslutning till databas lyckades");
        const sql = `
            CREATE TABLE experience(
            id SERIAL PRIMARY KEY,
            companyname VARCHAR(25) NOT NULL,
            jobtitle VARCHAR(20) NOT NULL,
            location VARCHAR(25) NOT NULL,
            startdate DATE NOT NULL,
            enddate DATE NOT NULL,
            description TEXT NOT NULL);
        `;
        await client.query(sql);
        console.log("Tabell över arbetslivserfarenheter skapade");
            
    } catch(error) {
        console.error(error);
    } finally {
        await client.end();
    }
}

install();