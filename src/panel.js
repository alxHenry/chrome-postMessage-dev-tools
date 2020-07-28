// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({ name: "panel" });

debugger;
backgroundPageConnection.onMessage.addListener(function (message) {
  debugger;
});

backgroundPageConnection.postMessage({
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: "contentScript.js"
});