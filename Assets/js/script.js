console.log(window);

const APIKey = "25213c85f2dcb742bd77c26242a111f7";
const baseUrl = 'https://api.openweathermap.org/';

// const now = dayjs();
const cityNameInput = document.querySelector("#cityName");
const searchForm = document.querySelector("#searchForm");
const searchButton = document.querySelector(".btn");
const previousSearches = document.querySelector("#previousSearches");
const previousSearchContainer = document.querySelector("#previousSearches .cardBody");
const dailyCardContainer = document.querySelector("#currentForecast");

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
        console.log(data)
        setToLocalStorage(data);
        displayCurrent(data);
    })
};
    
function setToLocalStorage(data){
    const { 
        name,
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
    localStorage.setItem(name, JSON.stringify({humidity, temp, windSpeed, icon}));  
}

function displayCurrent(data) {
}