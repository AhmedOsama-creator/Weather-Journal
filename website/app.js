/* Global Project Variables */
const apiKey = 'daac68b7dba59a7de87e9ff0375e0db2';
const weatherURL = 'api.openweathermap.org/data/2.5/weather?';
const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// Dynamically create a new JS date instance
let d = new Date();
let newDate = d.getMonth() + 1 +'.' + d.getDate() + '.' + d.getFullYear();

// get weather from openweather.org
const getWeather = async (weatherURL, zipCode, api) => {
  // url of openweatherapp.org to get api of the weather
  const response = await fetch(`http://${weatherURL}zip=${zipCode}&appid=${api}`);
  // Transform into JSON
  let jsonRes = await response.json();
  return jsonRes;
}

// Async POST
const postData = async (url, data = {}) => {
  const response = await fetch(url, {
    method: 'POST',  
    cache: 'no-cache', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    // JS data ==> JSON data
    body: JSON.stringify(data),// body data type must match "Content-Type" header
  })
}

// Update UI 
const updateUI = async () => {
  // updating data by sending the new one to the endpoint local server
  const response = await fetch('http://localhost:8000/all')
  // Transform into JSON
  const jsonRes = await response.json()
  // Getting data by user's input
  date.innerHTML = `Today: ${jsonRes.date}`;
  content.innerHTML = `Feelings: ${jsonRes.userFeelings}`;
  temp.innerHTML = `Temprature: ${jsonRes.temperature} F`;
}

// get weather when clicking
const genWeather = async () => {
  // user input to get region data of zipCode region
  const weatherData = await getWeather(weatherURL, zipCode.value, apiKey)
  // Status data
  const data = {
    temperature: weatherData.main.temp,
    date: newDate,
    userFeelings: feelings.value
  }
  // Posting data to the local server
  await postData('http://localhost:8000', data)
  updateUI()
}

// Click & generate the App
const generateBtn = document.getElementById('generate')
generateBtn.addEventListener('click', genWeather)
