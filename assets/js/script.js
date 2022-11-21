// fetch area info by name https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=${apiKey}
// fetch area info by zip http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid=${apiKey}
// fetch forecast by lat/lon by 1st api fetch https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}
// fetch current weather by lat/lon by 1st api fetch https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}

// OpenWeather API key
const apiKey = 'f95c2d04f516fc0e509fd5fd102333d4'

var cityList = JSON.parse(sessionStorage.getItem("cityList")) || []

// TODO: loop through city list and create button for each city/storage item
for (i = 0; i < cityList.length; i++) {
    let searchlist = document.getElementById("searchList")
    var searchListLiEl = document.createElement("button")
    searchListLiEl.textContent = cityList[i].cityName + cityList[0].stateCode
    searchlist.appendChild(searchListLiEl)

}
// add event listener for each button that reruns the fetch

var searchCity = document.getElementById("searchCity")
searchCity.addEventListener("click", function() {
    var locationSearch = document.getElementById("citySearch").value
    var locationArray = locationSearch.split(",")
    var cityName = locationArray[0]
    var stateCode = locationArray[1]
    var cityList = JSON.parse(sessionStorage.getItem("cityList")) || []
    var cityObj = {cityName, stateCode}
    cityList.push(cityObj)
    sessionStorage.setItem('cityList', JSON.stringify(cityList))
    console.log(cityList)
    searchWeather(cityName, stateCode)
})

// Takes city search input to pull weather info for the location and display select info on page
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
            // var weatherList = document.getElementById("currentWeather")
            // current temp 
            var tempEl = document.getElementById('currentTemp')
            tempEl.textContent = 'Current Temp(F) = ' + Math.round(weather.main.temp)
            // weatherList.appendChild(tempEl)
            // high temp
            var maxTempEl = document.getElementById('highTemp')
            maxTempEl.textContent = 'High Temp(F) = ' + Math.round(weather.main.temp_max)
            // weatherList.appendChild(maxTempEl)
            // low temp
            var lowTempEl = document.getElementById('lowTemp')
            lowTempEl.textContent = 'Low Temp(F) = ' + Math.round(weather.main.temp_min)
            // weatherList.appendChild(lowTempEl)
            // winds
            var windEl = document.getElementById('wind')
            windEl.textContent = 'Wind = ' + weather.wind.speed
            // weatherList.appendChild(windEl)
            var cityTitleEl = document.getElementById('cityText')
            cityTitleEl.textContent = cityName
        })
    })
})
}
