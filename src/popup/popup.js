document.addEventListener("DOMContentLoaded", function () {
    const toggleExtension = document.getElementById("toggleExtension");
  
    // Load saved settings
    chrome.storage.local.get("enabled", (data) => {
      toggleExtension.checked = data.enabled;
    });
  
    // Update settings when toggled
    toggleExtension.addEventListener("change", () => {
      chrome.storage.local.set({ enabled: toggleExtension.checked });
    });
  });
  