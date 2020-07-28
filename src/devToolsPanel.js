const backgroundPageConnection = chrome.runtime.connect({ name: "devToolsPanel" });

backgroundPageConnection.onMessage.addListener((message) => {
  debugger;
  console.log('Message!', message);
});

backgroundPageConnection.postMessage({
  type: "init",
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: "contentScript.js",
});