// Default non-domain settings
const defaultSettings = {
  excluded_hidees: [],
  excluded_domains: [],
  dev: config.dev,
  enabled: true,
  share_data: true,
  fb_profile_ratio: false,
}

// Don't logInstall unless this switch is flipped
let logInstall = false
let logUpdate = false

// Keep local settings
let settingsLocal = false
