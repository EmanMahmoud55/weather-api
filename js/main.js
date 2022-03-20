let apiResponse;
let responseData;

let searchInput=document.getElementById("search");

let today=document.getElementById("day-name");
let todayDate=document.getElementById("date");
let cityLocation =document.getElementById("location");
let todayDegree = document.getElementById("today-degree");
let weatherIcon= document.getElementById("weather-icon");
let weatherDescription=document.getElementById("weather-status");
let wind =document.getElementById("wind");
let windDirection= document.getElementById("wind-dir");
let Humidity=document.getElementById("humidity");
//let currentCity="cairo";



let nextDay=document.getElementsByClassName("next-day");
let maxDegree=document.getElementsByClassName("max-degree");
let minDegree=document.getElementsByClassName("min-degree");
let nextIcon=document.getElementsByClassName("next-icon");
let nextDescription=document.getElementsByClassName("weather-desc");


let months=["january","february","march","April","May","June","July","Augest","September","October","November","December"]
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","saturday"]


async function getWeatherData(currentCity='cairo'){
 apiResponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7db45529923a4336951120122222101&q=${currentCity}&days=3`);
 responseData= await apiResponse.json();

console.log(responseData)
displayWeatherData();
displayNextDayWeather();

}

getWeatherData();


function displayWeatherData()
{
    let date=new Date();
    today.innerHTML=days[date.getDay()];
  todayDate.innerHTML=`${date.getDate()} ${months[date.getMonth()]}`
  cityLocation.innerHTML=responseData.location.name;
  todayDegree.innerHTML=responseData.current.temp_c;
  weatherIcon.setAttribute("src",`https:${responseData.current.condition.icon}`);
  weatherDescription.innerHTML=responseData.current.condition.text;
  Humidity.innerHTML=responseData.current.humidity;
  wind.innerHTML=responseData.current.wind_kph;
  windDirection.innerHTML=responseData.current.wind_dir;

}

function displayNextDayWeather()
{
    for(let i=0;i<nextDay.length;i++)
    {
        nextDay[i].innerHTML= days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
       maxDegree[i].innerHTML=responseData.forecast.forecastday[i+1].day.maxtemp_c;
       minDegree[i].innerHTML=responseData.forecast.forecastday[i+1].day.mintemp_c;
       nextIcon[i].setAttribute("src",`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
       nextDescription[i].innerHTML=responseData.forecast.forecastday[i+1].day.condition.text;

    }
}

searchInput.addEventListener('keyup',function(){
 let currentCity=searchInput.value;
   getWeatherData(currentCity);
})