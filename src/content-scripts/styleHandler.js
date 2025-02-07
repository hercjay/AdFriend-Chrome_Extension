

function  applyAdWidgetStyles(passedStyles) {
  console.log("AdFriend: Applying styles function called");
  chrome.storage.sync.get('selectedAdWidgetStyle', async (data) => {
    const styleKey = data.selectedAdWidgetStyle || 'dark';
    let styles = passedStyles;
    if (!styles) {
      styles = await getStyles();
    }
    const selectedStyle = styles[styleKey];
    if (selectedStyle) {
      document.documentElement.style.setProperty('--adfriend-background', selectedStyle.background);
      document.documentElement.style.setProperty('--adfriend-padding', selectedStyle.padding);
      document.documentElement.style.setProperty('--adfriend-border-radius', selectedStyle.borderRadius);
      document.documentElement.style.setProperty('--adfriend-text-align', selectedStyle.textAlign);
      document.documentElement.style.setProperty('--adfriend-font-size', selectedStyle.fontSize);
      document.documentElement.style.setProperty('--adfriend-color', selectedStyle.color);
      document.documentElement.style.setProperty('--adfriend-title-text-color', selectedStyle.titleTextColor);
      document.documentElement.style.setProperty('--logo-size', selectedStyle.logoSize);
      document.documentElement.style.setProperty('--show-logo', selectedStyle.showLogo);
    }
  });
}

function  loadStyles() {
  chrome.storage.sync.get('adWidgetStyles', (data) => {
    if (data.adWidgetStyles) {
      applyAdWidgetStyles(data.adWidgetStyles);
    } else {
      console.log("AdFriend: No styles found in storage, sticking to default.");
    }
  });
}

function  getStyles() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('adWidgetStyles', (data) => {
      if (data.adWidgetStyles) {
        resolve(data.adWidgetStyles);
      } else {
        reject('No styles found in storage');
      }
    });
  });
}

function  saveStyles(styles) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ adWidgetStyles: styles }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.log("AdFriend: Styles saved to storage", styles);
        resolve();
      }
    });
  });
}

function  addNewStyle(styleKey, style) {
  getStyles().then((styles) => {
    styles[styleKey] = style;
    saveStyles(styles);
  }).catch((error) => {
    console.error("AdFriend: Error adding new style", error);
  });
}

function  getSelectedAdWidgetStyleFromStorage() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('selectedAdWidgetStyle', (data) => {
      if (data.selectedAdWidgetStyle) {
        resolve(data.selectedAdWidgetStyle);
      } else {
        reject('No selected style found in storage');
      }
    });
  });
}

//listen for changes in the selected style and apply it
chrome.storage.onChanged.addListener((changes) => {
  if(changes.selectedAdWidgetStyle){
    console.log("AdFriend: Selected style changed - from styleHandler js", changes.selectedAdWidgetStyle.newValue);
    loadStyles();
  }
});

//apply the current selected style
loadStyles();

