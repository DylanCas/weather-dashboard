// fetch area info by name https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=${apiKey}
// fetch area info by zip http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid=${apiKey}
// fetch forecast by lat/lon by 1st api fetch https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}
// fetch current weather by lat/lon by 1st api fetch https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}
// OpenWeather API key
var apiKey = 'f95c2d04f516fc0e509fd5fd102333d4'

var searchCity = document.getElementById("searchCity")

var cityList = JSON.parse(localStorage.getItem("cityList")) || []
// loop through city list and create button for each city/storage item

// add event listener for each button that reruns the fetch

searchCity.addEventListener("click", function() {
    var locationSearch = document.getElementById("citySearch").value
    var locationArray = locationSearch.split(",")
    var cityName = locationArray[0]
    var stateCode = locationArray[1]
    var cityList = JSON.parse(localStorage.getItem("cityList")) || []
    var cityObj = {cityName, stateCode}
    cityList.push(cityObj)
    localStorage.setItem('cityList', JSON.stringify(cityList))
    searchWeather(cityName, stateCode)
})

function searchWeather (cityName, stateCode) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&${stateCode}&appid=${apiKey}`)
.then(function (response){
    return response.json();
}).then(function(data){
    var lat = data[0].lat
    var lon = data[0].lon
    console.log(data)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
    .then(function (response){
        return response.json();
    }).then(function(forecast){
        console.log(forecast)
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        }).then(function(weather){
            console.log(weather)
            var weatherList = document.getElementById("currentWeather")
            // current temp 
            var tempEl = document.getElementById('currentTemp')
            tempEl.textContent = 'Current Temperature(F) = ' + Math.round(weather.main.temp)
            // weatherList.appendChild(tempEl)
            // high temp
            var maxTempEl = document.getElementById('highTemp')
            maxTempEl.textContent = 'High Temperature(F) = ' + Math.round(weather.main.temp_max)
            // weatherList.appendChild(maxTempEl)
            // low temp
            var lowTempEl = document.getElementById('lowTemp')
            lowTempEl.textContent = 'Low Temperature(F) = ' + Math.round(weather.main.temp_min)
            // weatherList.appendChild(lowTempEl)
            // winds
            var windEl = document.getElementById('wind')
            windEl.textContent = 'Wind = ' + weather.wind.speed
            // weatherList.appendChild(windEl)
        })
        // create elements, append elements with data indexes - But what indexes?

    })
})
}
