// fetch area info by name https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=${apiKey}
// fetch area info by zip http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid=${apiKey}
// fetch forecast by lat/lon by 1st api fetch https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}
// fetch current weather by lat/lon by 1st api fetch https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}

// OpenWeather API key
const apiKey = 'f95c2d04f516fc0e509fd5fd102333d4'

var cityList = JSON.parse(sessionStorage.getItem("cityList")) || []

// Fairly comfortable that the button is being created alright, unsure quite how to make button rerun the function successfully
// TODO: button needs to show up upon making new search
for (i = 0; i < cityList.length; i++) {
    let searchlist = document.getElementById("searchList")
    var searchListLiEl = document.createElement("button")
    searchListLiEl.setAttribute("id", "pastSearchBtn")
    searchListLiEl.textContent = cityList[i].cityName + cityList[0].stateCode
    searchlist.appendChild(searchListLiEl)
}
//TODO: add event listener for each button that reruns the fetch
let pastSearchBtn = document.getElementById("pastSearchBtn")
pastSearchBtn.addEventListener("click", function() {

})

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
    searchWeather(cityName, stateCode)
})

// Takes city search input to pull weather info for the location and display select info on page
function searchWeather (cityName, stateCode) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&${stateCode}&appid=${apiKey}`)
.then(function (response){
    return response.json();
}).then(function(locationData){
    var lat = locationData[0].lat
    var lon = locationData[0].lon
    console.log(locationData)
    // forecast weather data
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
    .then(function (response){
        return response.json();
    }).then(function(forecast){
        console.log(forecast)
        // displaying forecast data results on screen
        const day1Block = document.getElementById("day1")
            let date1 = document.getElementById("date1")
            let dateFormula1 = new Date(forecast.list[4].dt * 1000)
            date1.textContent = dateFormula1.toLocaleDateString("en-US")
            var temp1 = document.getElementById("temp1")
            temp1.textContent = 'Temp: ' + Math.round(forecast.list[4].main.temp)
            var humidity1 = document.getElementById("humidity1")
            humidity1.textContent = 'Humidity%: ' + forecast.list[4].main.humidity
            var wind1 = document.getElementById("wind1")
            wind1.textContent = 'Winds: ' + forecast.list[4].wind.speed

        const day2Block = document.getElementById("day2")
            let date2 = document.getElementById("date2")
            let dateFormula2 = new Date(forecast.list[12].dt * 1000)
            date2.textContent = dateFormula2.toLocaleDateString("en-US")
            var temp2 = document.getElementById("temp2")
            temp2.textContent = 'temp: ' + Math.round(forecast.list[12].main.temp)
            var humidity2 = document.getElementById("humidity2")
            humidity2.textContent = 'Humidity%: ' + forecast.list[12].main.humidity
            var wind2 = document.getElementById("wind2")
            wind2.textContent = 'Winds: ' + forecast.list[12].wind.speed

        const day3Block = document.getElementById("day3")
            let date3 = document.getElementById("date3")
            let dateFormula3 = new Date(forecast.list[20].dt * 1000)
            date3.textContent = dateFormula3.toLocaleDateString("en-US")
            var temp3 = document.getElementById("temp3")
            temp3.textContent = 'Temp: ' + Math.round(forecast.list[20].main.temp)
            var humidity3 = document.getElementById("humidity3")
            humidity3.textContent = 'Humidity%: ' + forecast.list[20].main.humidity
            var wind3 = document.getElementById("wind3")
            wind3.textContent = 'Winds: ' + forecast.list[20].wind.speed

        const day4Block = document.getElementById("day4")
            let date4 = document.getElementById("date4")
            let dateFormula4 = new Date(forecast.list[28].dt * 1000)
            date4.textContent = dateFormula4.toLocaleDateString("en-US")
            var temp4 = document.getElementById("temp4")
            temp4.textContent = 'Temp: ' + Math.round(forecast.list[28].main.temp)
            var humidity4 = document.getElementById("humidity4")
            humidity4.textContent = 'Humidity%: ' + forecast.list[28].main.humidity
            var wind4 = document.getElementById("wind4")
            wind4.textContent = 'Winds: ' + forecast.list[28].wind.speed

        const day5Block = document.getElementById("day5")
            let date5 = document.getElementById("date5")
            let dateFormula5 = new Date(forecast.list[36].dt * 1000)
            date5.textContent = dateFormula5.toLocaleDateString("en-US")
            var temp5 = document.getElementById("temp5")
            temp5.textContent = 'Temp: ' + Math.round(forecast.list[36].main.temp)
            var humidity5 = document.getElementById("humidity5")
            humidity5.textContent = 'Humidity%: ' + forecast.list[36].main.humidity
            var wind5 = document.getElementById("wind5")
            wind5.textContent = 'Winds: ' + forecast.list[36].wind.speed



        // current weather data
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        }).then(function(weather){
            console.log(weather)
            // displaying current weather data on screen
            var dateEl = document.getElementById('date')
            let currrentDate = new Date(weather.dt * 1000)
            dateEl.textContent = currrentDate.toLocaleDateString("en-US")
            // current temp 
            var tempEl = document.getElementById('currentTemp')
            tempEl.textContent = 'Current Temp(F) = ' + Math.round(weather.main.temp)
            // high temp
            var maxTempEl = document.getElementById('highTemp')
            maxTempEl.textContent = 'High Temp(F) = ' + Math.round(weather.main.temp_max)
            // low temp
            var lowTempEl = document.getElementById('lowTemp')
            lowTempEl.textContent = 'Low Temp(F) = ' + Math.round(weather.main.temp_min)
            // winds
            var windEl = document.getElementById('wind')
            windEl.textContent = 'Wind = ' + weather.wind.speed
            var humidityEl = document.getElementById("humidity")
            humidityEl.textContent = 'Humidity% = ' + weather.main.humidity
            var cityTitleEl = document.getElementById('cityText')
            cityTitleEl.textContent = cityName
        })
    })
})
}
