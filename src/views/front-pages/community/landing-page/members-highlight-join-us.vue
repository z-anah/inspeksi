<script setup>
definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

</script>

<template>
  <div class="bg-surface">
    <VContainer>
      <div class="d-flex justify-center align-center payment-card">
        <VRow class="w-100" align="center" justify="center">
          <VCol cols="12" class="text-center">
            <VChip color="primary" class="mb-3 text-dark font-weight-medium px-4 py-1 rounded-pill" size="small">
              Bergabunglah dengan Kami
            </VChip>
            <h2 class="mb-3 text-h4 lg:text-h2 md:text-h3">
              Bersama Membangun Indonesia Bebas Korupsi
            </h2>
            <p class="text-body-1 text-medium-emphasis mb-4 mx-auto" style="max-width: 600px;">
              Jadilah bagian dari gerakan besar untuk menciptakan Indonesia yang transparan, akuntabel, dan bebas dari korupsi. Setiap suara Anda berperan dalam perubahan.
            </p>
            <div class="d-flex justify-center gap-3 flex-wrap">
              <VBtn color="primary" size="default" class="px-6">
                Bergabung Sekarang
              </VBtn>
              <VBtn variant="outlined" size="default" class="px-6">
                Pelajari Lebih Lanjut
              </VBtn>
            </div>
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
</style>
