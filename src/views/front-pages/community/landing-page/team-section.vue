<script setup>
definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const departments = [
  {
    name: 'Bidang Pendidikan Antikorupsi',
    members: [
      'Mohammad Faiz Marasabessy',
      'M. Mahdin Arsyad',
      'Diat Setiawan'
    ],
    icon: 'tabler-school',
    color: 'primary'
  },
  {
    name: 'Bidang Kajian dan Literasi',
    members: [
      'Umu Latifah',
      'Febri Arianto',
      'Mirhan Triandi Doe'
    ],
    icon: 'tabler-book-2',
    color: 'success'
  },
  {
    name: 'Bidang Pembinaan dan Konseling',
    members: [
      'Yuwono Dwisilo Sucipto',
      'Nur Subekti',
      'Siti Fitriyati'
    ],
    icon: 'tabler-users',
    color: 'info'
  },
  {
    name: 'Bidang Organisasi dan Kerjasama',
    members: [
      'M. Adzkasyah',
      'Sumardin',
      'Igor Tamsil'
    ],
    icon: 'tabler-building-community',
    color: 'warning'
  },
  {
    name: 'Bidang Humas dan Kampanye Antikorupsi',
    members: [
      'Dudy Wahyudi Hidayat',
      'Devin Arifianto',
      'Siti Lailatun Najah Al Haolah',
      'Andrew',
      'M. Fauzi'
    ],
    icon: 'tabler-speakerphone',
    color: 'error'
  }
]
</script>

<template>
  <div class="bg-surface">
    <VContainer>
      <div class="d-flex justify-center align-center payment-card">
        <VRow class="w-100" align="stretch" justify="center">
          <VCol cols="12" class="text-center mb-6">
            <VChip color="primary" class="mb-3 text-dark font-weight-medium px-4 py-1 rounded-pill" size="small">
              Tim Kami
            </VChip>
            <h2 class="mb-4 text-h4 lg:text-h2 md:text-h3">
              Struktur Organisasi Inspeksi
            </h2>
            <p class="text-body-1 text-medium-emphasis mb-0 mx-auto" style="max-width: 600px;">
              Mengenal tim profesional yang berdedikasi dalam mewujudkan pengadaan publik yang bebas korupsi
            </p>
          </VCol>
          
          <VCol v-for="(dept, idx) in departments" :key="idx" cols="12" md="6" lg="4" class="mb-6">
            <VCard flat border class="h-100 pa-4">
              <div class="d-flex align-center mb-3">
                <VAvatar 
                  :color="dept.color" 
                  variant="tonal" 
                  size="40" 
                  class="me-3"
                >
                  <VIcon :icon="dept.icon" size="24" />
                </VAvatar>
                <h5 class="text-h6 font-weight-bold">{{ dept.name }}</h5>
              </div>
              
              <VDivider class="mb-3" />
              
              <div class="team-members">
                <div v-for="(member, memberIdx) in dept.members" :key="memberIdx" class="mb-2">
                  <div class="d-flex align-center">
                    <VIcon icon="tabler-user" size="16" class="me-2 text-medium-emphasis" />
                    <span class="text-body-2">{{ member }}</span>
                  </div>
                </div>
              </div>
            </VCard>
          </VCol>
        </VRow>
      </div>
    </VContainer>
  </div>
</template>

<style lang="scss" scoped>
.payment-card {
  margin-block: 4rem 4rem;
}

.team-members {
  min-height: 100px;
}
</style>
