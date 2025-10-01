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
    <h2 class="text-h4 font-weight-medium mb-4">Product Card Variations</h2>

    <VRow>
      <!-- Compact Card -->
      <VCol cols="12" md="3">
        <h4 class="text-h6 font-weight-medium mb-3">Compact Cards</h4>
        <div class="d-flex flex-column ga-3">
          <VCard v-for="product in products.slice(0, 2)" :key="'compact-' + product.id" variant="outlined">
            <VCardText class="pa-3">
              <div class="d-flex ga-3">
                <VImg :src="product.image" :alt="product.name" width="50" height="50" class="rounded" cover />
                <div class="flex-grow-1">
                  <div class="text-body-2 font-weight-medium">{{ product.name }}</div>
                  <div class="text-primary font-weight-bold">${{ product.price }}</div>
                </div>
              </div>
            </VCardText>
          </VCard>
        </div>
      </VCol>

      <!-- Detailed Card -->
      <VCol cols="12" md="6">
        <h4 class="text-h6 font-weight-medium mb-3">Detailed Card</h4>
        <VCard v-if="products[0]">
          <VImg :src="products[0].image" :alt="products[0].name" height="200" cover />

          <VCardText>
            <div class="d-flex align-center justify-space-between mb-2">
              <h4 class="text-h6 font-weight-medium">{{ products[0].name }}</h4>
              <VChip size="small" variant="tonal">{{ products[0].category }}</VChip>
            </div>

            <p class="text-body-2 text-medium-emphasis mb-3">{{ products[0].description }}</p>

            <div class="d-flex align-center mb-3">
              <VRating :model-value="products[0].rating" readonly size="small" color="warning" class="me-2" />
              <span class="text-caption">({{ products[0].reviews }} reviews)</span>
            </div>

            <div class="d-flex align-center justify-space-between">
              <div>
                <span class="text-h6 text-primary">${{ products[0].price }}</span>
                <span v-if="products[0].originalPrice > products[0].price"
                  class="text-decoration-line-through text-medium-emphasis ms-2">
                  ${{ products[0].originalPrice }}
                </span>
              </div>
              <VBtn color="primary" variant="flat">Add to Cart</VBtn>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Minimal Card -->
      <VCol cols="12" md="3">
        <h4 class="text-h6 font-weight-medium mb-3">Minimal Cards</h4>
        <div class="d-flex flex-column ga-3">
          <VCard v-for="product in products.slice(2, 4)" :key="'minimal-' + product.id" variant="text"
            class="text-center">
            <VImg :src="product.image" :alt="product.name" height="120" class="rounded mb-2" cover />
            <div class="text-body-2 font-weight-medium mb-1">{{ product.name }}</div>
            <div class="text-primary font-weight-bold">${{ product.price }}</div>
          </VCard>
        </div>
      </VCol>
    </VRow>
  </section>
</template>
