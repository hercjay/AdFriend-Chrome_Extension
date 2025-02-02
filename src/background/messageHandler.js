const defaultCategories = {
  motivationalQuotes: {
    enabled: true,
    title: "Stay Motivated!",
    messages: [
      "Believe in yourself and all that you are!",
      "The only limit to our realization of tomorrow is our doubts of today.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "Your potential is endless. Go do what you were created to do.",
      "Dream big and dare to fail.",
      "The harder you work for something, the greater you'll feel when you achieve it.",
      "Don't watch the clock; do what it does. Keep going.",
      "The future belongs to those who believe in the beauty of their dreams."
    ]
  },
  activityReminders: {
    enabled: true,
    title: "Stay Active!",
    messages: [
      "Take a short walk to refresh your mind.",
      "Remember to stretch and move around.",
      "Stay hydrated, drink a glass of water.",
      "Take a few deep breaths and relax.",
      "Stand up and do a quick stretch.",
      "Take a moment to look away from your screen and rest your eyes.",
      "Do a quick set of jumping jacks to get your blood flowing.",
      "Take a few minutes to meditate and clear your mind."
    ]
  }
};
  
  // Load categories from storage or use default
  export function  loadCategories() {
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
  export function  saveCategories(categories) {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ msgCategories: categories }, resolve);
    });
  }

  // Create a new category
    export function  createCategory(categoryKey, categoryTitle) {
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
    // export function  createCategory(categoryKey, categoryTitle) { 
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
  export function  addMessageToCategory(categoryKey, message) {
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
 export function  getRandomMessages (numOfMsgs = 1) {
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
  



  