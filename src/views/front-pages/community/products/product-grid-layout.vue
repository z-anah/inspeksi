<script setup>
defineProps({
  products: {
    type: Array,
    required: true
  },
  cart: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['add-to-cart'])

const handleAddToCart = (product) => {
  emit('add-to-cart', product, 1)
}
</script>

<template>
  <section>
    <VRow>
      <VCol v-for="product in products" :key="'grid-' + product.id" cols="12" sm="6" md="4">
        <VCard class="h-100">
          <div class="position-relative">
            <VImg :src="product.image" :alt="product.name" height="200" cover />
            <VChip v-if="!product.inStock" color="error" size="small" class="position-absolute"
              style="top: 8px; right: 8px;">
              Out of Stock
            </VChip>
            <VChip v-else-if="product.featured" color="primary" size="small" class="position-absolute"
              style="top: 8px; right: 8px;">
              Featured
            </VChip>
          </div>

          <VCardText>
            <h3 class="text-h6 font-weight-medium mb-2">{{ product.name }}</h3>
            <p class="text-body-2 text-medium-emphasis mb-3">{{ product.description }}</p>

            <div class="d-flex align-center mb-3">
              <VRating :model-value="product.rating" readonly size="small" color="warning" class="me-2" />
              <span class="text-caption">({{ product.reviews }})</span>
            </div>

            <div class="d-flex align-center justify-space-between mb-3">
              <div>
                <span class="text-h6 text-primary">Rp {{ new Intl.NumberFormat('id-ID').format(product.price) }}</span>
                <span v-if="product.originalPrice > product.price"
                  class="text-decoration-line-through text-medium-emphasis ms-2">
                  Rp {{ new Intl.NumberFormat('id-ID').format(product.originalPrice) }}
                </span>
              </div>
            </div>
          </VCardText>

          <VCardActions>
            <VBtn 
              color="primary" 
              variant="flat" 
              block 
              :disabled="!product.inStock"
              @click="handleAddToCart(product)"
            >
              {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>
