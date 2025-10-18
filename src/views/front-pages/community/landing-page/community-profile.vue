<script setup>
definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const visionMission = {
  vision: 'Menjadi jejaring aksi pemberantasan korupsi yang kuat bagi para pegiat antikorupsi di bidang pengadaan publik',
  missions: [
    'Melaksanakan pendidikan antikorupsi dalam pengadaan publik bagi kalangan Pelaku Pengadaan dan masyarakat',
    'Meningkatkan kesadaran Pelaku Pengadaan dan masyarakat tentang bahaya korupsi dan pentingnya berperan aktif dalam pemberantasannya',
    'Meningkatkan partisipasi Pelaku Pengadaan dan masyarakat dalam upaya pencegahan dan pemberantasan korupsi'
  ]
}

const workPrograms = [
  {
    title: 'Pendidikan Antikorupsi',
    icon: 'tabler-school',
    color: 'primary',
    activities: [
      'Penyuluhan antikorupsi bagi pelaku pengadaan',
      'Penyuluhan antikorupsi bagi pelaku usaha',
      'Training Awareness Sistem Manajemen Anti Penyuapan (SMAP)',
      'Konseling',
      'Pendampingan penyusunan MCSP KPK',
      'Pendampingan proses pengadaan publik',
      'Menyusun kajian korupsi dalam pengadaan publik'
    ]
  },
  {
    title: 'Kampanye Kesadaran',
    icon: 'tabler-speakerphone',
    color: 'success',
    activities: [
      'Musik antikorupsi',
      'Film antikorupsi',
      'Literasi kisah inspiratif pengadaan antikorupsi',
      'Konten kreatif lainnya'
    ]
  },
  {
    title: 'Peningkatan Partisipasi',
    icon: 'tabler-users',
    color: 'info',
    activities: [
      'Sosialisasi Penyuluh Antikorupsi',
      'Bimtek Calon Penyuluh Antikorupsi',
      'Pendampingan penyusunan portofolio Penyuluh Antikorupsi',
      'Berkolaborasi dengan organisasi lain dalam mengedukasi masyarakat tentang pencegahan korupsi'
    ]
  }
]
</script>

<template>
  <div>
    <!-- Introduction Section -->
    <section class="intro-section bg-surface">
      <VContainer>
        <div class="py-16">
          <!-- Header -->
          <div class="text-center mb-12">
            <VChip color="primary" variant="tonal" class="mb-4 text-primary font-weight-medium px-4 py-2 rounded-pill"
              size="small">
              <VIcon icon="tabler-shield-check" start size="16" />
              Profil Komunitas
            </VChip>

            <h1 class="text-h2 lg:text-h1 font-weight-bold mb-4">
              Insan Pengadaan
              <span class="text-primary">Antikorupsi</span>
            </h1>

            <h2 class="text-h4 text-medium-emphasis mb-8 font-weight-medium">
              (Inspeksi)
            </h2>
          </div>

          <!-- Main Content Card -->
          <VCard elevation="4" class="pa-8 mb-8">
            <VRow align="center">
              <VCol cols="12" lg="8">
                <div class="d-flex align-center mb-6">
                  <VAvatar color="primary" variant="tonal" size="56" class="me-4">
                    <VIcon icon="tabler-info-circle" size="28" />
                  </VAvatar>
                  <h3 class="text-h4 font-weight-bold">Tentang Kami</h3>
                </div>

                <p class="text-h6 text-medium-emphasis leading-normal mb-6">
                  Komunitas yang beranggotakan para pelaku pengadaan dan pemerhati pengadaan publik yang menaruh
                  perhatian serius terhadap pemberantasan korupsi dalam pengadaan publik.
                </p>

                <div class="d-flex flex-wrap gap-4">
                  <VBtn color="primary" size="large" variant="flat" class="px-8" prepend-icon="tabler-users">
                    Bergabung Sekarang
                  </VBtn>
                  <VBtn color="primary" size="large" variant="tonal" class="px-8" prepend-icon="tabler-arrow-down">
                    Pelajari Lebih Lanjut
                  </VBtn>
                </div>
              </VCol>

              <VCol cols="12" lg="4">
                <div class="text-center">
                  <VAvatar color="primary" variant="tonal" size="120" class="mb-6">
                    <VIcon icon="tabler-shield-check" size="60" />
                  </VAvatar>
                  <h4 class="text-h5 font-weight-bold mb-2">Inspeksi</h4>
                  <p class="text-body-1 text-medium-emphasis">
                    Komunitas Antikorupsi
                  </p>
                </div>
              </VCol>
            </VRow>
          </VCard>

          <!-- Value Cards -->
          <VRow>
            <VCol cols="12" md="4">
              <VCard class="value-card h-100 text-center" elevation="2">
                <VCardText class="pa-6">
                  <VAvatar color="primary" variant="tonal" size="64" class="mb-4">
                    <VIcon icon="tabler-shield-check" size="32" />
                  </VAvatar>
                  <h4 class="text-h6 font-weight-bold mb-3">Integritas</h4>
                  <p class="text-body-2 text-medium-emphasis mb-0">
                    Menjunjung tinggi nilai-nilai antikorupsi dalam setiap langkah
                  </p>
                </VCardText>
              </VCard>
            </VCol>

            <VCol cols="12" md="4">
              <VCard class="value-card h-100 text-center" elevation="2">
                <VCardText class="pa-6">
                  <VAvatar color="success" variant="tonal" size="64" class="mb-4">
                    <VIcon icon="tabler-users" size="32" />
                  </VAvatar>
                  <h4 class="text-h6 font-weight-bold mb-3">Kolaborasi</h4>
                  <p class="text-body-2 text-medium-emphasis mb-0">
                    Membangun jejaring yang kuat antar pelaku pengadaan
                  </p>
                </VCardText>
              </VCard>
            </VCol>

            <VCol cols="12" md="4">
              <VCard class="value-card h-100 text-center" elevation="2">
                <VCardText class="pa-6">
                  <VAvatar color="warning" variant="tonal" size="64" class="mb-4">
                    <VIcon icon="tabler-target" size="32" />
                  </VAvatar>
                  <h4 class="text-h6 font-weight-bold mb-3">Aksi Nyata</h4>
                  <p class="text-body-2 text-medium-emphasis mb-0">
                    Program kerja yang berdampak langsung pada masyarakat
                  </p>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </div>
      </VContainer>
    </section>

    <!-- Vision & Mission Section -->
    <section class="vision-mission-section">
      <VContainer>
        <div class="text-center mb-12">
          <VChip color="primary" variant="tonal" class="mb-4 px-4 py-2 rounded-pill" size="small">
            <VIcon icon="tabler-eye" start size="16" />
            Visi & Misi
          </VChip>
          <h2 class="text-h3 font-weight-bold mb-4">Komitmen Kami</h2>
          <p class="text-h6 text-medium-emphasis mx-auto" style="max-width: 600px;">
            Membangun masa depan pengadaan publik yang bersih dan transparan
          </p>
        </div>

        <VRow>
          <VCol cols="12" lg="6">
            <VCard class="vision-card h-100" elevation="4">
              <VCardText class="pa-8">
                <div class="d-flex align-center mb-6">
                  <VAvatar color="primary" variant="tonal" size="56" class="me-4">
                    <VIcon icon="tabler-eye" size="28" />
                  </VAvatar>
                  <h3 class="text-h4 font-weight-bold">Visi</h3>
                </div>
                <p class="text-h6 text-medium-emphasis leading-normal">
                  {{ visionMission.vision }}
                </p>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12" lg="6">
            <VCard class="mission-card h-100" elevation="4">
              <VCardText class="pa-8">
                <div class="d-flex align-center mb-6">
                  <VAvatar color="success" variant="tonal" size="56" class="me-4">
                    <VIcon icon="tabler-target" size="28" />
                  </VAvatar>
                  <h3 class="text-h4 font-weight-bold">Misi</h3>
                </div>
                <div class="mission-list">
                  <div v-for="(mission, idx) in visionMission.missions" :key="idx"
                    class="mission-item d-flex align-start mb-4">
                    <VAvatar size="32" color="success" variant="tonal" class="me-3 flex-shrink-0">
                      <span class="text-body-2 font-weight-bold">{{ idx + 1 }}</span>
                    </VAvatar>
                    <p class="text-body-1 text-medium-emphasis mb-0 pt-1">{{ mission }}</p>
                  </div>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- Work Programs Section -->
    <section class="programs-section bg-surface">
      <VContainer>
        <div class="text-center mb-12">
          <VChip color="primary" variant="tonal" class="mb-4 px-4 py-2 rounded-pill" size="small">
            <VIcon icon="tabler-briefcase" start size="16" />
            Program Kerja
          </VChip>
          <h2 class="text-h3 font-weight-bold mb-4">Program Strategis</h2>
          <p class="text-h6 text-medium-emphasis mx-auto" style="max-width: 600px;">
            Berbagai inisiatif untuk mewujudkan visi dan misi komunitas
          </p>
        </div>

        <VRow>
          <VCol v-for="(program, idx) in workPrograms" :key="idx" cols="12" lg="4" class="mb-6">
            <VCard class="program-card h-100 position-relative overflow-hidden" elevation="4">
              <div class="program-header pa-6 pb-4">
                <VAvatar :color="program.color" size="64" class="mb-4">
                  <VIcon :icon="program.icon" size="32" />
                </VAvatar>
                <h4 class="text-h5 font-weight-bold mb-2">{{ program.title }}</h4>
                <VDivider />
              </div>

              <VCardText class="pa-6 pt-2">
                <div class="activities-list">
                  <div v-for="(activity, activityIdx) in program.activities" :key="activityIdx"
                    class="activity-item d-flex align-start mb-3">
                    <VIcon icon="tabler-check" size="16" :color="program.color" class="me-3 mt-1 flex-shrink-0" />
                    <span class="text-body-2 text-medium-emphasis">{{ activity }}</span>
                  </div>
                </div>
              </VCardText>

              <!-- Decorative element -->
              <div class="program-decoration" :style="{ backgroundColor: `rgb(var(--v-theme-${program.color}))` }">
              </div>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.intro-section {
  padding-block: 2rem;
  
  .value-card {
    transition: all 0.3s ease;
    border-radius: 16px;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
}

.vision-mission-section {
  padding-block: 6rem;
  
  .vision-card, .mission-card {
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
  
  .mission-item {
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateX(8px);
    }
  }
}

.programs-section {
  padding-block: 6rem;
  
  .program-card {
    transition: all 0.3s ease;
    border-radius: 16px;
    
    &:hover {
      transform: translateY(-8px);
    }
    
    .program-decoration {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 60px;
      height: 60px;
      opacity: 0.1;
      border-radius: 50% 0 0 0;
    }
  }
  
  .activity-item {
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateX(4px);
    }
  }
}

@media (max-width: 960px) {
  .intro-section {
    padding-block: 1rem;
    
    .d-flex.flex-wrap {
      flex-direction: column;
      
      .v-btn {
        width: 100%;
      }
    }
  }
  
  .vision-mission-section,
  .programs-section {
    padding-block: 4rem;
  }
}

@media (max-width: 600px) {
  .intro-section {
    .v-card .pa-8 {
      padding: 1.5rem !important;
    }
  }
  
  .vision-mission-section,
  .programs-section {
    padding-block: 3rem;
  }
}
</style>
