<script setup>
import { ref } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  filters: {
    type: Object,
    required: true
  },
  searchQuery: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:searchQuery'])

const localSearchQuery = ref(props.searchQuery)
const selectedCategories = ref([])
const priceRange = ref([0, 200])
const inStockOnly = ref(false)
const featuredOnly = ref(false)
const minRating = ref(0)

const updateSearch = (value) => {
  localSearchQuery.value = value
  emit('update:searchQuery', value)
}
</script>

<template>
  <div class="d-flex flex-column ga-6" style="position: sticky; top: 2rem;">
    <!-- Search -->
    <VCard>
      <VCardText class="pa-6">
        <h4 class="text-h6 font-weight-medium mb-4">Search Products</h4>
        <VTextField :model-value="localSearchQuery" @update:model-value="updateSearch" placeholder="Search products..."
          prepend-inner-icon="tabler-search" variant="outlined" hide-details />
      </VCardText>
    </VCard>

    <!-- Price Range -->
    <VCard>
      <VCardText class="pa-6">
        <h4 class="text-h6 font-weight-medium mb-4">Price Range</h4>
        <VRangeSlider v-model="priceRange" :max="200" :min="0" :step="5" color="primary" class="mb-4" />
        <div class="d-flex justify-space-between">
          <span class="text-body-2">${{ priceRange[0] }}</span>
          <span class="text-body-2">${{ priceRange[1] }}</span>
        </div>
      </VCardText>
    </VCard>

    <!-- Filters -->
    <VCard>
      <VCardText class="pa-6">
        <h4 class="text-h6 font-weight-medium mb-4">Filters</h4>

        <div class="mb-4">
          <label class="text-body-2 font-weight-medium mb-2 d-block">Minimum Rating</label>
          <VRating v-model="minRating" color="warning" size="small" />
        </div>
      </VCardText>
    </VCard>
  </div>
</template>
