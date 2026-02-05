const ipCache_Lx92 = {};

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.storage.local.set({
      settings_Lx92: {
        isActive: true,
        bgColor: "#1e1e2e",
        textColor: "#ffffff",
        fontSize: 13,
        cornerStyle: "oval",
        language: "en"
      }
    });
  }
});

chrome.webRequest.onResponseStarted.addListener(
  (details) => {
    if (details.tabId === -1 || details.type !== 'main_frame') return;
    
    const ip = details.ip || 'Unknown';
    ipCache_Lx92[details.tabId] = ip;
    
    chrome.tabs.sendMessage(details.tabId, {
      type: 'IP_UPDATE_Lx92',
      ip: ip
    }).catch(() => {});
  },
  { urls: ["<all_urls>"] }
);

chrome.tabs.onRemoved.addListener((tabId) => {
  delete ipCache_Lx92[tabId];
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_IP_Lx92' && sender.tab) {
    const ip = ipCache_Lx92[sender.tab.id];
    if (ip) {
      sendResponse({ ip: ip });
    }
  }
});