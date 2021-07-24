var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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
    $("#current-day").empty();

    var currentUnixTime = data.dt
    var millisecond = currentUnixTime * 1000;
    var currentDate = new Date(millisecond);
    var date = currentDate.toLocaleString("en-US", options);


    var card = $("<div>").addClass("card bg-light");
    var cardContent = $("<div>").addClass("card-body");
    var cityContent = $("<p>").addClass("card-text").text(data.name);
    var dateContent = $("<p>").addClass("card-text").text(date);
    var tempContent = $("<p>").addClass("card-text").text("Tempurature: " + data.main.temp + "F");
    var windContent = $("<p>").addClass("card-text").text("Wind: " + data.wind.speed + " Mph");
    var humidContent = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png")

    cardContent.append(cityContent, dateContent, image, tempContent, windContent, humidContent)
    card.append(cardContent);
    $("#current-day").append(card);
};

// use one call api and pull lat nad long from the current api
var displayFiveWeather = function (data) {
    $("#forecast").empty();
    $("#forecast-title").empty();
    var title = $("<h2>").text("5 Day Forecast");
    $("#forecast-title").append(title);

    for (var i = 0; i < 5; i++) {
        var dailyUnixTime = data.daily[i].dt;
        var millisecond = dailyUnixTime * 1000;

        var dailyDate = new Date(millisecond);
        var fiveDate = dailyDate.toLocaleString("en-US", options);

        var card = $("<div>").addClass("card col-lg bg-light col-sm-12 col-md-4 my-auto");
        var cardContent = $("<div>").addClass("card-body");
        var date = $("<p>").addClass("card-text").text(fiveDate);
        var tempContent = $("<p>").addClass("card-text").text("Tempurature: " + data.daily[i].temp.day + "F");
        var windContent = $("<p>").addClass("card-text").text("Wind: " + data.daily[i].wind_speed + " Mph");
        var humidContent = $("<p>").addClass("card-text").text("Humidity: " + data.daily[i].humidity + "%");
        var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png");

        cardContent.append(date, image, tempContent, windContent, humidContent);
        card.append(cardContent);
        $("#forecast").append(card);
    };
};

// listen for click on search btn call searchSubmitHandler
$("#search-btn").click("submit", searchSubmitHandler);