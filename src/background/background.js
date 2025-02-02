chrome.runtime.onInstalled.addListener(() => {
    console.log("AdFriend Extension Installed");
  
    // Set default settings
    chrome.storage.local.set({
      enabled: true,
      messageIndex: 0
    });
  });
  
  // Listen for changes in storage
  chrome.storage.onChanged.addListener((changes) => {
    console.log("Settings Updated:", changes);
  });
  