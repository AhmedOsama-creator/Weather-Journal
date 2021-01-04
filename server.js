/* Empty JS object to act as endpoint for all routes */
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('Weather-Journal'));

// Setup Server
const port = 8000;

const server = app.listen(port,listenning);

function listenning() {
  console.log(`Server is running on port ${port}`);
}

//GET route

app.get('/all',sendData);

//Function to send data to the endpoint EMPTY JS object above

function sendData(request,response) {
// JS data ==> JSON data
  response.send(JSON.stringify(projectData))
}

//POST route 

app.post('/',addData);

//function to add data from UI to the local server (in the EMPTY JS object)

function addData(request,response) {
// Adding properties and values to the EMPTY JS object
  projectData.temperature = request.body.temperature
  projectData.date = request.body.date
  projectData.userFeelings = request.body.userFeelings
  response.end()
}
