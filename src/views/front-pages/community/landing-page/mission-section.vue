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
    image: 'https://img.freepik.com/free-photo/front-view-stacked-books-graduation-cap-open-book-education-day_23-2149241017.jpg',
  },
  {
    number: '02',
    title: 'Kampanye Antikorupsi',
    description: 'Meningkatkan kesadaran Pelaku Pengadaan dan masyarakat tentang bahaya korupsi dan pentingnya berperan aktif dalam pemberantasannya',
    image: 'https://img.freepik.com/free-photo/side-view-hand-holding-megaphone_23-2149864193.jpg', 
  },
  {
    number: '03',
    title: 'Agen Antikorupsi',
    description: 'Meningkatkan partisipasi Pelaku Pengadaan dan masyarakat dalam upaya pencegahan dan pemberantasan korupsi',
    image: 'https://img.freepik.com/free-photo/business-hands-joined-together-teamwork_53876-14936.jpg',
  },
]

const guideImage = intergritasFile
</script>

<template>
  <div class="help-center-page">
    <div class="help-center-section">
      <VContainer>
        <section class="bg-white py-6 md:py-10 lg:py-12">
          <div class="text-center mb-12">
            <VChip color="primary" variant="tonal" class="mb-4 px-4 py-2 rounded-pill" size="small">
              <VIcon icon="tabler-flag" start size="16" />
              Visi Misi Komunitas
            </VChip>
            <h2 class="text-h3 font-weight-bold mb-4">Jejaring Aksi Antikorupsi</h2>
            <p class="text-h6 text-medium-emphasis mx-auto" style="max-width: 600px;">
              Bersama membangun komunitas pegiat antikorupsi di bidang pengadaan publik untuk mewujudkan integritas dan pemberantasan korupsi.
            </p>
          </div>
          <VRow class="my-6" align="stretch" justify="center">
            <VCol v-for="(step, idx) in steps" :key="idx" cols="12" md="4"
              :class="['mb-4 mb-md-0', idx === steps.length - 1 ? '' : '']">
              <VCard flat class="d-flex flex-column align-center h-100 pa-3 card-aesthetic">
                <img :src="step.image" alt="" class="mission-img mb-3" />
                <div class="d-flex flex-row align-center gap-2 gap-lg-3 w-100">
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
                </div>
              </VCard>
            </VCol>
          </VRow>
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

.mission-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  transition: transform 0.2s;
}
.card-aesthetic {
  background: #fafbfc;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(60,60,60,0.07);
  transition: box-shadow 0.2s;
}
.card-aesthetic:hover {
  box-shadow: 0 6px 24px rgba(60,60,60,0.13);
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
