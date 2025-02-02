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
            if (!categories[categoryKey]) {
            categories[categoryKey] = {
                title: categoryTitle,
                messages: []
            };
            return saveCategories(categories);
            } else {
            return Promise.reject(`Category ${categoryKey} already exists.`);
            }
        });
    }
  
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
  
  