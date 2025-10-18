<script setup>
import intergritasFile from '@images/inspeksi/integritas.png'

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const steps = [
  {
    number: '01',
    title: 'Pendidikan Antikorupsi',
    description: 'Melaksanakan pendidikan antikorupsi dalam pengadaan publik bagi kalangan Pelaku Pengadaan dan masyarakat',
  },
  {
    number: '02',
    title: 'Kampanye Antikorupsi',
    description: 'Meningkatkan kesadaran Pelaku Pengadaan dan masyarakat tentang bahaya korupsi dan pentingnya berperan aktif dalam pemberantasannya',
  },
  {
    number: '03',
    title: 'Agen Antikorupsi',
    description: 'Meningkatkan partisipasi Pelaku Pengadaan dan masyarakat dalam upaya pencegahan dan pemberantasan korupsi',
  },
]

const guideImage = intergritasFile
</script>

<template>
  <div class="help-center-page">
    <div class="help-center-section">
      <VContainer>
        <section class="bg-white py-6 md:py-10 lg:py-12">
          <div class="text-center mb-4">
            <VChip color="primary" class="mb-2 text-dark font-weight-medium px-4 py-1 rounded-pill" size="small">
              Visi Misi Komunitas
            </VChip>
            <h2 class="mb-3 text-h4 lg:text-h2 md:text-h3">
              Menjadi jejaring aksi pemberantasan korupsi yang kuat bagi para pegiat antikorupsi di bidang pengadaan
              publik
            </h2>
          </div>
          <VRow class="my-6" align="stretch" justify="center">
            <VCol v-for="(step, idx) in steps" :key="idx" cols="12" md="4"
              :class="['mb-4 mb-md-0', idx === steps.length - 1 ? '' : '']">
              <VCard flat class="d-flex flex-column flex-lg-row align-center gap-2 gap-lg-3 h-100 pa-3">
                <div>
                  <div class="bg-primary rounded-circle d-inline-flex align-center justify-center mb-2"
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
          <div class="d-flex justify-center mt-6">
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
  margin-block: 3rem 3rem;
}

.help-center-page {
  .search-header {
    background-size: cover !important;
    padding-block: 9.25rem 4.75rem !important;
  }

  .help-center-section {
    padding-block: 3rem;
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
      padding-block: 4rem 1.5rem !important;
      padding-inline: 2rem !important;
    }

    .help-center-section {
      padding-block: 2rem;
    }
  }
}
</style>
