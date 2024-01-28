document.addEventListener('DOMContentLoaded', function() {
    getLocation();

    // location change
    const locationDropdown = document.getElementById('location');
    locationDropdown.addEventListener('change', onLocationChange);
});

function getLocation() {
    const locationDropdown = document.getElementById('location');
    const selectedOption = locationDropdown.options[locationDropdown.selectedIndex];
    const selectedLocation = selectedOption.value;
    const agriculturalSpecialty = selectedOption.getAttribute('data-specialty');
    const [latitude, longitude] = selectedLocation.split(',');

    showWeather({ coords: { latitude, longitude } });
    displayAgriculturalSpecialty(agriculturalSpecialty);
}

function onLocationChange() {
    getLocation();
}

function showWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const apiKey = '7f949bd834744ee8aa1d8aa79dddcb99';
    const apiUrl = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');

    const temperature = data.data[0].temp;
    const description = data.data[0].weather.description;

    temperatureElement.textContent = `Temperature: ${temperature} °C`;
    descriptionElement.textContent = `Description: ${description}`;
}

function displayAgriculturalSpecialty(agriculturalSpecialty) {
    const specialtyElement = document.getElementById('agricultural-specialty');
    specialtyElement.textContent = `Agricultural Specialty: ${agriculturalSpecialty}`;
}
