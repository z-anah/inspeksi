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
    <h2 class="text-h4 font-weight-medium mb-4">Product List</h2>
    <div class="d-flex flex-column ga-4">
      <VCard v-for="product in products" :key="'list-' + product.id">
        <VCardText class="d-flex ga-4">
          <VImg :src="product.image" :alt="product.name" width="150" height="120" class="rounded flex-shrink-0" cover />

          <div class="flex-grow-1">
            <div class="d-flex align-start justify-space-between mb-2">
              <h3 class="text-h6 font-weight-medium">{{ product.name }}</h3>
              <VChip size="small" variant="tonal">{{ product.category }}</VChip>
            </div>

            <p class="text-body-2 text-medium-emphasis mb-3">{{ product.description }}</p>

            <div class="d-flex align-center mb-3">
              <VRating :model-value="product.rating" readonly size="small" color="warning" class="me-2" />
              <span class="text-caption">({{ product.reviews }} reviews)</span>
            </div>

            <div class="d-flex align-center justify-space-between">
              <div>
                <span class="text-h6 text-primary">${{ product.price }}</span>
                <span v-if="product.originalPrice > product.price"
                  class="text-decoration-line-through text-medium-emphasis ms-2">
                  ${{ product.originalPrice }}
                </span>
              </div>

              <VBtn color="primary" variant="flat" :disabled="!product.inStock">
                {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
              </VBtn>
            </div>
          </div>
        </VCardText>
      </VCard>
    </div>
  </section>
</template>
