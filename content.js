chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'translateContent') {
      translatePopupContent(sendResponse);
      return true;
  }
});

function translatePopupContent(sendResponse) {
  console.log('Translating content...');
  const apiKey = 'AIzaSyD-7ejUvyVOGTqQ-DFOLUQ1et1qIgo2wKM';

  // updates the content of specific elements with the translated text
  const temperatureElement = document.getElementById('temperature');
  const descriptionElement = document.getElementById('description');
  const specialtyElement = document.getElementById('agricultural-specialty');

  // translate each element individually
  translateElementContent(apiKey, temperatureElement);
  translateElementContent(apiKey, descriptionElement);
  translateElementContent(apiKey, specialtyElement);

  // informs the popup that content translation is complete
  if (sendResponse) {
    sendResponse({ action: 'contentTranslated', status: 'Translation complete' });
}
}

function translateElementContent(apiKey, element) {
  if (element) {
      const textToTranslate = element.innerText;

      // POST request to the Google Cloud Translation API
      fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              q: [textToTranslate],
              target: 'fr',  // French
          }),
      })
      .then(response => response.json())
      .then(data => {
          const translatedText = data.data.translations[0].translatedText;
          element.innerText = translatedText;
      })
      .catch(error => console.error('Error translating content:', error));
  }
}
