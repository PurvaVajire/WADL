function fetchWeather() {
    let city = document.getElementById("cityInput").value.trim();
    
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    // AJAX Request to fetch local weather data
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "weather.json", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);

            if (data[city]) {
                let weatherData = data[city];

                document.getElementById("weatherResult").innerHTML = `
                    <div class="card p-3 bg-light">
                        <h3>${city}</h3>
                        <p><strong>Temperature:</strong> ${weatherData.temperature}°C</p>
                        <p><strong>Humidity:</strong> ${weatherData.humidity}%</p>
                        <p><strong>Condition:</strong> ${weatherData.condition}</p>
                    </div>
                `;
            } else {
                document.getElementById("weatherResult").innerHTML = `
                    <div class="alert alert-danger">City not found in local database!</div>
                `;
            }
        }
    };
    xhr.send();
}
