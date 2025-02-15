


console.log("AdFriend Content Script Loaded");

const myQuizList = {
  defaultGeographyQuiz: window.defaultGeographyQuiz,
  defaultScienceQuiz: window.defaultScienceQuiz,
  //I can add ore here
}



// Check for the presence of the debugger statement
try {
  debugger;
} catch (e) {
  if (e instanceof Error && e.message.includes('debugger')) {
    console.log('AdFriend: Debugger detected, taking evasive action');
    // You can add your evasive action code here
    // Override the debugger statement
    const originalDebugger = window.debugger;
    window.debugger = function() {
      // Do nothing or execute a custom function
      console.log("Debugger override: Ignoring pause request");
    };
  }
}

// Detect the use of eval or Function constructors
if (typeof eval === 'function' || typeof Function === 'function') {
  // eval or Function constructor is present, take evasive action
  console.log('AdFriend: eval or Function constructor detected, taking evasive action');
  // You can add your evasive action code here
  // Override the debugger statement
  const originalDebugger = window.debugger;
  window.debugger = function() {
    // Do nothing or execute a custom function
    console.log("AdFriend: Debugger override: Ignoring pause request");
  };
}

// Monitor for changes in the script's execution context
if (typeof window !== 'undefined' && window !== this) {
  // Execution context has changed, take evasive action
  console.log('AdFriend: Execution context changed, taking evasive action');
  // You can add your evasive action code here
}


function replaceAds() {
    // Get the patterns from global adSelector variable defined in manifest.json and adSelector.js
    const adSelector = window.AdFriend_adSelector;
    const adElements = document.querySelectorAll(adSelector);
  
    console.log("AdFriend: number of ads on this page is " + adElements.length);
  
    // Use runtime to send a message to be received by another script that will return random messages
    chrome.runtime.sendMessage({ action: "getRandomMessages", numOfMsgs: adElements.length }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("AdFriend: Error sending message for getRandomMessages", chrome.runtime.lastError);
        return;
      }
  
      if (response.error) {
        console.error("AdFriend: Error in response for getRandomMessages", response.error);
        return;
      }
  
      let messages = response.messages;
      console.log("AdFriend: messages received for getRandomMessages are ", messages);

      if (messages.length > 0) {
        try {
          adElements.forEach((ad, index) => {
            let message = messages[index];
            let widget = document.createElement("div");
            widget.className = "AdFriend-widget";
            if(message.isQuiz === true){
              //get random quiz content using the key from localstorage
              const quizData = getRandomQuizMessage(message.key)
              console.log("AdFriend: Quiz data received for getRandomMessages are ", quizData);
              widget.innerHTML = `
                        <div class="AdFriend-message">

                          <div id="toast" class="toast hidden">
                            <p id="toast-message">Sample Toast Message</p>
                          </div>

                          <div class="AdFriend-header">
                          <img src="${chrome.runtime.getURL('assets/icon-128.png')}" alt="" />
                          <h3 class="title">${message.title}</h3>
                          </div>
                          
                          <div class="AdFriend-quiz">

                            <p>${quizData.question}</p>
                            
                            <div class="AdFriend-quiz-options-group">
                              <p class="AdFriend-quiz-option">${quizData.options[0].text}</p>
                              <p class="AdFriend-quiz-option">${quizData.options[1].text}</p>
                              <p class="AdFriend-quiz-option">${quizData.options[2].text}</p>
                              <p class="AdFriend-quiz-option">${quizData.options[3].text}</p>
                            </div>

                            <div class="AdFriend-quiz-answer" style="display: none;">
                              <p>
                                <strong>
                                ${quizData.options.find((q) => q.correct).text} 
                                </strong>
                                is the correct answer!
                              </p>
                            </div>

                          </div>
                        `;

              const options = widget.querySelectorAll('.AdFriend-quiz-option');
              options.forEach((option, index) => {
                option.addEventListener('click', () => {
                const answerDiv = widget.querySelector('.AdFriend-quiz-answer');
                answerDiv.style.display = 'flex';
                if (!widget.querySelector('.AdFriend-quiz-options-group').classList.contains('attempted')) {
                  if (quizData.options[index].correct) {
                    option.style.color = 'green';
                    showToast("Correct! You have earned 1 XP!");
                    awardXP(1);
                  } else {
                    option.style.color = 'red';
                    showToast("Incorrect! Try again next time to earn XP!");
                  }
                  widget.querySelector('.AdFriend-quiz-options-group').classList.add('attempted');
                }      option.style.background = 'rgba(0, 158, 163, 0.2)';
                option.style.fontWeight = 'bold';
                });
              });
            } else if(message.shouldCardFlip == true) {
              //replace newline chars with line breaks
              const processedContent = message.content.replace(/\n/g, '<br>');
              widget.innerHTML = `
                  <div class="AdFriend-message">

                    <div id="toast" class="toast hidden">
                      <p id="toast-message">Sample Toast Message</p>
                    </div>

                    <div class="AdFriend-header">
                      <img src="${chrome.runtime.getURL('assets/icon-128.png')}" alt="" />
                      <h3 class="title">${message.title}</h3>
                    </div>

                    <div class="flip-card">
                      <div class="card-inner">

                        <div class="card-front msg-p">
                            ${message.cardFlipText}
                        </div>

                        <div class="card-back msg-p">
                            <strong>${processedContent}</strong>
                        </div>

                      </div>
                    </div>

                  </div>
                `;
                let attempted = false;
                widget.querySelector('.card-inner').addEventListener('click', () => {
                  widget.querySelector('.flip-card').classList.toggle('flipped');
                  
                  if(attempted == false) {
                    awardXP(1);
                    showToast("You have earned 1 XP for interacting with this widget!");
                    attempted = true;
                  }
                });
              } else {
              widget.innerHTML = `
                  <div class="AdFriend-message">
                    <div class="AdFriend-header">
                      <img src="${chrome.runtime.getURL('assets/icon-128.png')}" alt="" />
                      <h3 class="title">${message.title}</h3>
                    </div>
                    <p "msg-p">${message.content}</p>
                  </div>
                `;
            }
            ad.replaceWith(widget);
          });
        } catch (error) {
          console.error("AdFriend: Error replacing ads", error);
        }
      } else {
        console.log("AdFriend: No messages found to replace ads with");
      }
    });
  }


function getPluginEnabledValue() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('enabled', (data) => {
      if (data.enabled !== undefined) {
        resolve(data.enabled);
      } else {
        resolve(true); // default to true if no value is found
      }
    });
  });
}

function listenForPluginEnabledChanges() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (changes.enabled) {
        console.log("AdFriend: Plugin enabled status has changed", changes.enabled.newValue);
            //reload page to show/hide ads based on new value
            location.reload();
        }
    });
}

// Run the function when the page loads, if this plugin is enabled in the popup
getPluginEnabledValue().then((enabled) => {
    console.log("AdFriend: Plugin enabled status is", enabled);
  if (enabled === true) {
    document.addEventListener('DOMContentLoaded', replaceAds());
  } 
});

listenForPluginEnabledChanges();



function getRandomQuizMessage(key) {
    return myQuizList[key][Math.floor(Math.random() * myQuizList[key].length)];
}

function showToast (msg = "Saved!") {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  toastMsg.innerHTML = msg;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000)
}

function awardXP(amount = 1) {
  chrome.storage.sync.get('adfriendXP', (data) => {
    console.log("AdFriend: awarding XP. current xp is ", data.adfriendXP);
    const xp = data.adfriendXP || 0;
    chrome.storage.sync.set({ adfriendXP: xp + amount });
  });
}

