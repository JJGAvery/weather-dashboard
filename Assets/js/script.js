const APIKey = "25213c85f2dcb742bd77c26242a111f7";
const baseUrl = 'https://api.openweathermap.org/';

const cityNameInput = document.querySelector("#cityName");
const searchForm = document.querySelector("#searchForm");
const searchButton = document.querySelector(".btn");
const previousSearchContainer = document.querySelector("#previousSearchField");
let previousSearchName;
const dailyCardContainer = document.querySelector("#currentForecast");

loadSearches();

searchButton.addEventListener('click', (e) =>{
    e.preventDefault()
    currentForecast(cityNameInput.value);
})

function loadSearches(){
    previousSearch();
    previousSearchName = document.querySelectorAll('#city')
    previousSearchName.forEach(cityName => cityName.addEventListener('click', (e)=>loadPrevious(e)))
}

function currentForecast(cityNameInput){
    const url = `${baseUrl}data/2.5/weather?q=${cityNameInput}&APPID=${APIKey}&units=imperial`;
    fetch(url)
    .then((response) => {   
        return response.json();
    }).then((data) => {
        clearCurrent();
        setToLocalStorage(data);
        displayCurrent(data);
        fiveDayForecast(data);
        loadSearches();
    })
    
};

// load previous searches on website load
function loadPrevious(e){
    const cityName = e.target.dataset.city;
    const cityData = JSON.parse(localStorage.getItem(cityName));
    clearCurrent();
    displayCurrent(cityData);
    fiveDayForecast(cityData);
}

// previous search history
function previousSearch(){
    const storedCities = Object.keys(localStorage)
    const storedCitiesHTML = storedCities.map((city) => {
        return (
            `<li id="city">\
                <h3 class="previous-search-city" data-city="${city}">${city}</h3>
            </li>\
            `
        )
    })
    previousSearchContainer.innerHTML=storedCitiesHTML.join(' ')    
};


function fiveDayForecast(data){
    const url = `${baseUrl}data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${APIKey}&units=imperial`;
    fetch(url)
    .then((response) => {
        return response.json();
    }).then ((fiveDayData) => {
        displayFiveDayForecast(fiveDayData);
    })
};
    
// current weather
function displayCurrent(data){
    document.getElementById("conditions");
    conditions.innerHTML+=`<h2>${data.name}</h2>`;
    conditions.innerHTML+=`<p><img src = "http://openweathermap.org/img/wn/${data.weather[0].icon}.png"></p>`;
    conditions.innerHTML+=`<p>Temp: ${data.main.temp}°F</p>`;
    conditions.innerHTML+=`<p>Wind Speed: ${data.wind.speed}MPH</p>`;
    conditions.innerHTML+=`<p>Humidity: ${data.main.humidity}%</p>`;
};

// 5 day forecast
function displayFiveDayForecast(fiveDayData){
    const fiveDayContainer = document.getElementById("five_day_data")
    const fiveDayTrim = fiveDayData.list.filter((forecast) => {
        return forecast.dt_txt.includes("12:00:00")
    })
    const fiveDayCards = fiveDayTrim.map((day, i) => {
        const dateFormat = new Date(day.dt_txt).toDateString()
        return (
            `<li class="five_day_card" id="day${i+1}">\
                <h3 class="date"> ${dateFormat}</h3>
                <p><img src = "http://openweathermap.org/img/wn/${day.weather[0].icon}.png"></p>\
                <p>Temp: ${day.main.temp_max}°F</p>\
                <p>Wind Speed: ${day.wind.speed}MPH</p>\
                <p>Humidity: ${day.main.humidity}%</p>\
            </li>\
            `
        )
    })
    fiveDayContainer.innerHTML = fiveDayCards.join(' ')
};

// set weather conditions to local storage
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
            speed
        },
        weather: {
            0: {icon}
        }
    } = data
    localStorage.setItem(name, JSON.stringify({name, coord: {lat, lon}, main: {humidity, temp}, wind: {speed}, weather: {0: {icon}}})); 
};

// clear previous data for current weather and for 5 day forecast
function clearCurrent() {
    document.getElementById("conditions").innerHTML = "";
    document.getElementById("five_day_data").innerHTML = "";
};
