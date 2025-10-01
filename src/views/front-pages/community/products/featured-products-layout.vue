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
    <h2 class="text-h4 font-weight-medium mb-4">Featured Products</h2>

    <VRow>
      <VCol v-for="product in products" :key="'featured-' + product.id" cols="12" md="6">
        <VCard class="overflow-hidden">
          <div class="position-relative">
            <VImg :src="product.image" :alt="product.name" height="250" cover>
              <VOverlay contained class="d-flex flex-column justify-end align-start pa-6"
                gradient="to top, rgba(0,0,0,.7), transparent">
                <VChip color="warning" size="small" class="mb-2">Featured</VChip>
                <h3 class="text-h5 font-weight-bold text-white mb-2">{{ product.name }}</h3>
                <p class="text-body-2 text-white opacity-90 mb-3">{{ product.description }}</p>
                <div class="d-flex align-center justify-space-between w-100">
                  <span class="text-h6 text-white">${{ product.price }}</span>
                  <VBtn color="primary" variant="flat">Add to Cart</VBtn>
                </div>
              </VOverlay>
            </VImg>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>
