// Step-1
let weatherSearch = document.querySelector(".weather-search");
let citySearch = document.querySelector(".city-search");
let cityName = document.querySelector(".weather-city");
let dateTime = document.querySelector(".weather-data-time");
let weatherForecast= document.querySelector(".weather-forecast");
let weatherIcon = document.querySelector(".weather-icon");
let weatherTemprature = document.querySelector(".weather-temperature");
let weatherMin = document.querySelector(".weather-min");
let weatherMax = document.querySelector(".weather-max");
let feelsLike = document.querySelector(".wether-feels-like");
let weatherHumidity = document.querySelector(".humidity");
let weatherWind = document.querySelector(".wind");
let weatherPressure = document.querySelector(".pressure");
let city = "london";

const currentDay = (localtime) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Staurday"];
    const dayNumber = new Date(localtime).getDay();
    return days[dayNumber];
};


const getData = async () => {
    const w_url = `http://api.weatherapi.com/v1/current.json?key=f0e979747d664103a58150304241807&q=${city}`;
    const res = await fetch(w_url);
    const data = await res.json();
    console.log(data);
    
    const {current, location} = data;
    const {condition, feelslike_c, humidity, pressure_in, temp_c, wind_mph} = current;
    const {text, code, icon} = condition;
    const {name, localtime, country} = location;
    const day = currentDay(localtime);
    
    // console.log("code:", code, "\n", "icon:", icon, "\n", "text:", text);
    // console.log("feels like:", feelslike_c, "\n", "humidity:", humidity, "\n", "pressure:", pressure_in, "\n", "temprature:", temp_c, "\n", "wind:", wind_mph);
    // console.log("name:", name, "\n", "local time:", localtime, "\n", "country:", country);

    cityName.innerHTML = `${name}, ${country}`;
    dateTime.innerHTML =  `${day}, ${localtime}`;
    weatherForecast.innerHTML = `${text}`;
    weatherIcon.innerHTML = `<img src="https:${icon}">`;
    weatherTemprature.innerHTML = `${temp_c}&#176c`;
    feelsLike.innerHTML = `${feelslike_c}&#176c`
    weatherHumidity.innerHTML = `${humidity}%`;
    weatherWind.innerHTML = `${wind_mph} m/h`;
    weatherPressure.innerHTML = `${pressure_in} hpa`;
}; 

document.body.addEventListener("load", getData());
weatherSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    city = citySearch.value;
    citySearch.value = "";
    getData();
});