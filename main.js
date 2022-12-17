const container = document.querySelector(".container");
const input = document.querySelector(".search");
const button = document.querySelector("button");

const loc = document.querySelector(".loc");
const temps = document.querySelector(".temp");
const wind = document.querySelector(".wind");
const weathers = document.querySelector(".weather");
const humidityS = document.querySelector(".humidity");


button.addEventListener('click', inputInfo);

function inputInfo() {
    if (input.value === "") {
        console.log("no value in input");
    } else {
        getWeather(input.value);
    }
};


/*
    city display
*/


function displayCity(name) {
    let city = document.createElement("div");
    city.innerText = name;
    city.classList.add("city");
    loc.appendChild(city);
}
/*
    country
*/
function countryDisplay(country) {
    let countryN = document.createElement("div");
    countryN.innerText = " " + country;
    countryN.classList.add("country");
    loc.appendChild(countryN);
}


/*
    temp display
*/
function displayWeatherInCelsius(temp) {
    let temperature = Math.round(temp - 273,15);

    let tempC = document.createElement("div");
    tempC.innerText = temperature + "°C";
    tempC.classList.add("temp");
    temps.appendChild(tempC);
};

function displayWeatherInFahrenheit(temp) {
    let temperature = Math.round(temp * 9/5 - 459.67);

    let tempF = document.createElement("div");
    tempF.innerText = temperature + "°F";
    tempF.classList.add("temp");
    temps.appendChild(tempF);
}


/*
    wind info
*/
function windSpeadDisplay(windSpeed) {
    let windSpeedKph = Math.round(windSpeed * 3.6);

    let windSpeeds = document.createElement("div");
    windSpeeds.innerText = "wind: " + windSpeedKph + "kph";
    windSpeeds.classList.add("windSpeeds");
    wind.appendChild(windSpeeds);
}


/*
    weather
*/
function weatherDisplay(weather) {
    let weatherD = document.createElement("div");
    weatherD.innerText = weather;
    weatherD.classList.add("weather-d");
    weathers.appendChild(weatherD);
}

/*
    humidity
*/
function humidityDisplay(humidity) {
    let humidityD = document.createElement("div");
    humidityD.innerText = "Humidity: " + humidity + "%";
    humidityD.classList.add("humidity");
    humidityS.appendChild(humidityD);
}



function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=04400c94c3fa39734684083c69ac10aa`, {mode: 'cors'})
        .then(function(response) {
            // Successful response :)
            return response.json();
        })
        .then(function(response) {
            console.log(response);

            //city
            let name = response.name + ", ";
            displayCity(name);

            //country
            let country = response.sys.country;
            countryDisplay(country);

            //temp            
            let temp = response.main.temp;
            displayWeatherInCelsius(temp);
            displayWeatherInFahrenheit(temp);

            //display wind info
            let windSpeed = response.wind.speed;
            windSpeadDisplay(windSpeed);

            //Weather info
            let weather = response.weather[0].description;
            weatherDisplay(weather);

            //humidity info
            let humidity = response.main.humidity;
            humidityDisplay(humidity);

        })
        .catch(function(err) {
            // Error :(
            console.log(err);
        });
};


