// URL receiver from content script and init options giver
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Get settings
  if (request.type === "settings") {
    sendResponse({ settings: settingsLocal })
  }
  // Change setting
  if (request.type === "change_setting") {
    changeSetting(request.newVal, request.setting)
  }
  // Log event
  if (request.type === "event") {
    eventLogReceiver(request)
  }
})
