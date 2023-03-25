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
const UV_index=document.querySelector('.UV-desc')
const wind_input=document.querySelector('.wind')
const wind_desc = document.querySelector('.wind-desc')
const humidity_input=document.querySelector('.humidity')
const chance_input=document.querySelector('.chance')
const sunrise_input=document.querySelector('.sunrise')
const sunset_input=document.querySelector('.sunset')
const pressure_input=document.querySelector('.pressure')
const visibility_input=document.querySelector('.visibility')
const visibility_desc=document.querySelector('.visibility-desc')

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
    // console.log(forecast.current)
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

    function checkVisibility(visibility){
        if (visibility>0 && visibility<3){
            return "Thin Fog"
        }
        else if (visibility>3 && visibility<5){
            return "Haze"
        }
        else if (visibility>4 && visibility<11){
            return "Light Haze"
        }
        else if (visibility>10 && visibility<21){
            return "Clear"
        }
        else if (visibility>20 && visibility<2){
            return "Very Clear"
        }
        else if (visibility>20){
            return "Exceptionally Clear"
        }
        else{
            return "Fog"
        }
    }
    function checkWindSpeed(wind){
        if(wind===0){
            return 'Calm'
        }
        else if((wind>0&& wind<12)){
            return 'Light Breeze'
        }
        else if((wind>12 &&wind<24)){
            return "Strong Wind"
        }
        else if((wind>24 && wind<36)){
            return "Very Strong Wind"
        }
        else{
            return "Extreme Wind"
        }
    }

    function checkUvIndex(index){
        if(index<3){
            return "Low. No protection needed"
        }
        else if(index>3 && index<6){
            return "Moderate. Protection required"
        }
        else if(index>6 && index<8){
            return "High. Extra protection needed"
        }
        else if(index>8 && index<11){
            return "Extreme. Extra protection needed"
        }
        else if(index>11){
            return "Staying inside recommended"
        }

    }
    //display
    title_h2.innerHTML= forecast.location.name
    weather_h3.innerHTML = forecast.current.condition.text

    //*************** Right side */
    
    UV_input.innerHTML= forecast.forecast.forecastday[0].day.uv
    UV_index.innerHTML= checkUvIndex(forecast.current.uv)
    wind_input.innerHTML = forecast.current.wind_mph +'mph'
    wind_desc.innerHTML= checkWindSpeed(forecast.current.wind_mph)
    humidity_input.innerHTML = forecast.forecast.forecastday[0].day.avghumidity
    chance_input.innerHTML =  forecast.forecast.forecastday[0].day.daily_chance_of_rain +'%'
    sunrise_input.innerHTML = forecast.forecast.forecastday[0].astro.sunrise
    sunset_input.innerHTML = forecast.forecast.forecastday[0].astro.sunset
    pressure_input.innerHTML= forecast.current.pressure_mb
    visibility_input.innerHTML =  forecast.current.vis_km+'km' //km
    visibility_desc.innerHTML = checkVisibility(forecast.current.vis_km)
}