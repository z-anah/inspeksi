<script setup>
defineProps({
  products: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section>
    <h2 class="text-h4 font-weight-medium mb-4">Tampilan Masonry Produk</h2>

    <div class="masonry-container">
      <VCard v-for="product in products" :key="'masonry-' + product.id" class="masonry-item mb-4">
        <VImg :src="product.image" :alt="product.name" :height="Math.floor(Math.random() * 100) + 200" cover />

        <VCardText>
          <h4 class="text-h6 font-weight-medium mb-2">{{ product.name }}</h4>

          <div class="d-flex align-center mb-2">
            <VRating :model-value="product.rating" readonly size="x-small" color="warning" class="me-1" />
            <span class="text-caption">({{ product.reviews }})</span>
          </div>

          <div class="d-flex align-center justify-space-between">
            <span class="text-h6 text-primary">Rp {{ new Intl.NumberFormat('id-ID').format(product.price) }}</span>
            <VBtn color="primary" variant="flat" size="x-small" :disabled="!product.inStock">
              Tambah
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </div>
  </section>
</template>

<style scoped>
.masonry-container {
  columns: 3;
  column-gap: 1rem;
}

@media (max-width: 960px) {
  .masonry-container {
    columns: 2;
  }
}

@media (max-width: 600px) {
  .masonry-container {
    columns: 1;
  }
}

.masonry-item {
  break-inside: avoid;
  display: inline-block;
  width: 100%;
}
</style>
