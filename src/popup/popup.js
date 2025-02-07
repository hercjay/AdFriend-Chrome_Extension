

//STYLE DEFINITIONS FOR POP UP
const popUpThemeStyles = {
  light: {
    bgGradient: 'linear-gradient(95deg, #cfe1fd, #f2ffff)',
    textColor: 'black',
    glassBg: 'rgba(255, 255, 255, 0.2)',
    inputTextColor: 'black',
    glassBorder: 'rgba(150, 150, 150, 0.9)'
  },
  dark: {
    bgGradient: 'linear-gradient(95deg, #050f1f, #0d292b)',
    textColor: 'white',
    glassBg: 'rgba(200, 200, 200, 0.1)',
    inputTextColor: 'rgba(200, 200, 200, 0.9)',
    glassBorder: 'rgba(150, 150, 150, 0.5)'
  }
}




document.addEventListener("DOMContentLoaded", function () {
    const toggleExtension = document.getElementById("toggleExtension");
    const popUpThemeSwitch = document.getElementById("popUpThemeSwitch");

    const adfriendIcon = document.getElementById('adfriend-icon');
    adfriendIcon.src = chrome.runtime.getURL('assets/icon-128.png');

    let styles = {};


    const adWidgetStyleSelect = document.getElementById('adWidgetStyleSelect');
    const adWidgetPreview = document.getElementById('adWidgetPreview');
    const customStyleForm = document.getElementById('custom-style-form');
    const styleTitleInput = document.getElementById('style-title');
    const backgroundColorInput = document.getElementById('background-color');
    const titleTextColorInput = document.getElementById('title-text-color');
    const contentTextColorInput = document.getElementById('text-color');
    const paddingInput = document.getElementById('padding');
    const borderRadiusInput = document.getElementById('border-radius');
    const fontSizeInput = document.getElementById('font-size');
    const textAlignInput = document.getElementById('text-align');
    const saveStyleBtn = document.getElementById('save-style-btn');




    const setPopUpThemeStyles = (isDarkMode) => {
      const theme = isDarkMode ? popUpThemeStyles.dark : popUpThemeStyles.light;
      document.documentElement.style.setProperty('--bg-gradient', theme.bgGradient);
      document.documentElement.style.setProperty('--text-color', theme.textColor);
      document.documentElement.style.setProperty('--glass-bg', theme.glassBg);
      document.documentElement.style.setProperty('--glass-border', theme.glassBorder);
      document.documentElement.style.setProperty('--input-text-color', theme.inputTextColor);
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


    // Populate widget themes only once when the popup is initially loaded,, using the saved settings
    if (adWidgetStyleSelect.options.length === 0) {
      populateWidgetThemes();
    }

    function populateWidgetThemes() {
      console.log("AdFriend: Populating widget themes");
      getStyles().then((fetchedStyles) => {
        styles = fetchedStyles;
        adWidgetStyleSelect.innerHTML = '';
        if(!styles) {
          console.log("AdFriend: No styles found in storage");
          return;
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
          //update the preview with the selected style
          updateAdWidgetPreview(styles[selectedStyle]);
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
      console.log("AdFriend: Selected style changed - from popup js", event.target.value);
      const selectedStyle = event.target.value;
      updateAdWidgetPreview(styles[selectedStyle]);
      chrome.storage.sync.set({ selectedAdWidgetStyle: selectedStyle });
    });


    function updateAdWidgetPreview(style) {
      if (style) {
        adWidgetPreview.style.background = style.background;
        adWidgetPreview.style.padding = style.padding;
        adWidgetPreview.style.borderRadius = style.borderRadius;
        adWidgetPreview.style.textAlign = style.textAlign;
        adWidgetPreview.style.fontSize = style.fontSize;
        adWidgetPreview.style.color = style.color;
        adWidgetPreview.querySelector('.title').style.color = style.titleTextColor;
        adWidgetPreview.querySelector('.msg-p').style.color = style.color;
        // adWidgetPreview.querySelector('.msg-p').style.opacity = '0.8';
      }
    }


    // Listen for changes in custom style inputs
    customStyleForm.addEventListener('input', updateCustomPreview);

    function updateCustomPreview() {
      const customStyle = {
        background: backgroundColorInput.value,
        titleTextColor: titleTextColorInput.value,
        color: contentTextColorInput.value,
        padding: paddingInput.value,
        borderRadius: borderRadiusInput.value,
        fontSize: fontSizeInput.value,
        textAlign: textAlignInput.value
      };
      updateAdWidgetPreview(customStyle);
    }


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


  }); // document loaded











  