const express = require("express");
const { Client } = require("pg");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

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
         if(results.rows.length === 0) {
            res.status(200).json({error: ""});
         } else {
            res.json(results);
         }
    });
});

app.post("/api/experience", (req, res) => {
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    //Error-meddelanden
    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    };

    if(!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
                //Error meddelamde
                errors.message = "Companyname, jobtitle, location, startdate, enddate och description måste vara ifyllda";
                errors.detail = "Du måste fylla i companyname, jobtitle, location, startdate, enddate och description i JSON";
        
                //response kod
                errors.https_response.message = "Bad request";
                errors.https_response.code = 400;
        
                res.status(400).json(errors);
        
                return;
    }

//Lägg till information i databas
client.query(`INSERT INTO experience (companyname, jobtitle, location, startdate, enddate, description) VALUES ($1, $2, $3, $4, $5, $6);`, [companyname, jobtitle, location, startdate, enddate, description], (err, results) => {
    if(err) {
        res.status(500).json({error: "Something went wrong: " + err});
        return;
    } else {
        console.log("Nytt inlägg skapat: " + results);

        let experience = {
            companyname: companyname,
            jobtitle: jobtitle,
            location: location,
            startdate: startdate,
            enddate: enddate,
            description: description
        };

        res.json({message: "Ny arbetslivserfarenhet tillagd", experience});
    }
});
});

app.put("/api/experience/:id", (req, res) => {
    let id = req.params.id;
    let { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    if(!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        return res.status(400).json({message: "companyname, jobtitle, location, startdate, enddate och description måste vara ifyllda"})
    } else {
        client.query(`UPDATE experience SET companyname=$1, jobtitle=$2, location=$3, startdate=$4, enddate=$5, description=$6 WHERE id=$7`, [companyname, jobtitle, location, startdate, enddate, description, id], (error, results) => {
            if(error) {
                res.status(500).json({message: "Något gick fel, försök igen senare"});
            } else if (results.rowCount === 0) {
                res.status(404).json({message: "Erfarenheten hittades inte"});
            } else {
                res.json({message: "Erfarenheten har uppdaterats"})
            }
        })
    }
});

app.delete("/api/experience/:id", (req,res) => {
id= req.params.id;
client.query(`DELETE FROM experience WHERE id=$1`, [id], (error, results) => {
    if(error) {
        res.status(500).json({message: "Något gick fel, försök igen senare"});
    } else if (results.rowCount === 0) {
        res.status(404).json({message: "Erfarenheten hittades inte"});
    } else {
        res.json({message: "Erfarenheten har raderats"});
    }
});
});



//Starta server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Startad på: http://localhost: " + port);
})


