

  
  // Load categories from storage or use default
  export function  loadCategories() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get('adWidgetContents', (data) => {
        if (data.adWidgetContents) {
          resolve(data.adWidgetContents);
        } else {
          reject('AdFriend: No message categories found in storage.');
        }
      });
    });
  }
  
  // Save categories to storage
  export function  saveCategories(categories) {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ adWidgetContents: categories }, resolve);
    });
  }

  // Create a new category
    export function  createCategory(categoryKey, content) {
        return loadCategories().then((categories) => {
        const lowerCaseCategoryKey = categoryKey.toLowerCase();
        const existingCategoryKeys = Object.keys(categories).map(key => key.toLowerCase());
    
        if (!existingCategoryKeys.includes(lowerCaseCategoryKey)) {
            categories[categoryKey] = {
            title: content.title,
            type: content.type,
            enabled: true,
            messages: content.messages
            };
            return saveCategories(categories);
        } else {
          // If category key already exists, append a timestamp to the key to make it unique
          categories[categoryKey + Date.now().toString()] = {
            title: content.title,
            type: content.type,
            enabled: true,
            messages: content.messages
            };
            return saveCategories(categories);
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
export function getRandomMessages(numOfMsgs = 1) {

  console.log("AdFriend: getRandomMessages request received " + numOfMsgs);
  return loadCategories().then((categories) => {
    let validCatKeys = [];
    for(const categoryKey in categories){
      // filter for enabled categories
      if(categories[categoryKey].enabled == true && categories[categoryKey].messages.length > 0){
        validCatKeys.push(categoryKey);
      }
    }

    if (validCatKeys.length < 1) {
      console.log("AdFriend: No enabled categories with messages found.");
      //return placeholder messages
      return Array.from({ length: numOfMsgs }, (_, i) => ({
        title: "AdFriend",
        content: "No messages found. Please enable a category with messages in the 'Widget Content' section of the AdFriend plugin popup page."
      }));
    }

    const messages = [];

    for (let i = 0; i < numOfMsgs; i++) {
      const randomCategoryKey = validCatKeys[Math.floor(Math.random() * validCatKeys.length)];
      const randomCategory = categories[randomCategoryKey];
      let randomMessage = {};
      
      randomMessage = randomCategory.messages[Math.floor(Math.random() * randomCategory.messages.length)];
      messages.push({
        key: randomCategoryKey, //for quiz, we use this key to get quiz messages from local storage in content script
        isQuiz: randomCategory.isQuiz,
        shouldCardFlip: randomCategory.shouldCardFlip || false,
        cardFlipText: randomCategory.cardFlipText || "",
        title: randomCategory.title,
        content: randomMessage
      });
    }

    return messages;
  });
}




  



  