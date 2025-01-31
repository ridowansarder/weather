const cityInput = document.querySelector(".cityInput");
const button = document.querySelector(".submit");
const condition = document.querySelector(".condition");
const temp = document.querySelector(".temp");
const cityName = document.querySelector(".city");
const apiKey = "3f76dc17ef8241bf8701f1111e7bab6a";
const humidity = document.querySelector(".humid");
const windSpeed = document.querySelector(".windSpeed");
const weather = document.querySelector(".weather")

cityInput.addEventListener("input", () => {
  if (cityInput.value.trim() === ""){
    weather.style.display = "none";
    document.getElementById("cityNotFound").textContent = "";
  }
})

button.addEventListener("click", async (e) => {
  e.preventDefault();
  const city = cityInput.value;

  try {
    const res = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if(!res.ok){
      document.getElementById("cityNotFound").textContent = "City not found!";
      weather.style.display = "none";

      
    }
    const data = await res.json(); 
    console.log(data);
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    humidity.textContent = `${data.main.humidity}% \n Humidity`;
    windSpeed.textContent = `${Math.round((data.wind.speed) * 3.6)} km/h \n Wind Speed`;

    if(data.weather[0].main == "Mist"){
      condition.src = "./images/mist.png";
    } else if(data.weather[0].main == "Clear"){
      condition.src = "./images/clear.png";
    } else if(data.weather[0].main == "Clouds"){
      condition.src = "./images/clouds.png";
    } else if(data.weather[0].main == "Drizzle"){
      condition.src = "./images/drizzle.png";
    } else if(data.weather[0].main == "Rain"){
      condition.src = "./images/rain.png";
    } else if(data.weather[0].main == "snow"){
      condition.src = "./images/snow.png";
    }

    weather.style.display = "flex";
    document.getElementById("cityNotFound").textContent = "";

    
  } catch (error) {
    console.error(error)
  }
});
