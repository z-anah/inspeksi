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
    <h2 class="text-h4 font-weight-medium mb-4">Product Carousel</h2>

    <VCarousel height="350" cycle :show-arrows="true" hide-delimiter-background delimiter-icon="tabler-minus">
      <VCarouselItem v-for="product in products" :key="'carousel-' + product.id">
        <VCard class="h-100">
          <VRow no-gutters class="h-100">
            <VCol cols="12" md="6">
              <VImg :src="product.image" :alt="product.name" height="350" cover />
            </VCol>
            <VCol cols="12" md="6">
              <VCardText class="pa-8 d-flex flex-column justify-center h-100">
                <VChip v-if="product.featured" color="primary" size="small" class="mb-4 align-self-start">
                  Featured
                </VChip>

                <h3 class="text-h4 font-weight-bold mb-4">{{ product.name }}</h3>
                <p class="text-body-1 mb-4">{{ product.description }}</p>

                <div class="d-flex align-center mb-4">
                  <VRating :model-value="product.rating" readonly size="small" color="warning" class="me-2" />
                  <span class="text-body-2">({{ product.reviews }} reviews)</span>
                </div>

                <div class="d-flex align-center justify-space-between mb-6">
                  <div>
                    <span class="text-h4 text-primary">${{ product.price }}</span>
                    <span v-if="product.originalPrice > product.price"
                      class="text-decoration-line-through text-medium-emphasis ms-2">
                      ${{ product.originalPrice }}
                    </span>
                  </div>
                  <VChip variant="tonal">{{ product.category }}</VChip>
                </div>

                <VBtn color="primary" variant="flat" size="large" :disabled="!product.inStock" block>
                  {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
                </VBtn>
              </VCardText>
            </VCol>
          </VRow>
        </VCard>
      </VCarouselItem>
    </VCarousel>
  </section>
</template>
