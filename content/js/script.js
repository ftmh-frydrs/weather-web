const apiKey = "ef28bcaad68fa1480f257d224b552f4d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cities = [];

function showUp(){
    const cityUp = document.querySelector('.show');

    cityUp.innerHTML = "";


    const maxCitiesToShow = 1;

    let citiesDisplayed = 0;

    cities.forEach((city, index) => {
        if (citiesDisplayed < maxCitiesToShow) {
            const cityCard = createCityCard(city);
            cityUp.appendChild(cityCard);
            citiesDisplayed++;
        }
    });
    
}


function showCityCards() {
    const citiesContainer = document.querySelector(".cities-container");
    citiesContainer.innerHTML = "";


    const maxCitiesToShow = 3;

    let citiesDisplayed = 0;

    cities.forEach((city, index) => {
        if (citiesDisplayed < maxCitiesToShow) {
            const cityCard = createCityCard(city);
            citiesContainer.appendChild(cityCard);
            citiesDisplayed++;
        }
    });
}


function createCityCard(city) {
    const cityCard = document.createElement("div");
    cityCard.classList.add("city-card", "mb-4", "p-3", "rounded", "border", "border-gray-400" , "m-2" , "bg-blue-200" ,"w-[200px]" , "h-auto");

    const cityName = document.createElement("h3");
    cityName.innerHTML = city.name;
    cityName.classList.add('text-2xl' , "text-center");

    const cityTemperature = document.createElement("p");
    cityTemperature.innerHTML = city.temperature + "°C";
    cityTemperature.classList.add('text-xl' , 'mt-3' , 'text-center')

    const humidityDiv = document.createElement("div");
    humidityDiv.classList.add('flex' , 'items-center' , 'justify-center' , 'mt-3')

    const cityHumidity = document.createElement("p");
    cityHumidity.innerHTML = city.humidity + "%";

    const humidityImg = document.createElement("img");
    humidityImg.src=`./content/img/humidity.png`
    humidityImg.classList.add('w-[30px]' , 'h-[30px]' , 'mx-3')

    const windDiv = document.createElement("div");
    windDiv.classList.add('flex' , 'items-center' , 'justify-center' , 'mt-3')

    const cityWindSpeed = document.createElement("p");
    cityWindSpeed.innerHTML =  city.windSpeed + " km/h";

    const windImg = document.createElement("img");
    windImg.src=`./content/img/wind.png`
    windImg.classList.add('w-[30px]' , 'h-[30px]' , 'mx-3')

    const cityImage = document.createElement("img");
    cityImage.classList.add("city-image");
    cityImage.src = city.weatherIcon;

    cityCard.appendChild(cityImage);
    cityCard.appendChild(cityName);
    cityCard.appendChild(cityTemperature);
    humidityDiv.appendChild(cityHumidity);
    humidityDiv.appendChild(humidityImg);
    cityCard.appendChild(humidityDiv);
    windDiv.appendChild(cityWindSpeed);
    windDiv.appendChild(windImg);
    cityCard.appendChild(windDiv);
    

    return cityCard;
}

async function getWeatherData(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".err").style.display = "block";
    } else {
        const data = await response.json();

        // اضافه کردن شهر به آرایه شهرها
        // ...
cities.unshift({
    name: data.name,
    temperature: Math.round(data.main.temp),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    weatherIcon: getWeatherIcon(data.weather[0].main),
});

// ذخیره اطلاعات در Local Storage
localStorage.setItem("cities", JSON.stringify(cities));

// نمایش کارت‌های شهرها
showCityCards();
showUp();
// ...

        document.querySelector(".err").style.display = "none";
        const citiesContainer = document.querySelector(".cities-container");
        citiesContainer.classList.add("flex" , "justify-center" , "items-center");
    }
}

// ...
// (بقیه توابع و رویدادهای دیگر در اینجا)
// ...

function getWeatherIcon(weatherCondition) {
    switch (weatherCondition) {
        case "Clear":
            return "./content/img/clear.png";
        case "Clouds":
            return "./content/img/clouds.png";
        case "Rain":
            return "./content/img/rain.png";
        case "Drizzle":
            return "./content/img/drizzle.png";
        case "Mist":
            return "./content/img/mist.png";
        default:
            return "./content/img/default.png";
    }
}

const searchEl = document.querySelector("input");
const btnEl = document.querySelector("button");

btnEl.addEventListener("click", () => {
    const cityName = searchEl.value.trim();
    searchEl.value=''

    if (cityName !== "") {
        getWeatherData(cityName);
    }
});



var searchButton = document.getElementById("searchButton");
var searchModal = document.getElementById("searchModal");
var closeModal = document.getElementById("closeModal");


// // Open the modal
// searchButton.onclick = function() {
//     searchModal.style.display = "flex";
// }

// // Close the modal when clicking on the close button (×)
// closeModal.onclick = function() {
//     searchModal.style.display = "none";
// }

// // Close the modal when clicking outside the modal content
// window.onclick = function(event) {
//     if (event.target == searchModal) {
//         searchModal.style.display = "none";
//     }
// }


document.addEventListener("DOMContentLoaded", () => {
    const storedCities = localStorage.getItem("cities");
    if (storedCities) {
        cities.push(...JSON.parse(storedCities));
        showCityCards();
        // showUp();
    }
});
