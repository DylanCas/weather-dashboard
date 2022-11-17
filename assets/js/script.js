// fetch area info by name https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=${apiKey}
// fetch area info by zip http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid=${apiKey}
// fetch forecast by lat/lon by 1st api fetch https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}
// fetch current weather by lat/lon by 1st api fetch https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}
// OpenWeather API key
var apiKey = 'f95c2d04f516fc0e509fd5fd102333d4'

var searchCity = document.getElementById("searchCity")

searchCity.addEventListener("click", function() {
    var locationSearch = document.getElementById("citySearch").value
    console.log(locationSearch)
    var locationArray = locationSearch.split(",")
    var cityName = locationArray[0]
    console.log(cityName)
    var stateCode = locationArray[1]
    console.log(stateCode)
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&${stateCode}&appid=${apiKey}`)
.then(function (response){
    console.log(response)
    return response.json();
}).then(function(data){
    console.log(data)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${apiKey}`)
    .then(function (response){
        return response.json();
    }).then(function(data){
        console.log(data)
        // create elements, append elements with data indexes - But what indexes?

    })
})
})


