

//STYLE DEFINITIONS FOR POP UP
const styles = {
  light: {
    bgGradient: 'linear-gradient(95deg, #cfe1fd, #f2ffff)',
    textColor: 'black',
    glassBg: 'rgba(255, 255, 255, 0.2)',
    glassBorder: 'rgba(150, 150, 150, 0.9)'
  },
  dark: {
    bgGradient: 'linear-gradient(95deg, #050f1f, #0d292b)',
    textColor: 'white',
    glassBg: 'rgba(200, 200, 200, 0.1)',
    glassBorder: 'rgba(150, 150, 150, 0.5)'
  }
}

//Styles for Ad Widget Replacement
const defaultStyles = {
  light: {
    styleTitle: 'Light Style (Default)',
    background: 'black',
    padding: '15px',
    borderRadius: '5px',
    textAlign: 'center',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    titleTextColor: 'white',
    logoSize: '22px',
    showLogo: 'visible'
  },
  dark: {
    styleTitle: 'Dark Style (Default)',
    background: 'white',
    padding: '15px',
    borderRadius: '5px',
    textAlign: 'center',
    fontSize: '14px',
    color: 'rgba(5, 5, 5, 0.8)',
    titleTextColor: 'black',
    logoSize: '22px',
    showLogo: 'visible'
  }
};



document.addEventListener("DOMContentLoaded", function () {
    const toggleExtension = document.getElementById("toggleExtension");
    const popUpThemeSwitch = document.getElementById("popUpThemeSwitch");

    const adfriendIcon = document.getElementById('adfriend-icon');
    adfriendIcon.src = chrome.runtime.getURL('assets/icon-128.png');


    const setPopUpThemeStyles = (isDarkMode) => {
      const theme = isDarkMode ? styles.dark : styles.light;
      document.documentElement.style.setProperty('--bg-gradient', theme.bgGradient);
      document.documentElement.style.setProperty('--text-color', theme.textColor);
      document.documentElement.style.setProperty('--glass-bg', theme.glassBg);
      document.documentElement.style.setProperty('--glass-border', theme.glassBorder);
    };

    // Load saved settings
    chrome.storage.sync.get("enabled", (data) => {
      toggleExtension.checked = data.enabled ?? true;
    });

    chrome.storage.sync.get("isPopUpDarkMode", (data) => {
      popUpThemeSwitch.checked = data.isPopUpDarkMode ?? false;
      setPopUpThemeStyles(data.isPopUpDarkMode);
    });
  
    // Update settings when toggled
    toggleExtension.addEventListener("change", () => {
      chrome.storage.sync.set({ enabled: toggleExtension.checked });
    });

    popUpThemeSwitch.addEventListener("change", () => {
      chrome.storage.sync.set({ isPopUpDarkMode: popUpThemeSwitch.checked });
      setPopUpThemeStyles(popUpThemeSwitch.checked);
    });
  });



// populate the widget themes with the saved settings
const adWidgetStyleSelect = document.getElementById('adWidgetStyleSelect');
populateWidgetThemes();

function populateWidgetThemes() {
  console.log("AdFriend: Populating widget themes");
  getStyles().then((styles) => {
    adWidgetStyleSelect.innerHTML = '';
    if(!styles) {
      styles = defaultStyles;
    }
    for (const styleKey in styles) {
      const style = styles[styleKey];
      const option = document.createElement('option');
      option.value = styleKey;
      option.text = style.styleTitle;
      adWidgetStyleSelect.add(option);
    }
    //set the selected style
    getSelectedAdWidgetStyleFromStorage().then((selectedStyle) => {
      adWidgetStyleSelect.value = selectedStyle;
    }).catch((error) => {
      console.error("AdFriend: Error getting selected style", error);
    });
  }).catch((error) => {
    console.error("AdFriend: Error populating widget themes", error);
  });
}

//listen for changes in the selected style, save and send a message to 
//content script to update the css styling of the ad widgets on the page
adWidgetStyleSelect.addEventListener('change', (event) => {
  console.log("AdFriend: Selected style changed", event.target.value);
  const selectedStyle = event.target.value;
  chrome.storage.sync.set({ selectedAdWidgetStyle: selectedStyle });
});


function getStyles() {
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

function getSelectedAdWidgetStyleFromStorage() {
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

function addNewStyle(styleKey, style) {
  getStyles().then((styles) => {
    styles[styleKey] = style;
    saveStyles(styles);
  }).catch((error) => {
    console.error("AdFriend: Error adding new style", error);
  });
}







  