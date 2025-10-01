<script setup>
definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const steps = [
  {
    number: '01',
    title: 'Understand the Mission',
    description: 'Learn about our anti-corruption goals and how you can contribute to a transparent community.',
  },
  {
    number: '02',
    title: 'Take Action',
    description: 'Report corruption, participate in campaigns, and help spread awareness in your area.',
  },
  {
    number: '03',
    title: 'Empower Others',
    description: 'Invite friends, family, and colleagues to join and strengthen the movement together.',
  },
]

const guideImage = 'https://placehold.co/1363x500'
</script>

<template>
  <div class="help-center-page">
    <div class="help-center-section bg-surface">
      <VContainer>
        <section class="bg-white py-10 md:py-22.5 lg:py-25">
          <div class="text-center mb-6">
            <VChip color="primary" class="mb-3 text-dark font-weight-medium px-4 py-1 rounded-pill" size="small">
              Community Mission Steps
            </VChip>
            <h2 class="mb-4 text-h3 lg:text-h1 md:text-h2">
              Mission for a Corruption-Free Community
            </h2>
          </div>
          <VRow class="my-10" align="stretch" justify="center">
            <VCol v-for="(step, idx) in steps" :key="idx" cols="12" md="4"
              :class="['mb-6 mb-md-0', idx === steps.length - 1 ? '' : '']">
              <VCard flat class="d-flex flex-column flex-lg-row align-center gap-3 gap-lg-4 h-100 pa-4">
                <div>
                  <div class="bg-primary rounded-circle d-inline-flex align-center justify-center mb-3"
                    style="width:44px;height:44px;">
                    <h5 class="text-h6 text-white mb-0">{{ step.number }}</h5>
                  </div>
                </div>
                <div>
                  <VCardTitle class="text-h5 mb-2 pa-0">{{ step.title }}</VCardTitle>
                  <VCardText class="text-body-1 mb-0 pa-0">{{ step.description }}</VCardText>
                </div>
              </VCard>
            </VCol>
          </VRow>
          <div class="d-flex justify-center mt-8">
            <VImg :src="guideImage" class="rounded-xl" alt="Mission illustration" max-width="100%" width="100%"
              height="auto" cover />
          </div>
        </section>
      </VContainer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.payment-card {
  margin-block: 10.5rem 5.25rem;
}

.help-center-page {
  .search-header {
    background-size: cover !important;
    padding-block: 9.25rem 4.75rem !important;
  }

  .help-center-section {
    padding-block: 5.25rem;
  }
}

@media (max-width: 960px) and (min-width: 600px) {
  .help-center-page {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}

@media (max-width: 599px) {
  .help-center-page {
    .search-header {
      padding-block: 7rem 2rem !important;
      padding-inline: 2rem !important;
    }

    .help-center-section {
      padding-block: 3.5rem;
    }
  }
}
</style>
