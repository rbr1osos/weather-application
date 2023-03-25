import './styles.css'
import {showHourData} from './functions.js'
import {todayTemp} from './functions'
import { createWeek } from './functions.js'

const title_h2 = document.querySelector('.title')
const temp_h1 = document.querySelector('.temp')
const weather_h3 = document.querySelector('.weather-type')
const feel_h3 = document.querySelector('.feel-like')
const search_button = document.querySelector('.search-button')
const search_input = document.getElementById('search')
const UV_input=document.querySelector('.UV')
const wind_input=document.querySelector('.wind')
const humidity_input=document.querySelector('.humidity')
const chance_input=document.querySelector('.chance')
const sunrise_input=document.querySelector('.sunrise')
const sunset_input=document.querySelector('.sunset')
const pressure_input=document.querySelector('.pressure')
const visibility_input=document.querySelector('.visibility')

/* ***************@@@@@@@@@@@@@@@@@@@@@@Need to create a function that handles errors@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
getWeather('San Francisco')

search_button.addEventListener('click',()=>{
    const  all_hours = document.querySelectorAll('.hour-container')
    all_hours.forEach((hour)=>{
        hour.remove()
    })
    const  all_days = document.querySelectorAll('.weekly-content')
    all_days.forEach((day)=>{
        day.remove()
    })
    getWeather(search_input.value)

})


async function getWeather(input){
    const forecastResponse = await fetch('https://api.weatherapi.com/v1/forecast.json?key=8c3a53840fda484d95933559232303&q='+input+'&days=7', {mode: 'cors'});
    const forecastData = await forecastResponse.json();
    displayWeather(forecastData)
}

function displayWeather(forecast){
    const weeklyForecast=forecast.forecast.forecastday
    const forecastArray=forecast.forecast.forecastday[0].hour
    //weekly day data
    for(let i=0;i<7;i++){
        createWeek(weeklyForecast[i])
    }
    //hour data
    for(let i=0;i<24;i++){
        showHourData(forecastArray[i])
        todayTemp(forecastArray[i])
    }

    //display
    title_h2.innerHTML= forecast.location.name
    //  temp_h1.innerHTML = data.current.temp_f //round it out
    weather_h3.innerHTML = 'clear sky'
    
    //*************** Right side */
    UV_input.innerHTML= forecast.forecast.forecastday[0].day.uv
    //--need UV desc
    wind_input.innerHTML = forecast.forecast.forecastday[0].day.maxwind_mph
    //--need wind desc
    humidity_input.innerHTML = forecast.forecast.forecastday[0].day.avghumidity
    chance_input.innerHTML =  forecast.forecast.forecastday[0].day.daily_chance_of_rain +'%'
    sunrise_input.innerHTML = forecast.forecast.forecastday[0].astro.sunrise
    sunset_input.innerHTML = forecast.forecast.forecastday[0].astro.sunset
    //pressure need to add current pressure and DESC
    visibility_input.innerHTML =  forecast.forecast.forecastday[0].day.avgvis_km+'km' //km
    //add desc

}