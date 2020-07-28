const backgroundPageConnection = chrome.runtime.connect({ name: "devToolsPanel" });
const isDarkTheme = chrome.devtools.panels.themeName === "dark";

const addTableRow = (origin, data) => {
  const themeClassName = isDarkTheme ? "dark" : "default";

  try {
    const tableBody = document.querySelector('#post-message-table-body');
    const headerRow = document.querySelector('#header-row');
    headerRow.className = themeClassName;

    const row = document.createElement('tr');
    const originCell = document.createElement('td');
    const dataCell = document.createElement('td');

    row.className = themeClassName;
    originCell.innerText = origin;
    dataCell.innerText = JSON.stringify(data);

    row.appendChild(originCell);
    row.appendChild(dataCell);
    tableBody.appendChild(row);
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