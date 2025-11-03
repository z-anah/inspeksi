import { storeToRefs } from 'pinia'
import { useTheme } from 'vuetify'
import { cookieRef, useLayoutConfigStore } from '@layouts/stores/config'
import { themeConfig } from '@themeConfig'

// SECTION Store
export const useConfigStore = defineStore('config', () => {
  // Force theme and skin to light
  const theme = cookieRef('theme', 'light')
  const skin = cookieRef('skin', 'default') // or 'bordered' depending on your setup

  const isVerticalNavSemiDark = cookieRef('isVerticalNavSemiDark', false)

  const { 
    isLessThanOverlayNavBreakpoint, 
    appContentWidth, 
    navbarType, 
    isNavbarBlurEnabled, 
    appContentLayoutNav, 
    isVerticalNavCollapsed, 
    footerType, 
    isAppRTL 
  } = storeToRefs(useLayoutConfigStore())
  
  return {
    theme,
    skin,
    isVerticalNavSemiDark,
    isLessThanOverlayNavBreakpoint,
    appContentWidth,
    navbarType,
    isNavbarBlurEnabled,
    appContentLayoutNav,
    isVerticalNavCollapsed,
    footerType,
    isAppRTL,
  }
})
// !SECTION

// SECTION Init
export const initConfigStore = () => {
  const vuetifyTheme = useTheme()
  const configStore = useConfigStore()

  // Always force Vuetify theme to light
  vuetifyTheme.global.name.value = 'light'

  watchEffect(() => {
    configStore.theme = 'light'
    document.documentElement.classList.remove('dark', 'dark-layout')
    document.documentElement.style.colorScheme = 'light'
  })
}
// !SECTION
