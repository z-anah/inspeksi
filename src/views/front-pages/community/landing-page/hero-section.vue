<script setup>
definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const props = defineProps({
  tagline: {
    type: String,
    default: 'Together Against Corruption',
  },
  title: {
    type: String,
    default: 'Building a Transparent and Accountable Community',
  },
  description: {
    type: String,
    default: 'Join us in the fight against corruption. Empower communities, uphold integrity, and create lasting change.',
  },
  buttonLabel: {
    type: String,
    default: 'Join the Movement',
  },
  buttonLink: {
    type: String,
    default: '/join',
  },
  highlights: {
    type: Array,
    default: () => [
      { icon: '🌍', text: '1000+ Active Members' },
      { icon: '🤝', text: 'Community-driven Initiatives' },
    ],
  },
  image: {
    type: String,
    default: 'https://placehold.co/912x716',
  },
  overlayImage: {
    type: String,
    default: 'https://placehold.co/287x177',
  },
})

</script>

<template>
  <section class="hero-section-bg">
    <VContainer>
      <div class="d-flex justify-center align-center payment-card">
        <VRow align="center" justify="center" class="g-10 g-lg-20">
          <VCol cols="12" lg="6" class="mb-8 mb-lg-0">
            <div>
              <VChip :label="false" color="primary" class="mb-4 text-dark font-weight-medium px-4 py-2 rounded-xl">
                {{ tagline }}
              </VChip>
              <h1 class="mb-3 text-dark font-weight-bold display-2">
                {{ title }}
              </h1>
              <p class="mb-6 mt-2 text-medium-emphasis text-body-1">
                {{ description }}
              </p>
              <VBtn color="primary" class="text-white font-weight-medium rounded-xl px-6 py-3 mb-6" :href="buttonLink"
                size="large" variant="flat">
                {{ buttonLabel }}
              </VBtn>
              <VRow class="mt-8" align="center" no-gutters>
                <VCol v-for="(highlight, idx) in highlights" :key="idx" cols="12" md="auto"
                  class="d-flex align-center mb-2 mb-md-0 me-md-8">
                  <span class="text-h6 me-2">{{ highlight.icon }}</span>
                  <span class="text-body-1 text-dark">{{ highlight.text }}</span>
                </VCol>
              </VRow>
            </div>
          </VCol>
          <VCol cols="12" lg="6">
            <div class="position-relative d-flex justify-center">
              <VImg :src="image" alt="Community against corruption" class="rounded-xl" width="100%" height="auto"
                cover />
              <VImg :src="overlayImage" alt="Unity icon" class="position-absolute d-none d-md-block"
                style="right: -60px; bottom: -100px; width:300px; height:300px;" />
            </div>
          </VCol>
        </VRow>
      </div>
    </VContainer>
  </section>
</template>

<style lang="scss" scoped>
.hero-section-bg {

  @media (min-width: 992px) {
    padding-block: 10rem 0;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    padding-block: 6rem 0;
  }

  @media (max-width: 767px) {
    padding-block: 3rem 0;
  }
}

.display-2 {
  font-size: 2.75rem;
  line-height: 1.1;
  font-weight: 800;
  background: linear-gradient(135deg, #000000 0%, #808080 47.92%, #ffffff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  background-size: 200% auto;
  -webkit-text-fill-color: transparent;
}

.payment-card {
  margin-block-end: 5.25rem;
}
</style>
