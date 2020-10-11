;(async function () {
  const settings = await loadSyncStorage()
  // handleCheckbox(
  //   document.getElementById("share_data"),
  //   settings.share_data,
  //   () => {
  //     changeSettingRequest(true, "share_data")
  //   },
  //   () => {
  //     changeSettingRequest(false, "share_data")
  //   }
  // )
  document.getElementById("js-unweb-id").innerText = settings.user_id
})()
