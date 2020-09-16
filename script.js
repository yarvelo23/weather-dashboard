// weather api key
var apiKey = "31b2ec10feccf2ed54ed62f57354e7e0";

// for loop to iterate city data to screen
for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem(i);

    // variable for the city name and adding class to append it to the ul on the html
    var cityName = $(".list-group").addClass("list-group-item");

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



})