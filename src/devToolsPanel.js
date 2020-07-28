const backgroundPageConnection = chrome.runtime.connect({ name: "devToolsPanel" });

const addTableRow = (origin, data) => {
  try {
    const table = document.querySelector('#post-message-table');

    const row = document.createElement('tr');
    const originCell = document.createElement('td');
    const dataCell = document.createElement('td');

    originCell.innerText = origin;
    dataCell.innerText = JSON.stringify(data);

    row.appendChild(originCell);
    row.appendChild(dataCell);
    table.appendChild(row);
  } catch (err) {
    console.log(err);
  }
};

backgroundPageConnection.onMessage.addListener((message) => {
  addTableRow(message.origin, message.data);
});

backgroundPageConnection.postMessage({
  type: "init",
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: "contentScript.js",
});