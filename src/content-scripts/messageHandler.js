const defaultCategories = {
    motivationalQuotes: {
      enabled: true,
      title: "Stay Motivated!",
      messages: [
        "Keep pushing forward!",
        "You are capable of amazing things!",
        "Take a deep breath and keep going!",
        "Your hard work will pay off!"
      ]
    },
    activityReminders: {
      enabled: true,
      title: "Stay Active!",
      messages: [
        "Take a short walk to refresh your mind.",
        "Remember to stretch and move around.",
        "Stay hydrated, drink a glass of water.",
        "Take a few deep breaths and relax."
      ]
    }
  };
  
  // Load categories from storage or use default
  function loadCategories() {
    return new Promise((resolve) => {
      chrome.storage.sync.get('msgCategories', (data) => {
        if (data.msgCategories) {
          resolve(data.msgCategories);
        } else {
          saveCategories(defaultCategories);
          resolve(defaultCategories);
        }
      });
    });
  }
  
  // Save categories to storage
  function saveCategories(categories) {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ msgCategories: categories }, resolve);
    });
  }

  // Create a new category
    function createCategory(categoryKey, categoryTitle) {
        return loadCategories().then((categories) => {
        const lowerCaseCategoryKey = categoryKey.toLowerCase();
        const existingCategoryKeys = Object.keys(categories).map(key => key.toLowerCase());
    
        if (!existingCategoryKeys.includes(lowerCaseCategoryKey)) {
            categories[categoryKey] = {
            title: categoryTitle,
            enabled: true,
            messages: []
            };
            return saveCategories(categories);
        } else {
            return Promise.reject(`Category ${categoryKey} already exists.`);
        }
        });
    }
    // function createCategory(categoryKey, categoryTitle) { 
    //     return loadCategories().then((categories) => {
    //         if (!categories[categoryKey]) {
    //         categories[categoryKey] = {
    //             title: categoryTitle,
    //             messages: []
    //         };
    //         return saveCategories(categories);
    //         } else {
    //         return Promise.reject(`Category ${categoryKey} already exists.`);
    //         }
    //     });
    // }
  
  // Add a new message to a category
  function addMessageToCategory(categoryKey, message) {
    return loadCategories().then((categories) => {
      if (categories[categoryKey]) {
        categories[categoryKey].messages.push(message);
        return saveCategories(categories);
      } else {
        return Promise.reject(`Category ${categoryKey} does not exist.`);
      }
    });
  }


// Get random messages
window.getRandomMessage = function(numOfMsgs = 1) {
    return loadCategories().then((categories) => {
      const categoryKeys = Object.keys(categories);
      //filter for only enabled categories and categories with messages
      const enabledCategoryKeys = categoryKeys.filter((key) => (categories[key].enabled && categories[key].messages.length > 0));
      const messages = [];
  
      for (let i = 0; i < numOfMsgs; i++) {
        const randomCategoryKey = enabledCategoryKeys[Math.floor(Math.random() * enabledCategoryKeys.length)];
        const randomCategory = categories[randomCategoryKey];
        const randomMessage = randomCategory.messages[Math.floor(Math.random() * randomCategory.messages.length)];
        messages.push({
          title: randomCategory.title,
          content: randomMessage
        });
      }
  
      return messages;
    });
  };
  
  