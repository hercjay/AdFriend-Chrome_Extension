

console.log("AdFriend Content Script Loaded");

function replaceAds() {

    // Get the patterns from global adSelector variable defined in manifest.json and adSelector.js
  const adElements = document.querySelectorAll(window.AdFriend_adSelector);
  console.log("AdFriend: number of ads on this page is " + adElements.length);
  //use runtime to send a message to be received by another script that will return random messages
    chrome.runtime.sendMessage({ action: "getRandomMessages", index: index }, (response) => {
        let messages = response;
    });

    try {
        adElements.forEach((ad, index) => {
            let widget = document.createElement("div");
            widget.className = "AdFriend-widget";
            widget.innerHTML = `
                <div class="AdFriend-message">
                    <h3>🌟 ${messages.title}</h3>
                    <p>${messages.content}</p>
                </div>
            `;

            console.log("AdFriend: Replacing this ad " + ad.outerHTML + " with this widget " + widget.outerHTML);

            ad.replaceWith(widget);
        });
    } catch (error) {
        console.error("AdFriend: Error replacing ads", error);
    }
}


function getPluginEnabledValue() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('enabled', (data) => {
      if (data.enabled !== undefined) {
        resolve(data.enabled);
      } else {
        resolve(true); // default to true if no value is found
      }
    });
  });
}

function listenForPluginEnabledChanges() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (changes.enabled) {
        console.log("AdFriend: Plugin enabled status has changed", changes.enabled.newValue);
            //reload page to show/hide ads based on new value
            location.reload();
        }
    });
}

// Run the function when the page loads, if this plugin is enabled in the popup
getPluginEnabledValue().then((enabled) => {
    console.log("AdFriend: Plugin enabled status is", enabled);
  if (enabled === true) {
    document.addEventListener('DOMContentLoaded', replaceAds);
  } 
});

listenForPluginEnabledChanges();

