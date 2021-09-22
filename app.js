let city = document.querySelector("#city");
let cityName = document.getElementById('city_search');
let desc = document.querySelector('#desc')
let temp = document.querySelector('#temp');
let pesquisa = document.querySelector('#pesquisa')
let icon = document.querySelector('#icon')

pesquisa.addEventListener('click', function(){
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+cityName.value+'&units=metric&lang=pt_br&appid=c765fc40bb2e410d490051d8955652e3')
    .then(response => response.json())
    .then(data => {
        let nameValue = data['name'];
        let tempValue = data['main']['temp'];
        let descValue =  data['weather'][0]['description'];
        let weather = data['weather'][0]['main'];

        const date = new Date();
        localTime = date.getTime();
        localOffset = date.getTimezoneOffset() * 60000;
        utc = localTime + localOffset;
        let newDate = utc + (1000 * data.timezone);
        cityDate = new Date(newDate);
        const dateHours = cityDate.getHours();

        changeIcon(icon, dateHours, weather);

        city.innerHTML= nameValue;
        temp.innerHTML = tempValue.toFixed(0) + " °C";
        desc.innerHTML = toTitleCase(descValue);
    })

.catch(err => alert("Wrong City Name"))
})


function changeIcon(img, date, weather) {
    if(date >= 18 || date <= 5){
        img.src = "images/moon/" + weather + ".png"

    } else {
        img.src = "images/sun/" + weather + ".png"
    }
}

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

