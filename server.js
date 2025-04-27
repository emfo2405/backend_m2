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

    if(!companyname) {
                //Error meddelamde
                errors.message = "Companyname tomt";
                errors.detail = "Du måste fylla i companyname i JSON";
        
                //response kod
                errors.https_response.message = "Bad request";
                errors.https_response.code = 400;
        
                res.status(400).json(errors);
        
                return;
    } else if (!jobtitle) {
                        //Error meddelamde
                        errors.message = "Jobtitle tomt";
                        errors.detail = "Du måste fylla i jobtitle i JSON";
                
                        //response kod
                        errors.https_response.message = "Bad request";
                        errors.https_response.code = 400;
                
                        res.status(400).json(errors);
                
                        return;
    } else if (!location) {
        //Error meddelamde
        errors.message = "Location tomt";
        errors.detail = "Du måste fylla i location i JSON";

        //response kod
        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;

        res.status(400).json(errors);

        return;
} else if (!startdate || !enddate) {
    //Error meddelamde
    errors.message = "Startdate eller enddate tomt";
    errors.detail = "Du måste fylla i både startdate och enddate i JSON";

    //response kod
    errors.https_response.message = "Bad request";
    errors.https_response.code = 400;

    res.status(400).json(errors);

    return;
} else if (!description) {
    //Error meddelamde
    errors.message = "Description tomt";
    errors.detail = "Du måste fylla i description i JSON";

    //response kod
    errors.https_response.message = "Bad request";
    errors.https_response.code = 400;

    res.status(400).json(errors);

    return;
}

//Lägg till information i databas
client.query(`INSERT INTO experience (companyname, jobtitle, location, startdate, enddate, description) VALUES (?,?);`, [companyname, jobtitle, location, startdate, enddate, description], (err, results) => {
    if(err) {
        res.status(500).json({error: "Something went wrong: " + err});
        return;
    } else {
        console.log("Fråga skapad: " + results);

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



//Starta server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Startad på: http://localhost: " + port);
})


