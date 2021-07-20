// temporary hardcoded value for city
var city = "salt lake city";
// 5 day weather forecast api call
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=c845404333af03f8f793eadcc58eeb29";

fetch(apiUrl).then(function(response) {
    if (response.ok) {
        response.json().then(function (data) {
            console.log(data.city.name);
            console.log(data.list[0].main.temp);
            console.log(data.list[0].wind.speed);
            console.log(data.list[0].main.humidity);
        });
    }
});

