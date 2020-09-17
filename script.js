// weather api key
var apiKey = "31b2ec10feccf2ed54ed62f57354e7e0";

// for loop to iterate city data to screen
for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem(i);

    // variable for the city name and adding class to append it to the ul on the html
    var cityName = $(".city-list").addClass("city-list-item");

    // append the city input to the screen
    cityName.append("<li>" + city + "</li>");
}

// variable for search button
var searchButton = $(".searchButton");

// input count to be used for local storage purposes
var cityCount = 0;

// adding click event (event listener) to search button
searchButton.click(function () {

    var cityInput = $(".searchInput").val();

    // urls for api calls
    var urlCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&Appid=" + apiKey + "&units=imperial";

    var urlFiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&Appid=" + apiKey + "&units=imperial";

    // conditional statement to check if user inputs a valid city
    if (cityInput == "") {
        console.log(cityInput);
    }
    else {
        $.ajax({
            url: urlCurrentWeather,
            method: "GET"
        }).then(function (response) {
            // if valid city is input, then proceed to append the city to the list of cities
            var cityName = $(".city-list").addClass("city-list-item");
            cityName.append("<li>" + response.name + "</li>");

            // local storage
            var storage = localStorage.setItem(keyCount, response.name);
            // append a new city to the existing list
            cityCount = cityCount++;

            // current weather append
            var currentWeatherCard = $(".currentWeatherCard").append("<div>").addClass("card-body");
            currentWeatherCard.empty();
            var currentName = currentWeatherCard.append("<p>");
            currentWeatherCard.append(currentName);

            // adjusting the date and time
            var currentTime = new Date(response.dt * 1000);
            currentName.append(response.name + " " + currentTime.toLocaleDateString("en-US"));
            currentName.append('<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">');

            var currentTemp = currentName.append("<p>");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            // displaying humidity
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            // displaying wind speed
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
        });
        
        // function for 5 day forecast
        $.ajax({
            url: urlFiveDayWeather,
            method: "GET"
        }).then(function (response) {
            var day = [0, 8, 16, 24, 32];
            var fiveDayCard = $(".fiveDayCard").addClass("card-body");
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();

            day.forEach(function (i) {
                var fiveDayTimeUTC = new Date(response.list[i].dt * 1000);
                fiveDayTimeUTC = fiveDayTimeUTC.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + fiveDayTimeUTC + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "</p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");
            })
        });
    
        
        // UV Index URL
        var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

        // UV Index
        $.ajax({
            url: urlUV,
            method: "GET"
        }).then(function (response) {

            var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
            currentUV.addClass("UV");
            currentTemp.append(currentUV);
            
        });
    }

    
});