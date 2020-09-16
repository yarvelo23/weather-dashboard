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