chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'showWarning') {
        // warning?
    }
  });