function applyStyles(styles) {
    console.log("AdFriend: Applying styles", styles);
    document.documentElement.style.setProperty('--adfriend-background', styles.background);
    document.documentElement.style.setProperty('--adfriend-padding', styles.padding);
    document.documentElement.style.setProperty('--adfriend-border-radius', styles.borderRadius);
    document.documentElement.style.setProperty('--adfriend-text-align', styles.textAlign);
    document.documentElement.style.setProperty('--adfriend-font-size', styles.fontSize);
    document.documentElement.style.setProperty('--adfriend-color', styles.color);
  }
  
function loadStyles() {
    chrome.storage.sync.get('adWidgetStyle', (data) => {
        if (data.adWidgetStyle) {
            applyStyles(data.adWidgetStyle);
        } else {
            console.log("AdFriend: No styles found in storage, skipping applyStyles (use default).");
        }
    });
}
  
  function listenForStyleChanges() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (changes.adWidgetStyle) {
        console.log("AdFriend: Styles have changed", changes.adWidgetStyle.newValue);
        applyStyles(changes.adWidgetStyle.newValue);
      }
    });
  }
  
  // Load styles initially
  loadStyles();
  
  // Listen for changes in styles
  listenForStyleChanges();