const apiKey = "57cf281123104ec87c3895a456a2cd19";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather .icon");

// Function to fetch and display weather
async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.status == 404) {
            alert("City not found");
            return;
        }
        const data = await response.json();

        // Update the DOM with the fetched data
        const temperature = Math.round(data.main.temp);
        const weatherCondition = data.weather[0].main.toLowerCase(); // Get main weather condition
        
        // Update elements in the DOM with data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = temperature + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";

        // Log for debugging
        console.log("Weather Condition:", weatherCondition);
        console.log("Temperature:", temperature);

        // Check the weather condition and update the icon accordingly
        if (weatherCondition === "clouds") {
            weatherIcon.src = "images/clouds.png"; // Cloudy icon
        } else if (weatherCondition === "clear") {
            if (temperature < 0) {
                weatherIcon.src = "images/snow.png"; // Cold but sunny
            } else {
                weatherIcon.src = "images/clear.png"; // Warm and sunny
            }
        } else if (weatherCondition === "rain") {
            weatherIcon.src = "images/rain.png"; // Rainy icon
        } else if (weatherCondition === "drizzle") {
            weatherIcon.src = "images/drizzle.png"; // Drizzle icon
        } else if (weatherCondition === "mist") {
            weatherIcon.src = "images/mist.png"; // Misty icon
        } else if (weatherCondition === "snow") {
            weatherIcon.src = "images/snow.png"; // Snow icon
        } else {
            weatherIcon.src = "images/default.png"; // Fallback image for unknown conditions
        }

        // Make sure the weather section is visible once data is loaded
        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Something went wrong, please try again.");
    }
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim(); // Get input value
    if (city) {
        checkWeather(city); // Call the function when search button is clicked
    } else {
        alert("Please enter a city name.");
    }
});

// Enable search by pressing Enter key
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city); // Call the function when Enter is pressed
        } else {
            alert("Please enter a city name.");
        }
    }
});
