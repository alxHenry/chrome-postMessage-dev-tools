const onMessage = (event) => {
  console.log('Message received!', event);
  chrome.runtime.sendMessage(event);
};
window.addEventListener('message', onMessage);

console.log('Conent script injected!');
