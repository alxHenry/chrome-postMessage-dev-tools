const headerRowId = "header-row";
const isDarkTheme = chrome.devtools.panels.themeName === "dark";
const themeClassName = isDarkTheme ? "dark" : "default";

const setHeaderRowColor = () => {
  const headerRow = document.querySelector('#header-row');
  headerRow.className = themeClassName;
}

const addTableRow = (origin, data) => {
  try {
    setHeaderRowColor();

    const tableBody = document.querySelector('#post-message-table-body');
    const row = document.createElement('tr');
    row.className = themeClassName;

    const originCell = document.createElement('td');
    const dataCell = document.createElement('td');

    originCell.innerText = origin;
    dataCell.innerText = JSON.stringify(data);

    row.appendChild(originCell);
    row.appendChild(dataCell);
    tableBody.appendChild(row);
  } catch (err) {
    console.error(err);
  }
};

// Init
const backgroundPageConnection = chrome.runtime.connect({ name: "devToolsPanel" });

backgroundPageConnection.onMessage.addListener((message) => {
  addTableRow(message.origin, message.data);
});

backgroundPageConnection.postMessage({
  type: "init",
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: "postMessageDevToolsContentScript.js",
});