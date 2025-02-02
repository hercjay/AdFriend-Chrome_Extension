

import { getRandomMessages, createCategory, addMessageToCategory } from './messageHandler.js';




chrome.runtime.onInstalled.addListener(() => {
    console.log("AdFriend Extension Installed");
  
    // Set default settings
    chrome.storage.local.set({
      enabled: true,
      messageIndex: 0
    });

    chrome.storage.sync.set({
      enabled: true,
      messageIndex: 0
    });
  });
  
  // Listen for changes in storage
  chrome.storage.onChanged.addListener((changes) => {
    console.log("Settings Updated:", changes);
  });







// Listen for messages and respond
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("AdFriend: Message received from background js file", request);
  switch (request.action) {
    case 'getRandomMessages':
      console.log("AdFriend: getRandomMessages request received " + request.numOfMsgs);
      getRandomMessages(request.numOfMsgs).then((messages) => {
        sendResponse({ messages });
      }).catch((error) => {
        sendResponse({ error });
      });
      return true; // Will respond asynchronously
    case 'createCategory':
      createCategory(request.categoryKey, request.categoryTitle).then((value) => {
        sendResponse({ value });
      }).catch((error) => {
        sendResponse({ error });
      });
      return true; // Will respond asynchronously
    case 'addMessageToCategory':
      addMessageToCategory(request.categoryKey, request.message).then((value) => {
        sendResponse({ value });
      }).catch((error) => {
        sendResponse({ error });
      });
      return true; // Will respond asynchronously
    default:
      sendResponse({ error: 'Unknown action' });
      return false;
  }
});
  