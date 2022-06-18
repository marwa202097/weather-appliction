var searchTxt = document.getElementById('searchTxt');
var todayName = document.getElementById('today-Name');
var todayDate = document.getElementById('today-date');
var citylocation = document.getElementById('location');
var todayDegree = document.getElementById('today-degree');
var degreeIcon = document.getElementById('degree-icon');
var todayDescription = document.getElementById('today-description');
 var humidty = document.getElementById('humidty');
var wind = document.getElementById('wind');
var compass = document.getElementById('compass');
// next days variables
var nextDayName = document.getElementsByClassName('nextDayName');
var nextDate = document.getElementsByClassName('nextDate');
var nextDayMaxDegree = document.getElementsByClassName('nextDay-maxDegree');
var nextDayMinDegree = document.getElementsByClassName('nextDay-minDegree');
var nextDayIcon = document.getElementsByClassName('nextDayIcon');
var nextDayDescription = document.getElementsByClassName('nextDayDescription');
var response;
var responseData;
var currentLocation = "cairo";
var date = new Date(),
weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
monthName = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];

async function getData(){
    response= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=848e4c9efef048e494f100521210205&q=${currentLocation}&days=3&aqi=no&alerts=no`);
    responseData = await response.json();
    console.log(responseData);
    displayData();
    displayNxtDayData()
}
//Onload Calling Function:
getData();
//Live Search Location Function:
searchTxt.addEventListener("keyup", function() {
    currentLocation = searchTxt.value;
    getData();
});

// Display Data at Contant-Box

function displayData()
{
    let dateApi =responseData.forecast.forecastday[0].date   // 2022-06-18
    let date_components = dateApi.split("-");                // array [2022,06,18]
    let currentDay = date_components[2];                    // 18   
    todayName.innerHTML = weekDays[date.getDay()];
    todayDate.innerText = `${currentDay} ${monthName[date.getMonth()]}`;
    citylocation.innerHTML = responseData.location.name;
    todayDegree.innerHTML = responseData.current.temp_c;
    degreeIcon.setAttribute('src',`https:${responseData.current.condition.icon}`)
    todayDescription.innerHTML = responseData.forecast.forecastday[0].day.condition.text;
    humidty.innerHTML = responseData.current.humidity;
    wind.innerHTML = responseData.current.wind_kph;
    compass.innerHTML =responseData.current.wind_dir
}

//Next Day - Name Function;
function getNextDays(nxtDateApi) {

    let day = new Date(nxtDateApi);
    return day && weekDays[day.getDay()]; 
 };
 
 //Next Day - Month Function;
 function getNextDayMonth(nxtDateApi) {
 
     let month = new Date(nxtDateApi);
     return month && monthName[month.getMonth()];
  };

function displayNxtDayData()
{
    for(var i=0;i<nextDayName.length;i++)
    {
        let nxtDateApi =responseData.forecast.forecastday[i+1].date   // 2022-06-19&20
        let date_components = nxtDateApi.split("-");                // array [2022,06,19&20]
        let nxtDay = date_components[2];       //19 & 20
        console.log(nxtDay);
        nextDayName[i].innerHTML = getNextDays(nxtDateApi);
        nextDate[i].innerHTML = `${nxtDay} ${getNextDayMonth(nxtDateApi)}`;
        nextDayIcon[i].setAttribute("src", `https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
        nextDayMaxDegree[i].innerHTML = Math.round(responseData.forecast.forecastday[i+1].day.maxtemp_c);
        nextDayMinDegree[i].innerHTML = Math.round(responseData.forecast.forecastday[i+1].day.mintemp_c);
        nextDayDescription[i].innerHTML= responseData.forecast.forecastday[i+1].day.condition.text;
    }
}

   
    
  