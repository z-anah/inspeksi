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
    <h2 class="text-h4 font-weight-medium mb-4">Product Comparison</h2>

    <VCard>
      <VCardText class="pa-6">
        <VRow>
          <VCol v-for="product in products" :key="'compare-' + product.id" cols="12" :md="12 / products.length">
            <div class="text-center">
              <VImg :src="product.image" :alt="product.name" height="200" class="rounded mb-4" cover />

              <h4 class="text-h6 font-weight-medium mb-2">{{ product.name }}</h4>

              <VChip :color="product.inStock ? 'success' : 'error'" size="small" class="mb-3">
                {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
              </VChip>

              <div class="mb-3">
                <VRating :model-value="product.rating" readonly size="small" color="warning" />
                <div class="text-caption">({{ product.reviews }})</div>
              </div>

              <div class="mb-4">
                <div class="text-h5 text-primary">${{ product.price }}</div>
                <div v-if="product.originalPrice > product.price"
                  class="text-decoration-line-through text-medium-emphasis">
                  ${{ product.originalPrice }}
                </div>
              </div>

              <VBtn color="primary" variant="flat" size="small" :disabled="!product.inStock" block>
                Add to Cart
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </section>
</template>
