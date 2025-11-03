<script setup>
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { useWindowScroll } from '@vueuse/core'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useDisplay } from 'vuetify'
import BasketDropdown from './community/components/BasketDropdown.vue'
import { useCartStore } from '@/stores/cart'

const props = defineProps({ activeId: String })

const display = useDisplay()
const { y } = useWindowScroll()
const route = useRoute()
const router = useRouter()
const sidebar = ref(false)

// Initialize cart store to ensure it's available
const cartStore = useCartStore()

watch(() => display, () => {
  return display.mdAndUp ? sidebar.value = false : sidebar.value
}, { deep: true })

const isMenuOpen = ref(false)
const isMegaMenuOpen = ref(false)

const menuItems = [
]

const navLinks = [
  { label: 'Beranda', route: { path: '/' } },
  { label: 'Artikel', route: { path: '/articles' } },
  {
    label: 'Kampanye',
    children: [
      { label: 'Merchandise', route: { name: 'campaign-products' } },
      { label: 'Musik', route: { name: 'campaign-music' } },
      { label: 'Film', route: { name: 'campaign-film' } },
    ],
  },
  { label: 'Kegiatan', route: { name: 'calendar' } },
  { label: 'Formulir', route: { path: '/forms' } },
]

const isCurrentRoute = to => {
  return route.matched.some(_route => _route.path.startsWith(router.resolve(to).path))

  // ℹ️ Below is much accurate approach if you don't have any nested routes

  // return route.matched.some(_route => _route.path === router.resolve(to).path)
}

const isPageActive = computed(() => menuItems.some(item => item.navItems.some(listItem => isCurrentRoute(listItem.to))))
</script>

<template>
  <!-- 👉 Navigation drawer for mobile devices  -->
  <VNavigationDrawer v-model="sidebar" width="275" data-allow-mismatch disable-resize-watcher>
    <PerfectScrollbar :options="{ wheelPropagation: false }" class="h-100">
      <!-- Nav items -->
      <div>
        <div class="d-flex flex-column gap-y-4 pa-4">
          <!-- <RouterLink
            v-for="(item, index) in ['Home', 'Features', 'Team', 'FAQ', 'Contact us']"
            :key="index"
            :to="{ name: 'front-pages-landing-page', hash: `#${item.toLowerCase().replace(' ', '-')}` }"
            class="nav-link font-weight-medium"
            :class="[props.activeId?.toLocaleLowerCase().replace('-', ' ') === item.toLocaleLowerCase() ? 'active-link' : '']"
          >
            {{ item }}
          </RouterLink> -->

          <div class="font-weight-medium cursor-pointer">
            <div class="px-4" :class="isMenuOpen ? 'd-block' : 'd-none'">
              <div v-for="(item, index) in menuItems" :key="index">
                <div class="d-flex align-center gap-x-3 mb-4">
                  <VAvatar variant="tonal" color="primary" rounded :icon="item.listIcon" />
                  <div class="text-body-1 text-high-emphasis font-weight-medium">
                    {{ item.listTitle }}
                  </div>
                </div>
                <ul class="mb-6">
                  <li v-for="listItem in item.navItems" :key="listItem.name" style="list-style: none;"
                    class="text-body-1 mb-4 text-no-wrap">
                    <RouterLink :to="listItem.to" :target="item.listTitle === 'Page' ? '_self' : '_blank'"
                      class="mega-menu-item"
                      :class="isCurrentRoute(listItem.to) ? 'active-link' : 'text-high-emphasis'">
                      <VIcon icon="tabler-circle" :size="10" class="me-2" />
                      <span> {{ listItem.name }}</span>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- <RouterLink to="/" target="_blank" class="font-weight-medium nav-link">
            Admin
          </RouterLink> -->
          <RouterLink
            v-for="(item, index) in navLinks"
            :key="index"
            :to="item.route"
            class="nav-link font-weight-medium py-2 px-2 px-lg-4"
            :class="[props.activeId?.toLocaleLowerCase().replace('-', ' ') === item.label.toLocaleLowerCase() ? 'active-link' : '']"
          >
            {{ item.label }}
          </RouterLink>
          <!-- Submenu rendering for mobile drawer -->
          <template v-for="(item, index) in navLinks">
            <div v-if="item.children" :key="`submenu-mobile-${index}`" class="ps-4">
              <RouterLink
                v-for="(child, cIdx) in item.children"
                :key="cIdx"
                :to="child.route"
                class="nav-link font-weight-medium py-2 px-2 px-lg-4"
                style="font-size: 0.95em;"
              >
                {{ child.label }}
              </RouterLink>
            </div>
          </template>
        </div>
      </div>

      <!-- Navigation drawer close icon -->
      <VIcon id="navigation-drawer-close-btn" icon="tabler-x" size="20" @click="sidebar = !sidebar" />
    </PerfectScrollbar>
  </VNavigationDrawer>

  <!-- 👉 Navbar for desktop devices  -->
  <div class="front-page-navbar">
    <div class="front-page-navbar">
      <VAppBar
        :color="$vuetify.theme.current.dark ? 'rgba(var(--v-theme-surface),0.38)' : 'rgba(var(--v-theme-surface), 0.38)'"
        :class="y > 10 ? 'app-bar-scrolled' : [$vuetify.theme.current.dark ? 'app-bar-dark' : 'app-bar-light', 'elevation-0']"
        class="navbar-blur">
        <!-- toggle icon for mobile device -->
        <IconBtn id="vertical-nav-toggle-btn" class="ms-n3 me-2 d-inline-block d-md-none" @click="sidebar = !sidebar">
          <VIcon size="26" icon="tabler-menu-2" color="rgba(var(--v-theme-on-surface))" />
        </IconBtn>
        <!-- Title and Landing page sections -->
        <div class="d-flex align-center">
          <VAppBarTitle class="me-6">
            <RouterLink to="/" class="d-flex gap-x-4" :class="$vuetify.display.mdAndUp ? 'd-none' : 'd-block'">
              <div class="app-logo">
                <VNodeRenderer :nodes="themeConfig.app.logo" />
              </div>
            </RouterLink>
          </VAppBarTitle>

          <!-- landing page sections -->
          <div class="text-base align-center d-none d-md-flex">
            <template v-for="(item, index) in navLinks">
              <template v-if="item.children">
                <v-menu
                  :close-on-content-click="false"
                  open-on-hover
                  offset-y
                  transition="slide-y-transition"
                  :key="index"
                  class="nav-link-menu"
                >
                  <template #activator="{ props: menuProps }">
                    <span
                      v-bind="menuProps"
                      class="nav-link font-weight-medium py-2 px-2 px-lg-4"
                      :class="[props.activeId?.toLocaleLowerCase().replace('-', ' ') === item.label.toLocaleLowerCase() ? 'active-link' : '']"
                      style="cursor: pointer;"
                    >
                      {{ item.label }}
                      <VIcon icon="tabler-chevron-down" size="16" class="ms-1" />
                    </span>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(child, cIdx) in item.children"
                      :key="cIdx"
                      :to="child.route"
                      class="nav-link font-weight-medium"
                      style="font-size: 0.95em;"
                      @click="$router.push(child.route)"
                    >
                      {{ child.label }}
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
              <template v-else>
                <RouterLink
                  :to="item.route"
                  :key="index"
                  class="nav-link font-weight-medium py-2 px-2 px-lg-4"
                  :class="[props.activeId?.toLocaleLowerCase().replace('-', ' ') === item.label.toLocaleLowerCase() ? 'active-link' : '']"
                >
                  {{ item.label }}
                </RouterLink>
              </template>
            </template>
          </div>
        </div>

        <VSpacer />

        <BasketDropdown />
      </VAppBar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  &:not(:hover) {
    color: rgb(var(--v-theme-on-surface));
  }
}

.page-link {
  &:hover {
    color: rgb(var(--v-theme-primary)) !important;
  }
}

@media (max-width: 1280px) {
  .nav-menu {
    gap: 2.25rem;
  }
}

@media (min-width: 1920px) {
  .front-page-navbar {
    .v-toolbar {
      max-inline-size: calc(1440px - 32px);
    }
  }
}

@media (min-width: 1280px) and (max-width: 1919px) {
  .front-page-navbar {
    .v-toolbar {
      max-inline-size: calc(1200px - 32px);
    }
  }
}

@media (min-width: 960px) and (max-width: 1279px) {
  .front-page-navbar {
    .v-toolbar {
      max-inline-size: calc(900px - 32px);
    }
  }
}

@media (min-width: 600px) and (max-width: 959px) {
  .front-page-navbar {
    .v-toolbar {
      max-inline-size: calc(100% - 64px);
    }
  }
}

@media (max-width: 600px) {
  .front-page-navbar {
    .v-toolbar {
      max-inline-size: calc(100% - 32px);
    }
  }
}

.nav-item-img {
  border: 10px solid rgb(var(--v-theme-background));
  border-radius: 10px;
}

.active-link {
  color: rgb(var(--v-theme-primary)) !important;
}

.app-bar-light {
  border: 2px solid rgba(var(--v-theme-surface), 68%);
  border-radius: 0.5rem;
  background-color: rgba(var(--v-theme-surface), 38%);
  transition: all 0.1s ease-in-out;
}

.app-bar-dark {
  border: 2px solid rgba(var(--v-theme-surface), 68%);
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 4%);
  transition: all 0.1s ease-in-out;
}

.app-bar-scrolled {
  border: 2px solid rgb(var(--v-theme-surface));
  border-radius: 0.5rem;
  background-color: rgb(var(--v-theme-surface)) !important;
  transition: all 0.1s ease-in-out;
}

.front-page-navbar::after {
  position: fixed;
  z-index: 2;
  backdrop-filter: saturate(100%) blur(6px);
  block-size: 5rem;
  content: "";
  inline-size: 100%;
}
</style>

<style lang="scss">
@use "@layouts/styles/mixins" as layoutMixins;

.mega-menu {
  position: fixed !important;
  inset-block-start: 5.4rem;
  inset-inline-start: 50%;
  transform: translateX(-50%);

  @include layoutMixins.rtl {
    transform: translateX(50%);
  }
}

.front-page-navbar {
  .v-toolbar__content {
    padding-inline: 30px !important;
  }

  .v-toolbar {
    inset-inline: 0 !important;
    margin-block-start: 1rem !important;
    margin-inline: auto !important;
  }
}

.mega-menu-item {
  &:hover {
    color: rgb(var(--v-theme-primary)) !important;
  }
}

#navigation-drawer-close-btn {
  position: absolute;
  cursor: pointer;
  inset-block-start: 0.5rem;
  inset-inline-end: 1rem;
}
</style>
