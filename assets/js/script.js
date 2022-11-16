// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=f95c2d04f516fc0e509fd5fd102333d4
// https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=f95c2d04f516fc0e509fd5fd102333d4
var searchCity = document.getElementById("searchCity")

searchCity.addEventListener("click", function() {
    var cityName = document.getElementById("citySearch").value
    console.log(cityName)
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=f95c2d04f516fc0e509fd5fd102333d4`)
.then(function (response){
    console.log(response)
    return response.json();
}).then(function(data){
    console.log(data)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=f95c2d04f516fc0e509fd5fd102333d4`)
    .then(function (response){
        return response.json();
    }).then(function(data){
        console.log(data)
        // create elements, append elements with data indexes

    })
})
})


