let search = document.querySelector('.searchBox');
let searchBtn = document.getElementById('.searchBtn');
let cities = document.querySelector('.weather-city');

let myAPIKey = '7eead1cfbaeb4b61b2d69ec34718ba80';
let cityName = 'https://api.weatherbit.io/v2.0/forecast/daily?&key=' + myAPIKey;

let weatherByCity = async (cities) => {
    let endpoint = cityName + '&city=' + cities;
    let response = await fetch(endpoint);
    let weather = await response.json();
    return weather;
}

search.addEventListener('keydown', async (e) => {
    if (e.keyCode === 13) {
        let weather = await weatherByCity(search.value);
        updatedWeather(weather);
        currentDay();
        console.log(weather);
    }
})


// // Get the wether details of 5 days from the api
let updatedWeather = (info) => {
    cities.textContent = info.city_name + ', ' + info.country_code;
    

    for (i = 0; i < 5; i++) {

        // Access the TEMPERATURE from the API data
        document.getElementById("temperature" + (i + 1)).textContent = Math.round(info.data[i].temp);
        
        // Access the 5 days DATE from the API data
        document.getElementById("date" + (i + 1)).innerHTML = info.data[i].datetime;

        //  access the icon according to weather from the API data
        document.getElementById("weather-image" + (i+1)).src = "https://www.weatherbit.io/static/img/icons/" + info.data[i].weather.icon + ".png"
    }
}

// For accessing 5 days in a weak

let currentDay = () => {

    const d = new Date();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function CheckDay(day) {
        if (day + d.getDay() > 6) {
            return day + d.getDay() - 7;
        }
        else {
            return day + d.getDay();
        }
    }

    for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
    }
}