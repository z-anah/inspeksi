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
  <div class="bg-surface">
    <VContainer>
      <div class="community-profile-section">
        <!-- Header -->
        <div class="text-center mb-8">
          <VChip color="primary" class="mb-3 text-dark font-weight-medium px-4 py-1 rounded-pill" size="small">
            Profil Komunitas
          </VChip>
          <h2 class="mb-4 text-h4 lg:text-h2 md:text-h3">
            Insan Pengadaan Antikorupsi (Inspeksi)
          </h2>
        </div>

        <!-- Description -->
        <VRow class="mb-8">
          <VCol cols="12">
            <VCard flat border class="pa-6">
              <div class="d-flex align-center mb-4">
                <VIcon icon="tabler-info-circle" size="24" color="primary" class="me-2" />
                <h4 class="text-h5">Deskripsi Singkat</h4>
              </div>
              <p class="text-body-1 mb-0 text-medium-emphasis">
                Insan Pengadaan Antikorupsi (Inspeksi) adalah komunitas yang beranggotakan para pelaku pengadaan dan pemerhati pengadaan publik yang menaruh perhatian serius terhadap pemberantasan korupsi dalam pengadaan publik.
              </p>
            </VCard>
          </VCol>
        </VRow>

        <!-- Vision & Mission -->
        <VRow class="mb-8">
          <VCol cols="12" md="6">
            <VCard flat border class="pa-6 h-100">
              <div class="d-flex align-center mb-4">
                <VIcon icon="tabler-eye" size="24" color="primary" class="me-2" />
                <h4 class="text-h5">Visi</h4>
              </div>
              <p class="text-body-1 mb-0 text-medium-emphasis">
                {{ visionMission.vision }}
              </p>
            </VCard>
          </VCol>
          <VCol cols="12" md="6">
            <VCard flat border class="pa-6 h-100">
              <div class="d-flex align-center mb-4">
                <VIcon icon="tabler-target" size="24" color="success" class="me-2" />
                <h4 class="text-h5">Misi</h4>
              </div>
              <div class="mission-list">
                <div v-for="(mission, idx) in visionMission.missions" :key="idx" class="d-flex align-start mb-3">
                  <VChip size="x-small" color="success" class="me-2 mt-1" style="min-width: 24px;">
                    {{ idx + 1 }}
                  </VChip>
                  <p class="text-body-2 mb-0 text-medium-emphasis">{{ mission }}</p>
                </div>
              </div>
            </VCard>
          </VCol>
        </VRow>

        <!-- Work Programs -->
        <div class="mb-8">
          <div class="text-center mb-6">
            <h3 class="text-h4 mb-2">Program Kerja</h3>
            <p class="text-body-1 text-medium-emphasis">
              Program-program strategis untuk mewujudkan visi dan misi komunitas
            </p>
          </div>
          
          <VRow>
            <VCol v-for="(program, idx) in workPrograms" :key="idx" cols="12" lg="4" class="mb-6">
              <VCard flat border class="pa-6 h-100">
                <div class="d-flex align-center mb-4">
                  <VAvatar :color="program.color" variant="tonal" size="40" class="me-3">
                    <VIcon :icon="program.icon" size="20" />
                  </VAvatar>
                  <h5 class="text-h6 font-weight-bold">{{ program.title }}</h5>
                </div>
                
                <VDivider class="mb-4" />
                
                <div class="activities-list">
                  <div v-for="(activity, activityIdx) in program.activities" :key="activityIdx" class="d-flex align-start mb-2">
                    <VIcon icon="tabler-point" size="12" :color="program.color" class="me-2 mt-1" />
                    <span class="text-body-2 text-medium-emphasis">{{ activity }}</span>
                  </div>
                </div>
              </VCard>
            </VCol>
          </VRow>
        </div>
      </div>
    </VContainer>
  </div>
</template>

<style lang="scss" scoped>
.community-profile-section {
  margin-block: 4rem 4rem;
}

.mission-list {
  .v-chip {
    font-weight: bold;
  }
}

.activities-list {
  min-height: 200px;
}

@media (max-width: 960px) {
  .community-profile-section {
    margin-block: 2rem 2rem;
  }
}
</style>
