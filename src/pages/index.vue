<script setup>
import ContactUs from '@/views/front-pages/community/landing-page/contact-us.vue'
import FaqSection from '@/views/front-pages/community/landing-page/faq-section.vue'
import FeaturedArticles from '@/views/front-pages/community/landing-page/featured-articles.vue'
import HeroSection from '@/views/front-pages/community/landing-page/hero-section.vue'
import MembersHighlightJoinUs from '@/views/front-pages/community/landing-page/members-highlight-join-us.vue'
import MissionSection from '@/views/front-pages/community/landing-page/mission-section.vue'
import Footer from '@/views/front-pages/front-page-footer.vue'
import Navbar from '@/views/front-pages/front-page-navbar.vue'
import { useConfigStore } from '@core/stores/config'

const store = useConfigStore()
store.skin = 'default'
definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})
</script>

<template>
  <div class="landing-page-wrapper">
    <Navbar />
    <HeroSection />
    <MissionSection />
    <FeaturedArticles />
    <MembersHighlightJoinUs />
    <FaqSection />
    <ContactUs />
    <Footer />
  </div>
</template>

<style lang="scss">
.landing-page-wrapper {
  .v-container {
    max-width: 1400px !important;
  }
}

@media (max-width: 960px) and (min-width: 600px) {
  .landing-page-wrapper {
    .container {
      padding-inline: 2rem !important;
    }
  }
}
</style>
