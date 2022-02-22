let searchBtn = document.getElementById("search");
let searchInput = document.getElementById("search-input");
let demo = document.getElementById("demo");
let apiKey = "4212d24e9774fbfd9a59d2da3e816ae2";
let row = document.getElementById("weather");
let customCards = document.getElementById('custom-cards');
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      alert ("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(position) {
    let latitude = position.coords.latitude ;
    let longitude =  position.coords.longitude;
    const xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
        true
    );

    // What to do when response is ready
    xhr.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let main = json.main;
            let temp = Math.round(main["temp"]);
            let feelsLike = Math.round(main["feels_like"]);
            let humdity = Math.round(main["humidity"]);
            let temp_max = Math.round(main["temp_max"]);
            let temp_min = Math.round(main["temp_min"]);
            let wind = json.wind;
            let wind_speed = wind["speed"];
            let weather = json.weather;
            let desc = weather[0]["description"];
            let weatherid = parseInt(weather[0]["id"]);
            let city = json.name;
            let weatherImg = "";
            let imgSrc = "";
            if (weatherid >= 200 && weatherid < 300) {
                weatherImg = "Thunderstorm.jpg";
                imgSrc = "http://openweathermap.org/img/wn/11n@2x.png";
            } else if (weatherid >= 300 && weatherid < 400) {
                weatherImg = "Drizzle.jpg";
                imgSrc = "http://openweathermap.org/img/wn/09n@2x.png";
            } else if (weatherid >= 500 && weatherid < 600) {
                weatherImg = "Rain.jpg";
                imgSrc = "http://openweathermap.org/img/wn/10n@2x.png";
            } else if (weatherid >= 600 && weatherid < 700) {
                weatherImg = "Snow.jpg";
                imgSrc = "http://openweathermap.org/img/wn/13n@2x.png";
            } else if (weatherid >= 700 && weatherid < 800) {
                weatherImg = "Haze.jpg";
                imgSrc = "http://openweathermap.org/img/wn/50n@2x.png";
            } else if (weatherid == 800) {
                weatherImg = "Clear.jpg";
                imgSrc = "http://openweathermap.org/img/wn/01n@2x.png";
            } else if (weatherid > 800) {
                weatherImg = "Clouds.jpg";
                imgSrc = "http://openweathermap.org/img/wn/04n@2x.png";
            }
            customCards.style.display="none";
            document.location="index.html#weather";
            row.innerHTML = `
            <div class="col-md-6 px-4 text-light weather-container" style="background:url('Images/${weatherImg}'); background-size:100%; background-repeat:no-repeat">
            <div class="row">
                <div class="col-md-7 col-7 weather-row">
                
                    <p class="lead fw-bold">Location: ${city}</p>
                    <p class="lead fw-bold">
                    ${desc.charAt(0).toUpperCase() + desc.slice(1)}</b>
                </p>
                    <h2 class="display-1 fw-bold" id=""> ${temp} &#778; C</h2>
                    <p class="lead">Feels like: ${feelsLike} &#778; C </p>
                     
                </div>
                <div class="col-md-5 col-5 d-flex align-items-center">
                <img src="${imgSrc}" width="150">
                </div>
            </div>
        </div>
            <div class="col-md-6 bg-dark text-white p-4">
                <h2>More details</h2>
                <p class="pt-3 lead">Max temperature: ${temp_max} &#778; C <br> Min temperature: ${temp_min} &#778; C</p>
                <p class="lead">Wind Speed: ${wind_speed} Km/hr <br>Humidity: ${humdity}%</p>
                <p class="pt-3">Showing weahter based on your current location</p>
            </div>
    </div>`;
        } else {
            console.log("Some error occured");
        }
    };

    xhr.send();
  }

searchBtn.addEventListener("click", () => {
    const xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        `http://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`,
        true
    );

    // What to do when response is ready
    xhr.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let main = json.main;
            let temp = Math.round(main["temp"]);
            let feelsLike = Math.round(main["feels_like"]);
            let humdity = Math.round(main["humidity"]);
            let temp_max = Math.round(main["temp_max"]);
            let temp_min = Math.round(main["temp_min"]);
            let wind = json.wind;
            let wind_speed = wind["speed"];
            let weather = json.weather;
            let desc = weather[0]["description"];
            let weatherid = parseInt(weather[0]["id"]);
            let city = json.name;
            let weatherImg = "";
            let imgSrc = "";
            if (weatherid >= 200 && weatherid < 300) {
                weatherImg = "Thunderstorm.jpg";
                imgSrc = "http://openweathermap.org/img/wn/11n@2x.png";
            } else if (weatherid >= 300 && weatherid < 400) {
                weatherImg = "Drizzle.jpg";
                imgSrc = "http://openweathermap.org/img/wn/09n@2x.png";
            } else if (weatherid >= 500 && weatherid < 600) {
                weatherImg = "Rain.jpg";
                imgSrc = "http://openweathermap.org/img/wn/10n@2x.png";
            } else if (weatherid >= 600 && weatherid < 700) {
                weatherImg = "Snow.jpg";
                imgSrc = "http://openweathermap.org/img/wn/13n@2x.png";
            } else if (weatherid >= 700 && weatherid < 800) {
                weatherImg = "Haze.jpg";
                imgSrc = "http://openweathermap.org/img/wn/50n@2x.png";
            } else if (weatherid == 800) {
                weatherImg = "Clear.jpg";
                imgSrc = "http://openweathermap.org/img/wn/01n@2x.png";
            } else if (weatherid > 800) {
                weatherImg = "Clouds.jpg";
                imgSrc = "http://openweathermap.org/img/wn/04n@2x.png";
            }
            customCards.style.display="none";
            document.location="index.html#weather";
            row.innerHTML = `
            <div class="col-md-6 px-4 text-light weather-container" style="background:url('Images/${weatherImg}'); background-size:100%; background-repeat:no-repeat">
            <div class="row">
                <div class="col-md-7 col-6 weather-row">
                    <p class="lead pt-3 fw-bold">Location: ${city}</p>
                    <p class="lead fw-bold">
                    ${desc.charAt(0).toUpperCase() + desc.slice(1)}</b>
                </p>
                    <h2 class="display-1 fw-bold" id=""> ${temp} &#778; C</h2>
                    <p class="lead">Feels like: ${feelsLike} &#778; C </p>
                     
                </div>
                <div class="col-md-5 col-6 d-flex align-items-center">
                <img src="${imgSrc}" width="150">
                </div>
            </div>
        </div>
            <div class="col-md-6 bg-dark text-white p-4">
                <h2>More details</h2>
                <p class="pt-3 lead">Max temperature: ${temp_max} &#778; C <br> Min temperature: ${temp_min} &#778; C</p>
                <p class="lead">Wind Speed: ${wind_speed} Km/hr <br>Humidity: ${humdity}%</p>
            </div>
    </div>`;
        } else {
            alert("No such city found. Check if you have spelt it correctly");
        }
    };

    xhr.send();
});
