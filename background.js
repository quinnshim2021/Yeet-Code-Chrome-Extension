/*
  set initial status
    - when the status is Off in background.js, it means iconOff should be put in place
    - when the status is Off in content.js, it means the script SHOULD run (was previously off)
      - script stops in content when status is On
*/
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({status: "Off"}, function() {
    console.log("initial status set to off")
  });
});

/*
  running content script
*/
chrome.browserAction.onClicked.addListener(iconClicked); // if icon is clicked

function iconClicked(tab) { // tells content script to run
    chrome.storage.sync.get('status', function(data) {
      let msg = {
        status: data.status,
        text: "run content"
      }
      chrome.tabs.sendMessage(tab.id, msg);
    });
}

// for getting a response from content.js
// chrome.runtime.onMessage.addListener( // response for message sent from content
//     function(request, sender, sendResponse) {
//       chrome.storage.sync.get('status', function(data) {
//         var current = request.status;
//         var s = current === "Off" ? "On" : "Off";
    
//         chrome.storage.sync.set({status: s}, function() {
//           console.log("Yeet Code is " + s);
//         });
//       });
//     }
//   );



/*
  icon
*/
// switches icon based on if onn or off
function updateIcon() {
  chrome.storage.sync.get('status', function(data) {
    var current = data.status;
    var s = current === "On" ? "Off" : "On";

    chrome.browserAction.setIcon({path: 'icon' + s + '.png'});

    chrome.storage.sync.set({status: s}, function() {
      console.log("Yeet Code is now " + s);
    });
  });
};

// waits for icon to be clicked
chrome.browserAction.onClicked.addListener(updateIcon);
