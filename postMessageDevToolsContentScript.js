window.addEventListener('message', (event) => {
  let isValidChromeRuntime = () => {
    try {
      return chrome.runtime && !!chrome.runtime.getManifest();
    } catch (_err) {
      console.log('Post Message Dev Tools Extension: Failed to execute runtime');
      return false;
    }
  }

  if (isValidChromeRuntime()) {
    chrome.runtime.sendMessage({
      origin: event.origin,
      data: event.data,
    });
  }
});
