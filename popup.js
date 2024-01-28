document.addEventListener('DOMContentLoaded', function() {
    getLocation();

    // location change
    const locationDropdown = document.getElementById('location');
    locationDropdown.addEventListener('change', onLocationChange);

    // translation button
    const translateButton = document.getElementById('translate-button');
    translateButton.addEventListener('click', translateContent);
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

// tracks the current language
let currentLanguage = 'en';

document.addEventListener('DOMContentLoaded', function() {
  getLocation();

  // location change
  const locationDropdown = document.getElementById('location');
  locationDropdown.addEventListener('change', onLocationChange);

  // translation button
  const translateButton = document.getElementById('translate-button');
  translateButton.addEventListener('click', toggleTranslation);
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


// sends a msg to content.js when the translation button is clicked
function toggleTranslation() {

  // Toggle between 'en' (English) and 'fr' (French) translations
  currentLanguage = currentLanguage === 'en' ? 'fr' : 'en';

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleTranslation', language: currentLanguage });
  });
}

// translates the content inside the popup
function translateContent() {
  // Update the content of specific elements with the translated text
  const temperatureElement = document.getElementById('temperature');
  const descriptionElement = document.getElementById('description');
  const specialtyElement = document.getElementById('agricultural-specialty');

  const selectLocationLabel = document.getElementById('select-location-label');
  const weatherInfoHeading = document.getElementById('weather-info-heading');
  const translateButton = document.getElementById('translate-button');

  // translates each element individually
  translateElementContent(temperatureElement);
  translateElementContent(descriptionElement);
  translateElementContent(specialtyElement);

  translateElementContent(selectLocationLabel);
  translateElementContent(weatherInfoHeading);
  translateElementContent(translateButton);
  
}

function translateElementContent(element) {
    if (element) {
      const textToTranslate = element.textContent;
  
      const apiKey = 'AIzaSyD-7ejUvyVOGTqQ-DFOLUQ1et1qIgo2wKM';
  
      // defines the target language based on the current language variable
      const targetLanguage = currentLanguage === 'en' ? 'fr' : 'en';
  
      // POST request to the Google Cloud Translation API
      fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: [textToTranslate],
          target: targetLanguage,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Translation API Response:', data);
  
          // checks if the translation was successful
          if (data.data && data.data.translations && data.data.translations[0]) {
            const translatedText = data.data.translations[0].translatedText;
  
            // uses DOMParser to decode HTML entities
            const parser = new DOMParser();
            const decodedText = parser.parseFromString(`<!doctype html><body>${translatedText}`, 'text/html').body.textContent;
  
            // sets the decoded text to the element
            element.textContent = decodedText;
          } else {
            console.error('Invalid response from translation API:', data);
          }
        })
        .catch(error => console.error('Error translating content:', error));
    }
  }
  
  
  