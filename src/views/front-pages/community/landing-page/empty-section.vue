<script setup>
definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

</script>

<template>
  <VContainer>
    <div class="d-flex justify-center align-center payment-card">
      <VRow class="w-100" align="center" justify="center">
        <VCol cols="12" class="text-center">
          <VIcon icon="tabler-building-community" size="64" class="text-primary mb-4" />
          <h3 class="text-h4 mb-2">Konten Segera Hadir</h3>
          <p class="text-body-1 text-medium-emphasis">
            Bagian ini sedang dalam pengembangan untuk memberikan konten terbaik bagi komunitas.
          </p>
        </VCol>
      </VRow>
    </div>
  </VContainer>
</template>

<style lang="scss" scoped>
.payment-card {
  margin-block: 10.5rem 5.25rem;
}
</style>
