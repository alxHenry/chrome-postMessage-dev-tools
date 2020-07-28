let postMessageDevTools_onWindowPostMessageHandler = (event) => {
  chrome.runtime.sendMessage({
    origin: event.origin,
    data: event.data,
  });
};
window.addEventListener('message', postMessageDevTools_onWindowPostMessageHandler);

