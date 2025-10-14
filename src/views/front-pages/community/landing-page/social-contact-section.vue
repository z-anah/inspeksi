<script setup>
definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const socialLinks = [
  {
    platform: 'TikTok',
    handle: '@ins.peksi',
    icon: 'tabler-brand-tiktok',
    url: 'https://tiktok.com/@ins.peksi',
    color: '#000000'
  },
  {
    platform: 'YouTube',
    handle: '@ins_peksi',
    icon: 'tabler-brand-youtube',
    url: 'https://youtube.com/@ins_peksi',
    color: '#FF0000'
  },
  {
    platform: 'Instagram',
    handle: '@inspeksi_',
    icon: 'tabler-brand-instagram',
    url: 'https://instagram.com/inspeksi_',
    color: '#E4405F'
  },
  {
    platform: 'WhatsApp',
    handle: '+62 812 8016 2142',
    icon: 'tabler-brand-whatsapp',
    url: 'https://wa.me/6281280162142',
    color: '#25D366'
  }
]

const donationInfo = {
  bank: 'BNI',
  accountNumber: '1793100775',
  accountName: 'Insan Pengadaan Antikorupsi'
}

const openSocialLink = (url) => {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="bg-surface">
    <VContainer>
      <div class="d-flex justify-center align-center payment-card">
        <VRow class="w-100" align="center" justify="center">
          <VCol cols="12" class="text-center">
            <VChip color="primary" class="mb-3 text-dark font-weight-medium px-4 py-1 rounded-pill" size="small">
              Hubungi Kami
            </VChip>
            <h2 class="mb-4 text-h4 lg:text-h2 md:text-h3">
              Terhubung dengan Komunitas
            </h2>
            <p class="text-body-2 text-medium-emphasis mb-6 mx-auto" style="max-width: 600px;">
              Ikuti media sosial kami dan bergabunglah dalam percakapan tentang antikorupsi
            </p>
          </VCol>
          
          <!-- Social Media Links -->
          <VCol cols="12" class="mb-6">
            <VRow justify="center" class="g-3">
              <VCol v-for="social in socialLinks" :key="social.platform" cols="12" sm="6" md="3">
                <VCard 
                  flat 
                  border 
                  class="text-center pa-3 h-100 cursor-pointer hover-card"
                  @click="openSocialLink(social.url)"
                >
                  <VIcon 
                    :icon="social.icon" 
                    size="40" 
                    :color="social.color" 
                    class="mb-2"
                  />
                  <h6 class="text-subtitle-1 mb-1">{{ social.platform }}</h6>
                  <p class="text-body-2 text-medium-emphasis mb-0">{{ social.handle }}</p>
                </VCard>
              </VCol>
            </VRow>
          </VCol>

          <!-- Donation Information -->
          <VCol cols="12" md="8">
            <VCard flat border class="pa-4 text-center">
              <VIcon icon="tabler-heart-handshake" size="40" color="primary" class="mb-3" />
              <h4 class="text-h5 mb-2">Dukung Gerakan Antikorupsi</h4>
              <p class="text-body-2 text-medium-emphasis mb-3">
                Kontribusi untuk kegiatan Insan Pengadaan Antikorupsi dapat disampaikan melalui:
              </p>
              <VCard variant="tonal" color="primary" class="pa-3">
                <div class="d-flex align-center justify-center flex-wrap gap-2">
                  <VChip color="primary" size="small">{{ donationInfo.bank }}</VChip>
                  <span class="text-h6 font-weight-bold">{{ donationInfo.accountNumber }}</span>
                </div>
                <p class="text-body-2 mb-0 mt-2">a.n. {{ donationInfo.accountName }}</p>
              </VCard>
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

.hover-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
}
</style>
