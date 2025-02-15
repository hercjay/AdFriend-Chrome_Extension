document.addEventListener('DOMContentLoaded', function() {
    const adfriendIcon = document.getElementById('adfriend-icon');
    adfriendIcon.src = chrome.runtime.getURL('assets/icon-128.png');
});