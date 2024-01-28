document.addEventListener("DOMContentLoaded", function () {
    const pageContent = document.body.textContent || document.body.innerText;
    const cleanedText = pageContent.replace(/<[^>]*>/g, '');
    const apiKey = '42db2dac5d79a345d0e18b44ffc18790b9dac1af';
  
    // Requests API
    fetch(`https://language.googleapis.com/v1/documents:analyzeEntities?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          content: cleanedText,
          type: 'PLAIN_TEXT',
        },
        encodingType: 'UTF8',
      }),
    })
      .then(response => response.json())
      .then(data => {

        // Processes API response
        const hasTriggerWarnings = analyzeGoogleCloudResponse(data);
  
        if (hasTriggerWarnings) {
          chrome.runtime.sendMessage({ action: 'showWarning' });
        }
      })
      .catch(error => console.error('Error:', error));
  });
  