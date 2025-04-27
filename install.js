const { Client } = require("pg");
require("dotenv").config();

async function install() {
    const client = new Client ({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });

    try {
        await client.connect();
    } catch(error) {
        console.error(error);
    }
}