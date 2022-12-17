
const input = document.querySelector(".search");
const button = document.querySelector("button");

const city = document.querySelector(".city");
const country = document.querySelector(".country")
const celsius = document.querySelector(".celsius");
const fahrenheit = document.querySelector(".fahrenheit");
const wind = document.querySelector(".wind");
const weather = document.querySelector(".weather");
const humidity = document.querySelector(".humidity");


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
    city.innerText = name;
}
/*
    country
*/
function countryDisplay(count) {
    country.innerText = count;
}


/*
    temp display
*/
function displayWeatherInCelsius(temp) {
    let temperature = Math.round(temp - 273,15);

    celsius.innerText = temperature + "°C";
};

function displayWeatherInFahrenheit(temp) {
    let temperature = Math.round(temp * 9/5 - 459.67);

    fahrenheit.innerText = temperature + "°F";
}


/*
    wind info
*/
function windSpeadDisplay(windSpeed) {
    let windSpeedKph = Math.round(windSpeed * 3.6);

    wind.innerText = "wind: " + windSpeedKph + "kph";
}


/*
    weather
*/
function weatherDisplay(weatherD) {
    weather.innerText = weatherD;
}

/*
    humidity
*/
function humidityDisplay(humidityD) {
    humidity.innerText = "Humidity: " + humidityD + "%";
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


