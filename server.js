// Setup empty JS object to act as endpoint for all routes
projectData = {};

const exp = require('constants');
// Require Express to run server and routes
const express= require('express');

// Start up an instance of app
const app= express();

const bodyParser= require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors= require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port= 8000;

app.listen(port, listening =>{
    console.log(`Server is running at: http://localhost:${port}`)
})

app.get("/get", (req, res) =>{
    res.send(projectData);
    
})


app.post("/post", (req, res) =>{
    console.log('req.body', req.body);

    projectData={
        temp: req.body.temp, 
        date: req.body.date, 
        content: req.body.content
    }
   res.send(projectData);
})