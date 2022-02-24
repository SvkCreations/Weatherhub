let searchBtn = document.getElementById("search-btn");
let searchInput = document.getElementById("search-input");
let backHome = document.getElementById("backHome");
let hourly = document.getElementById('hourly-cards');
let daily = document.getElementById('daily-cards');
let demo = document.getElementById("demo");
let apiKey = "4212d24e9774fbfd9a59d2da3e816ae2";
let row = document.getElementById("weather");
let customCards = document.getElementById("custom-cards");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
    true
  );

  // What to do when response is ready
  xhr.onload = function () {
    backHome.style.display="none";
    document.getElementById("hourly-heading").style.display="block";
    document.getElementById("daily-heading").style.display="block";
    // function timeConverter(UNIX_timestamp) {
    //   var a = new Date(UNIX_timestamp * 1000);
    //   var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //   var year = a.getFullYear();
    //   var month = months[a.getMonth()];
    //   var date = a.getDate();
    //   var hour = a.getHours();
    //   var min = a.getMinutes();
    //   var sec = a.getSeconds();
    //   var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    //   return time;
    // }
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      let main = json.main;
      let temp = Math.round(main["temp"]);
      let feelsLike = Math.round(main["feels_like"]);
      let humdity = Math.round(main["humidity"]);
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
        imgSrc = "https://openweathermap.org/img/wn/11n@2x.png";
      } else if (weatherid >= 300 && weatherid < 400) {
        weatherImg = "Drizzle.jpg";
        imgSrc = "https://openweathermap.org/img/wn/09n@2x.png";
      } else if (weatherid >= 500 && weatherid < 600) {
        weatherImg = "Rain.jpg";
        imgSrc = "https://openweathermap.org/img/wn/10n@2x.png";
      } else if (weatherid >= 600 && weatherid < 700) {
        weatherImg = "Snow.jpg";
        imgSrc = "https://openweathermap.org/img/wn/13n@2x.png";
      } else if (weatherid >= 700 && weatherid < 800) {
        weatherImg = "Haze.jpg";
        imgSrc = "https://openweathermap.org/img/wn/50n@2x.png";
      } else if (weatherid == 800) {
        weatherImg = "Clear.jpg";
        imgSrc = "https://openweathermap.org/img/wn/01n@2x.png";
      } else if (weatherid > 800) {
        weatherImg = "Clouds.jpg";
        imgSrc = "https://openweathermap.org/img/wn/04n@2x.png";
      }
      document.location = "index.html#weather";
      row.innerHTML = `
      <p class="px-4 text-light">Showing weather based on your current location</p>
            <div class="col-md-6 px-4 text-light weather-container" style="background:linear-gradient(to bottom, rgba(245, 246, 252, 0.0), #212529),url('Images/${weatherImg}'); background-size:cover; background-repeat:no-repeat">
            <div class="row">
                <div class="col-md-7 col-7 weather-row">
                
                    <p class="lead fw-bold pt-3">Location: ${city}</p>
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
                <p class="lead">Wind Speed: ${wind_speed} m/s <br>Humidity: ${humdity}%</p>

            </div>
    </div>`;
    } else {
      console.log("Some error occured");
    }
  };

  xhr.send();

  const xhr2 = new XMLHttpRequest();
  xhr2.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
    true
  );

  // What to do when response is ready
  xhr2.onload = function () {

    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      let main = json.hourly;
      for (let i = 0; i < 9; i++) {
        dt = main[i]["dt"];
        dateTime = timeConverter(parseInt(dt));
        temp = Math.round(main[i]["temp"]);
        feelsLike = Math.round(main[i]["feels_like"]);
        humidity = main[i]["humidity"];
        weather = main[i]["weather"];
        weatherid = weather[0]["id"];
        weatherMain = weather[0]["main"];
        let weatherImg = "";
        let imgSrc = "";
        if (weatherid >= 200 && weatherid < 300) {
          weatherImg = "Thunderstorm.jpg";
          imgSrc = "https://openweathermap.org/img/wn/11n@2x.png";
        } else if (weatherid >= 300 && weatherid < 400) {
          weatherImg = "Drizzle.jpg";
          imgSrc = "https://openweathermap.org/img/wn/09n@2x.png";
        } else if (weatherid >= 500 && weatherid < 600) {
          weatherImg = "Rain.jpg";
          imgSrc = "https://openweathermap.org/img/wn/10n@2x.png";
        } else if (weatherid >= 600 && weatherid < 700) {
          weatherImg = "Snow.jpg";
          imgSrc = "https://openweathermap.org/img/wn/13n@2x.png";
        } else if (weatherid >= 700 && weatherid < 800) {
          weatherImg = "Haze.jpg";
          imgSrc = "https://openweathermap.org/img/wn/50n@2x.png";
        } else if (weatherid == 800) {
          weatherImg = "Clear.jpg";
          imgSrc = "https://openweathermap.org/img/wn/01n@2x.png";
        } else if (weatherid > 800) {
          weatherImg = "Clouds.jpg";
          imgSrc = "https://openweathermap.org/img/wn/04n@2x.png";
        }
        hourly.innerHTML += `

            
            <div class="col">
        <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style="background-image: url('Images/${weatherImg}'); background-size:cover;background-repeat:no-repeat">
          <div class="d-flex flex-column h-100 pb-3 text-white text-shadow-1 pt-3 px-4">
          <h6 class="lh-1 py-2 fw-bold">${dateTime.slice(0, dateTime.length - 2)}</h6>
          <p class="lead fw-bold">${weatherMain.charAt(0).toUpperCase() + weatherMain.slice(1)}</p>
          <h2 class="display-3 fw-bold">${temp} &#778; C</h2>
          <p class="lead">Feels like: ${feelsLike}  &#778; C</p>
          <p class="lead">Humidity: ${humidity}%</p>
          </div>
        </div>
      </div>


                `;
      }


    } else {
      console.log("Some error occured");
    }
  };

  xhr2.send();

  const xhr3 = new XMLHttpRequest();
  xhr3.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
    true
  );

  // What to do when response is ready
  xhr3.onload = function () {

    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      let main = json.daily;
      for (let i = 0; i < 5; i++) {
        let unix_time = main[i]["dt"];
        let time = timeConverter(unix_time);
        let maxTemp = Math.round(main[i]["temp"]["max"]);
        let minTemp = Math.round(main[i]["temp"]["min"]);
        let humidity = main[i]["humidity"];
        let weather = main[i]["weather"][0];
        let weatherDesc = weather["description"];
        let weatherId = weather["id"];
        let weatherImg = "";
        let imgSrc = "";
        if (weatherId >= 200 && weatherId < 300) {
          weatherImg = "Thunderstorm.jpg";
          imgSrc = "https://openweathermap.org/img/wn/11n@2x.png";
        } else if (weatherId >= 300 && weatherId < 400) {
          weatherImg = "Drizzle.jpg";
          imgSrc = "https://openweathermap.org/img/wn/09n@2x.png";
        } else if (weatherId >= 500 && weatherId < 600) {
          weatherImg = "Rain.jpg";
          imgSrc = "https://openweathermap.org/img/wn/10n@2x.png";
        } else if (weatherId >= 600 && weatherId < 700) {
          weatherImg = "Snow.jpg";
          imgSrc = "https://openweathermap.org/img/wn/13n@2x.png";
        } else if (weatherId >= 700 && weatherId < 800) {
          weatherImg = "Haze.jpg";
          imgSrc = "https://openweathermap.org/img/wn/50n@2x.png";
        } else if (weatherId == 800) {
          weatherImg = "Clear.jpg";
          imgSrc = "https://openweathermap.org/img/wn/01n@2x.png";
        } else if (weatherId > 800) {
          weatherImg = "Clouds.jpg";
          imgSrc = "https://openweathermap.org/img/wn/04n@2x.png";
        }

        daily.innerHTML += `

            
            <div class="col">
        <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style="background-image: url('Images/${weatherImg}'); background-size:cover;background-repeat:no-repeat">
          <div class="d-flex flex-column h-100 pb-3 text-white text-shadow-1 pt-3 px-4">
          <h6 class="lh-1 py-2 fw-bold">${time.slice(0, dateTime.length - 3)}0</h6>
          <p class="lead fw-bold">${weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)}</p>
          <p class="lead fw-bold">Max temperature: ${maxTemp} &#778; C <br>Min temperature: ${minTemp} &#778; C</p>
          <p class="lead">Humidity: ${humidity}%</p>
          </div>
        </div>
      </div>


                `;

      }
    } else {
      console.log("Some error occured");
    }
  };

  xhr3.send();
}

searchBtn.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`,
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
        imgSrc = "https://openweathermap.org/img/wn/11n@2x.png";
      } else if (weatherid >= 300 && weatherid < 400) {
        weatherImg = "Drizzle.jpg";
        imgSrc = "https://openweathermap.org/img/wn/09n@2x.png";
      } else if (weatherid >= 500 && weatherid < 600) {
        weatherImg = "Rain.jpg";
        imgSrc = "https://openweathermap.org/img/wn/10n@2x.png";
      } else if (weatherid >= 600 && weatherid < 700) {
        weatherImg = "Snow.jpg";
        imgSrc = "https://openweathermap.org/img/wn/13n@2x.png";
      } else if (weatherid >= 700 && weatherid < 800) {
        weatherImg = "Haze.jpg";
        imgSrc = "https://openweathermap.org/img/wn/50n@2x.png";
      } else if (weatherid == 800) {
        weatherImg = "Clear.jpg";
        imgSrc = "https://openweathermap.org/img/wn/01n@2x.png";
      } else if (weatherid > 800) {
        weatherImg = "Clouds.jpg";
        imgSrc = "https://openweathermap.org/img/wn/04n@2x.png";
      }
      document.getElementById("hourly-heading").style.display="none";
      document.getElementById("daily-heading").style.display="none";
      hourly.innerHTML="";
      daily.innerHTML="";
      backHome.style.display="block";
      row.innerHTML = `
            <div class="col-md-6 px-4 text-light weather-container" style="background:linear-gradient(to bottom, rgba(245, 246, 252, 0.0), #212529),url('Images/${weatherImg}'); background-size:cover; background-repeat:no-repeat">
            <div class="row">
                <div class="col-md-7 col-6 weather-row">
                    <p class="lead pt-3 fw-bold">Location: ${city}</p>
                    <p class="lead fw-bold">
                    ${desc.charAt(0).toUpperCase() + desc.slice(1)}</b>
                </p>
                    <h2 class="display-1 fw-bold" id=""> ${temp}&nbsp; &#778; C</h2>
                    <p class="lead">Feels like: ${feelsLike} &#778; C </p>
                     
                </div>
                <div class="col-md-5 col-6 d-flex align-items-center">
                <img src="${imgSrc}" width="150">
                </div>
            </div>
        </div>
            <div class="col-md-6 bg-dark text-white p-4">
                <h2>More details</h2>
                <p class="lead">Wind Speed: ${wind_speed} m/s <br>Humidity: ${humdity}%</p>
            </div>
    </div>`;
    } else {
      console.log("Some error occured");
    }
  };

  xhr.send();



});


function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + hour + ':' + min + ':' + sec;
  return time;
}


