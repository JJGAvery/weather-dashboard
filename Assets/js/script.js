console.log(window);

const APIKey = "25213c85f2dcb742bd77c26242a111f7";
const baseUrl = 'https://api.openweathermap.org/';

const cityNameInput = document.querySelector("#cityName");
const searchForm = document.querySelector("#searchForm");
const searchButton = document.querySelector(".btn");
const previousSearches = document.querySelector("#previousSearcheField");
const previousSearchContainer = document.querySelector("#previousSearchField .cardBody");
const dailyCardContainer = document.querySelector("#currentForecast");
const previousField = document.querySelector("#previousSearchField")

searchButton.addEventListener('click', (e) =>{
    e.preventDefault()
    currentForecast(cityNameInput.value);
})

function currentForecast(cityNameInput){
    const url = `${baseUrl}data/2.5/weather?q=${cityNameInput}&APPID=${APIKey}&units=imperial`;
    fetch(url)
    .then((response) => {
        console.log(response);
        return response.json();
    }).then((data) => {
        clearcontent();
        setToLocalStorage(data);
        displayCurrent(data);
        fiveDayForecast(data);
    })
};

function fiveDayForecast(data){
    console.log(data)
    const url = `${baseUrl}data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${APIKey}&units=imperial`;
    fetch(url)
    .then((response) => {
        console.log(response);
        return response.json();
    }).then ((fiveDayData) => {
        console.log(fiveDayData)
        displayFiveDayForecast(fiveDayData);
    })
};
    
function displayCurrent(data){
    document.getElementById("conditions");
    conditions.innerHTML+=`<h4>${data.name}</h4>`;
    conditions.innerHTML+=`<p><img src = "http://openweathermap.org/img/wn/${data.weather[0].icon}.png"></p>`;
    conditions.innerHTML+=`<p>Temp: ${data.main.temp}°F</p>`;
    conditions.innerHTML+=`<p>Wind Speed: ${data.wind.speed}MPH</p>`;
    conditions.innerHTML+=`<p>Humidity: ${data.main.humidity}%</p>`;
}
// 5 day forecast
function displayFiveDayForecast(fiveDayData){
    // day1
    document.getElementById("day1");
    day1.innerHTML+=`<p><img src = "http://openweathermap.org/img/wn/${fiveDayData.list[1].weather[0].icon}.png"></p>`;
    day1.innerHTML+=`<p>Temp: ${fiveDayData.list[1].main.temp_max}°F</p>`;
    day1.innerHTML+=`<p>Wind Speed: ${fiveDayData.list[1].wind.speed}MPH</p>`;
    day1.innerHTML+=`<p>Humidity: ${fiveDayData.list[1].main.humidity}%</p>`;
    // day2
    document.getElementById("day2");
    day2.innerHTML+=`<p><img src = "http://openweathermap.org/img/wn/${fiveDayData.list[9].weather[0].icon}.png"></p>`;
    day2.innerHTML+=`<p>Temp: ${fiveDayData.list[9].main.temp_max}°F</p>`;
    day2.innerHTML+=`<p>Wind Speed: ${fiveDayData.list[9].wind.speed}MPH</p>`;
    day2.innerHTML+=`<p>Humidity: ${fiveDayData.list[9].main.humidity}%</p>`;
    // day3
    document.getElementById("day3");
    day3.innerHTML+=`<p><img src = "http://openweathermap.org/img/wn/${fiveDayData.list[17].weather[0].icon}.png"></p>`;
    day3.innerHTML+=`<p>Temp: ${fiveDayData.list[17].main.temp_max}°F</p>`;
    day3.innerHTML+=`<p>Wind Speed: ${fiveDayData.list[17].wind.speed}MPH</p>`;
    day3.innerHTML+=`<p>Humidity: ${fiveDayData.list[17].main.humidity}%</p>`;
    // day4
    document.getElementById("day4");
    day4.innerHTML+=`<p><img src = "http://openweathermap.org/img/wn/${fiveDayData.list[25].weather[0].icon}.png"></p>`;
    day4.innerHTML+=`<p>Temp: ${fiveDayData.list[25].main.temp_max}°F</p>`;
    day4.innerHTML+=`<p>Wind Speed: ${fiveDayData.list[25].wind.speed}MPH</p>`;
    day4.innerHTML+=`<p>Humidity: ${fiveDayData.list[25].main.humidity}%</p>`;
    // day5
    document.getElementById("day5");
    day5.innerHTML+=`<p><img src = "http://openweathermap.org/img/wn/${fiveDayData.list[33].weather[0].icon}.png"></p>`;
    day5.innerHTML+=`<p>Temp: ${fiveDayData.list[33].main.temp_max}°F</p>`;
    day5.innerHTML+=`<p>Wind Speed: ${fiveDayData.list[33].wind.speed}MPH</p>`;
    day5.innerHTML+=`<p>Humidity: ${fiveDayData.list[33].main.humidity}%</p>`;
}

function setToLocalStorage(data){
    const { 
        name,
        coord: {
             lat,
             lon,
        },
        main: {
            humidity, 
            temp, 
        },
        wind: {
            speed: windSpeed
        },
        weather: {
            0: {icon}
        }
    } = data
    localStorage.setItem(name, JSON.stringify({lat, lon, humidity, temp, windSpeed, icon})); 
}


function clearcontent() {
    document.getElementById("conditions").innerHTML = "";
}





