import { isThisHour } from "date-fns";
import { parseISO } from "date-fns";
import { getDay } from "date-fns";
export function timeDifference(testing){
    const today = (new Date()).getHours();
    const inputHour = new Date(testing).getHours();
    const result = inputHour - today;

    if(result===0){
        return 'now'
    }
    else{
        if(inputHour<12){
            if(inputHour===0){
                return 12+'am'
            }
            else{
            return inputHour+'am';
            }
        }
        else{
            if(inputHour===12){
                return 12+'pm'
            }
            return (inputHour-12)+'pm'
        }
    }
    
}
export function showHourData(data){
    const container = document.querySelector('.hourly-content-container')
    const content= document.createElement('div')
    content.classList.add('hour-container')

    const hour = document.createElement('p')
    hour.classList.add('hour-time')
    hour.innerHTML= timeDifference(data.time)

    const temp = document.createElement('p')
    temp.classList.add('hour-temp')
    temp.innerHTML= Math.round(data.temp_f)+'°'
    
    content.appendChild(hour)
    content.appendChild(temp)
    container.appendChild(content)

}

export function todayTemp(input){
    const currentHour = input.time
    if(isThisHour(parseISO(currentHour))){
        const current_temp=document.querySelector('.temp')
        current_temp.innerHTML= Math.round(input.temp_f)+'°'
    }
}

export function createWeek(input){
    console.log(input)
    let day;
    //displays DAYS
    switch(getDay(new Date(input.date))){
        case 0:
            day= "Sunday";
            break;
          case 1:
            day="Monday";
            break;
          case 2:
            day="Tuesday";
            break;
          case 3:
            day="Wednesday";
            break;
          case 4:
            day="Thursday";
            break;
          case 5:
            day="Friday";
            break;
          case  6:
            day="Saturday";
        }

    //min temp
    const min_temp = input.day.mintemp_f
    const max_temp = input.day.maxtemp_f

        displayWeek(day,min_temp,max_temp)
}

export function displayWeek(input,min_temp,max_temp){

    //create function that display the DAY (sunday,monday,etc)
    const week_container = document.querySelector('.weekly-container')
    const week_content = document.createElement('div')
    week_content.classList.add('weekly-content')
    week_container.appendChild(week_content)
    const week_title = document.createElement('h3')
    week_title.innerHTML= input
    week_content.appendChild(week_title)

    const week_icon =  document.createElement('div')
    week_icon.innerHTML='Icon'
    week_content.appendChild(week_icon)

    const avg_temp_container  = document.createElement('div')
    avg_temp_container.classList.add('avg-container')
    const avg_low =  document.createElement('h3')
    avg_low.innerHTML=Math.round(min_temp)+'°'
    avg_temp_container.appendChild(avg_low)
    const avg_high = document.createElement('h3')
    avg_high.innerHTML=Math.round(max_temp)+'°'
    avg_temp_container.appendChild(avg_high)
    week_content.appendChild(avg_temp_container)

    // console.log(input)
    //create containers
    //crea
}