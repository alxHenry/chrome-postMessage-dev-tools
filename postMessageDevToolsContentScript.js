let isValidChromeRuntime = () => {
  try {
    return chrome.runtime && !!chrome.runtime.getManifest();
  } catch (_err) {
    console.log('Post Message Dev Tools Extension: Failed to execute runtime');
    return false;
  }
}

let postMessageDevTools_onWindowPostMessageHandler = (event) => {
  if (isValidChromeRuntime()) {
    chrome.runtime.sendMessage({
      origin: event.origin,
      data: event.data,
    });
  }
};

let main = () => {
  window.addEventListener('message', postMessageDevTools_onWindowPostMessageHandler);
}

main();
