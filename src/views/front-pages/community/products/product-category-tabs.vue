<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  categories: {
    type: Array,
    required: true
  }
})

const activeTab = ref(0)

const filteredProducts = computed(() => {
  if (activeTab.value === 0) return props.products
  const selectedCategory = props.categories[activeTab.value - 1]
  return props.products.filter(product => product.category === selectedCategory)
})
</script>

<template>
  <section>
    <h2 class="text-h4 font-weight-medium mb-4">Products by Category</h2>

    <VTabs v-model="activeTab" class="mb-6">
      <VTab>All Products</VTab>
      <VTab v-for="category in categories" :key="category">{{ category }}</VTab>
    </VTabs>

    <VTabsWindow v-model="activeTab">
      <VTabsWindowItem v-for="(tab, index) in categories.length + 1" :key="index">
        <VRow>
          <VCol v-for="product in filteredProducts" :key="'tab-' + product.id" cols="12" sm="6" md="4">
            <VCard class="h-100">
              <VImg :src="product.image" :alt="product.name" height="180" cover />

              <VCardText>
                <h4 class="text-h6 font-weight-medium mb-2">{{ product.name }}</h4>
                <div class="d-flex align-center justify-space-between mb-3">
                  <span class="text-h6 text-primary">${{ product.price }}</span>
                  <VChip size="x-small" variant="tonal">{{ product.category }}</VChip>
                </div>
              </VCardText>

              <VCardActions>
                <VBtn color="primary" variant="flat" block size="small" :disabled="!product.inStock">
                  Add to Cart
                </VBtn>
              </VCardActions>
            </VCard>
          </VCol>
        </VRow>
      </VTabsWindowItem>
    </VTabsWindow>
  </section>
</template>
