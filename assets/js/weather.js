var dailyListEl = $("#daily-list");
var searchCityEl = $("#search-city");



var searchSubmitHandler = function (event) {
    event.preventDefault();

    // get value of search input
    var city = searchCityEl.val().trim();

    if (city) {
        getDailyWeather(city);
    }
};

var getDailyWeather = function (city) {
    var currentApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c845404333af03f8f793eadcc58eeb29";

    fetch(currentApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                displayDailyWeather(data);
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                getFiveWeather(lat, lon);
            });
        } else {
            alert("Please enter a city name!");
        };
    });

};

var getFiveWeather = function (lat, lon) {
    // 5 day weather forecast api call
    var fiveApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=c845404333af03f8f793eadcc58eeb29";

    fetch(fiveApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayFiveWeather(data);
            });
        } else {
            alert("Please enter a valid city name!");
        };
    });
};


var displayDailyWeather = function (data) {
    // empty ul element before creating new elements
    $("#daily-list").empty();
    var cityName = data.name;
    var tempurature = data.main.temp;
    var wind = data.wind.speed;
    var humid = data.main.humidity;

    // adds city name to card-header
    $("#city-span").text(cityName);

    // creates dailyTempEl and give a value of temp
    var dailyTempEl = document.createElement("li");
    dailyTempEl.classList = "list-group-item";
    dailyTempEl.textContent = "Tempurature: " + tempurature + " F";

    // creates dailyWindEl and give a value of wind
    var dailyWindEl = document.createElement("li");
    dailyWindEl.classList = "list-group-item";
    dailyWindEl.textContent = "Wind: " + wind + " MPH";

    // creates dailyHumidEl and gives a value of humid
    var dailyHumidEl = document.createElement("li");
    dailyHumidEl.classList = "list-group-item";
    dailyHumidEl.textContent = "Humidity: " + humid + "%";

    dailyListEl.append(dailyTempEl, dailyWindEl, dailyHumidEl);
};

// use one call api and pull lat nad long from the current api
var displayFiveWeather = function (data) {
    
    for (var i = 0; i < 5; i++) {
        console.log(data.daily[i].temp.day);  
        console.log(data.daily[i].wind_speed);
        console.log(data.daily[i].humidity);
        console.log(data.daily[i].dt);
    };
};

// listen for click on search btn call searchSubmitHandler
$("#search-btn").click("submit", searchSubmitHandler);