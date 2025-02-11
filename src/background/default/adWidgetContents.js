

export const defaultAdWidgetContents = {
    motivationalQuotesDefault: {
      enabled: true,
      isQuiz: false,
      title: "Stay Motivated!",
      type: "Motivational Quotes",
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
    activityRemindersDefault: {
      enabled: true,
      isQuiz: false,
      title: "Stay Active!",
      type: "Activity Reminders",
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
    },
    funFactsDefault: {
        enabled: true,
        isQuiz: false,
        shouldCardFlip: true,
        cardFlipText: "Tap to reveal fun fact!",
        title: "Did You Know?",
        type: "Fun Facts",
        messages: [
          "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible.",
          "A day on Venus is longer than a year on Venus. It takes Venus longer to rotate once on its axis than to complete one orbit of the Sun.",
          "Bananas are berries, but strawberries aren't. Botanically, a berry is a fruit produced from the ovary of a single flower with seeds embedded in the flesh.",
          "Octopuses have three hearts. Two pump blood to the gills, while the third pumps it to the rest of the body.",
          "There are more stars in the universe than grains of sand on all the Earth's beaches.",
          "A bolt of lightning contains enough energy to toast 100,000 slices of bread.",
          "The Eiffel Tower can be 15 cm taller during the summer due to the expansion of iron in the heat.",
          "Wombat poop is cube-shaped. This helps it stay in place and mark their territory."
        ]
      },
    defaultGeographyQuiz: {
      enabled: true,
      isQuiz: true,
      title: "Geography Quiz Time!",
      type: "Geography Quiz",
      messages: ["a", "placeholder"], // will be populated by querying LOCALSTORAGE using the key (stored elsewhere due to max storage size limitations in chrome storage)
    },
    defaultScienceQuiz: {
      enabled: true,
      isQuiz: true,
      title: "Science Quiz Time!",
      type: "Science Quiz",
      messages: ["a", "placeholder"], // will be populated by querying LOCALSTORAGE using the key (stored elsewhere due to max storage size limitations in chrome storage)
    },
  };