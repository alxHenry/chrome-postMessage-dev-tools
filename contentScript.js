const onMessage = (event) => {
  chrome.runtime.sendMessage({
    origin: event.origin,
    data: event.data,
  });
};
window.addEventListener('message', onMessage);

