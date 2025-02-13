

export const defaultAdWidgetContents = {
    motivationalQuotesDefault: {
      enabled: true,
      isDefault: true,
      isQuiz: false,
      title: "Stay Motivated!",
      type: "Motivational Quotes",
      messages: [
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
      isDefault: true,
      isQuiz: false,
      title: "Stay Active!",
      type: "Activity Reminders",
      messages: [
        "Take a short walk to refresh your mind.",
        "Remember to stretch and move around.",
        "Stay hydrated, drink a glass of water.",
        "Take a moment to look away from your screen and rest your eyes.",
        "Do a quick set of jumping jacks to get your blood flowing.",
        "Take a few minutes to meditate and clear your mind."
      ]
    },
    funFactsDefault: {
        enabled: true,
      isDefault: true,
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
          "A bolt of lightning contains enough energy to toast 100,000 slices of bread.",
          "The Eiffel Tower can be 15 cm taller during the summer due to the expansion of iron in the heat.",
        ]
    },
    wordOfTheDayDefault: {
      enabled: true,
      isDefault: true,
      isQuiz: false,
      shouldCardFlip: true,
      cardFlipText: "Tap to reveal word of the day!",
      title: "Word of the Day",
      type: "Word of the Day",
      messages: [
          "Ennui (noun)\n\nA feeling of listlessness and boredom; a lack of interest or excitement.\n\nPronunciation: en-WEE\n\nUsage Example: After a few months of doing the same job, he started to feel ennui and was looking for a change.\n\nEtymology: From the French 'ennui', meaning 'boredom' or 'listlessness'.",
          "Vacillate (verb)\n\nTo hesitate or waver in one's decisions or actions.\n\nPronunciation: vuh-SIL-ayt\n\nUsage Example: He vacillated for hours before finally making a decision.\n\nEtymology: From the Latin 'vacillare', meaning 'to sway' or 'to waver'.",
          "Nebulous (adjective)\n\nUnclear or vague in meaning or form.\n\nPronunciation: NEB-yoo-luhs\n\nUsage Example: The concept was nebulous and difficult to grasp.\n\nEtymology: From the Latin 'nebula', meaning 'cloud'.",
          "Perfidious (adjective)\n\nDisloyal or treacherous; having a tendency to betray trust.\n\nPronunciation: pur-fid-EE-uhs\n\nUsage Example: The company's perfidious actions led to a loss of customer trust.\n\nEtymology: From the Latin 'perfidiosus', meaning 'faithless' or 'treacherous'.",
          "Ephemeral (adjective)\n\nLasting for a very short time; transitory.\n\nPronunciation: e-FEM-er-ul\n\nUsage Example: The firefly's glow was ephemeral, lasting only for a few seconds.\n\nEtymology: From the Greek 'ephemeros', meaning 'daily' or 'short-lived'.",
          "Enigmatic (adjective)\n\nMysterious or difficult to understand; ambiguous.\n\nPronunciation: en-ig-MAT-ik\n\nUsage Example: The artist's enigmatic smile seemed to convey a thousand different emotions.\n\nEtymology: From the Greek 'ainigmatikos', meaning 'riddle-like' or 'mysterious'.",
          "Sagacious (adjective)\n\nHaving keen discernment and good judgment; wise.\n\nPronunciation: sag-AY-shus\n\nUsage Example: The sagacious investor made a fortune by predicting the market trend.\n\nEtymology: From the Latin 'sagax', meaning 'wise' or 'discerning'.",
          "Taciturn (adjective)\n\nUnwilling to talk or communicate; uncommunicative.\n\nPronunciation: TAS-i-turn\n\nUsage Example: The taciturn stranger seemed mysterious and intriguing.\n\nEtymology: From the Latin 'taciturnus', meaning 'silent' or 'uncommunicative'.",
      ]
    },
    famousQuotesDefault: {
      enabled: true,
      isDefault: true,
      isQuiz: false,
      shouldCardFlip: true,
      cardFlipText: "Tap to reveal quote of the day!",
      title: "Quote of the Day",
      type: "Famous Quotes",
      messages: [
        "'Believe you can and you're halfway there.'\n\nTheodore Roosevelt",
        "'The only thing we have to fear is fear itself.'\n\nFranklin D. Roosevelt",
        "'Success is not final, failure is not fatal: It is the courage to continue that counts.'\n\nWinston Churchill",
        "'Don't watch the clock; do what it does. Keep going.'\n\nSam Levenson",
        "'You miss 100% of the shots you don't take.'\n\nWayne Gretzky",
        "'I have not failed. I've just found 10,000 ways that won't work.'\n\nThomas Edison",
        "'You are never too old to set another goal or to dream a new dream.'\n\nC.S. Lewis",
      ]
    },                  
    defaultGeographyQuiz: {
      enabled: true,
      isDefault: true,
      isQuiz: true,
      title: "Geography Quiz Time!",
      type: "Geography Quiz",
      messages: ["a", "placeholder"], // will be populated by querying LOCALSTORAGE using the key (stored elsewhere due to max storage size limitations in chrome storage)
    },
    defaultScienceQuiz: {
      enabled: true,
      isDefault: true,
      isQuiz: true,
      title: "Science Quiz Time!",
      type: "Science Quiz",
      messages: ["a", "placeholder"], // will be populated by querying LOCALSTORAGE using the key (stored elsewhere due to max storage size limitations in chrome storage)
    },
  };