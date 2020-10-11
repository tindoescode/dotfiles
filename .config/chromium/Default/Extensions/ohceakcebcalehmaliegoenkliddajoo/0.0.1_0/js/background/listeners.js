// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    // Start onboarding on install
    chrome.tabs.create({
      url: chrome.extension.getURL("html/pages/start.html"),
    })
    logInstall = true
  } else if (details.reason == "update") {
    const thisVersion = chrome.runtime.getManifest().version
    logUpdate = {
      previousVersion: details.previousVersion,
      thisVersion,
    }
    if (details.previousVersion !== thisVersion || config.dev) {
      // TODO: for showing update article:
      // showUpdateArticle = true
    }
  }
})
