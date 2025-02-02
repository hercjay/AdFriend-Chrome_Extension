
console.log("AdFriend Content Script Loaded");

function replaceAds() {

const adSelector = `
            iframe, 
            .ad, 
            adContent, 
            .ad_unit, 
            .ads, 
            [id^='ad_'], 
            [id^='Advert_'], 
            [class^='ad-']
        `;

const adElements = document.querySelectorAll(adSelector);

  console.log("AdFriend: number of ads on this page is " + adElements.length);

  adElements.forEach((ad) => {
    let widget = document.createElement("div");
    widget.className = "AdFriend-widget";
    widget.innerHTML = `
      <div class="AdFriend-message">
        <h3>🌟 Stay Inspired!</h3>
        <p>${getRandomMessage()}</p>
      </div>
    `;
    //TODO: I will migrate the styles to a separate file using the classnames
    widget.style.cssText = `
      background: black;
      padding: 15px;
      border-radius: 5px;
      text-align: center;
      font-size: 14px;
      text-color: white;
    `;

    console.log("AdFriend: Replacing this ad " + ad.getHTML() + " with this widget " + widget.getHTML());

    ad.replaceWith(widget);
  });
}

//TODO: I will reconstruct this to categorize the messages and maybe use a statements API
function getRandomMessage() {
  const messages = [
    "Keep pushing forward!",
    "You are capable of amazing things!",
    "Take a deep breath and keep going!",
    "Your hard work will pay off!"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

// Run the function when the page loads
replaceAds();
