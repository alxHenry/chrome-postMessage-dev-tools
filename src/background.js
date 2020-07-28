const connections = {};

const contentScriptMessageRelayToDevTools = (message, sender) => {
  const fromContentScript = !!sender.tab;
  if (!fromContentScript) {
    return;
  }

  const tabId = sender.tab.id;
  if (tabId in connections) {
    connections[tabId].postMessage(message);
  } else {
    console.error("Tab not found in connection list.", tabId);
  }
}
chrome.runtime.onMessage.addListener(contentScriptMessageRelayToDevTools);

chrome.runtime.onConnect.addListener((devToolsConnection) => {
  const devToolsMessageListener = (message) => {
    if (message.type === "init") {
      chrome.tabs.executeScript(message.tabId, { file: message.scriptToInject });
      connections[message.tabId] = devToolsConnection;
    }
  }
  devToolsConnection.onMessage.addListener(devToolsMessageListener);

  const cleanupDevToolsMessageListener = (disconnectingConnection) => {
    devToolsConnection.onMessage.removeListener(devToolsMessageListener);

    const tabIds = Object.keys(connections);
    const connectionsLength = tabIds.length;
    for (let i = 0; i < connectionsLength; i++) {
      const tabId = tabIds[i];
      if (connections[tabId] === disconnectingConnection) {
        delete connections[tabId];
        return;
      }
    }
  }
  devToolsConnection.onDisconnect.addListener(cleanupDevToolsMessageListener);
});
