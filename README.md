## Moment 2 - Webbtjänster / API
Jag har skapat ett API för att kunna hantera olika arbetslivserfarenheter jag har. API:et är skapat i syfte att kunna använda Create, Read, Update, Delete genom GET, POST, PUT och DELETE.

### Anslutning till API
Inställningar för att ansluta till API finns i .env-filen där användarnamn, lösenord och host ligger. 

### Installera databas
För att komma igång med installationen av databasen klonas filerna ner och de paket som behövs för att köra koden installeras med npm install. Sedan är det första steget för att initiera databasen att köra install.js som skapar en tabell som ser ut så här:
| Tabellnamn  | id | companyname | jobtitle | location | startdate | enddate | description|
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| experience  | SERIAL PRIMARY KEY  | VARCHAR(40) NOT NULL  | VARCHAR(40) NOT NULL  | VARCHAR(40) NOT NULL  | DATE NOT NULL  | DATE NOT NULL  | TEXT NOT NULL  |

### Hur man använder API:et 
Det finns olika sätt att använda API:et för att nå det, nedan finns en tabell över vilka metoder som kan användas och vad de innebär. 

| Metod  | Ändpunkt | Beskrivning | 
| ------------- | ------------- | ------------- |
| GET  | /api/experience  | Visar alla arbetslivserfarenheter i databasen |
| POST  | /api/experience  | Lagrar en ny arbetslivserfarenhet i databasen. Ett objekt med korrekt information måste skickas med. |
| PUT  | /api/experience/:id  | Uppdaterar information för en arbetslivserfarenhet med ett specifikt id-nummer i databasen. Ett objekt med korrekt information måste skickas med. |
| DELETE  | /api/experience/:id  | Raderar en arbetslivserfarenhet ur databasen med ett specifikt id-nummer. |

Ett objekt som lägger till korrekt information om arbetslivserfarenheter är uppbyggt så här:
```
{
  "companyname": "Göteborgs Universitet",
  "jobtitle": "Administrativ Assistent",
  "location": "Göteborg",
  "startdate": "2016-09-01",
  "enddate": "2025-05-31",
  "description": "Arbete med datainmatning och analys av provresultat"
}
```
