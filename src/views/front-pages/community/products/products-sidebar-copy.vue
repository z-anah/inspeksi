<script setup>
import { ref, watch } from 'vue'

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

const emit = defineEmits(['update:searchQuery', 'update:filters'])

const localSearchQuery = ref(props.searchQuery)
const priceRange = ref(props.filters.priceRange || [0, 1000000])
const minRating = ref(props.filters.minRating || 0)

// Format price to Rupiah
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

// Update search query
const updateSearch = (value) => {
  localSearchQuery.value = value
  emit('update:searchQuery', value)
}

// Update filters when values change
watch([priceRange, minRating], () => {
  emit('update:filters', {
    ...props.filters,
    priceRange: priceRange.value,
    minRating: minRating.value
  })
}, { deep: true })

// Watch for external filter changes
watch(() => props.filters, (newFilters) => {
  priceRange.value = newFilters.priceRange || [0, 1000000]
  minRating.value = newFilters.minRating || 0
}, { deep: true })

// Watch for external search query changes
watch(() => props.searchQuery, (newQuery) => {
  localSearchQuery.value = newQuery
})
</script>

<template>
  <div class="d-flex flex-column ga-6" style="position: sticky; top: 2rem;">
    <!-- Search -->
    <VCard>
      <VCardText class="pa-6">
        <h4 class="text-h6 font-weight-medium mb-4">Search Products</h4>
        <VTextField 
          :model-value="localSearchQuery" 
          @update:model-value="updateSearch" 
          placeholder="Search products..."
          prepend-inner-icon="tabler-search" 
          variant="outlined" 
          hide-details 
        />
      </VCardText>
    </VCard>

    <!-- Price Range -->
    <VCard>
      <VCardText class="pa-6">
        <h4 class="text-h6 font-weight-medium mb-4">Price Range</h4>
        <VRangeSlider 
          v-model="priceRange" 
          :max="1000000" 
          :min="0" 
          :step="10000" 
          color="primary" 
          class="mb-4" 
        />
        <div class="d-flex justify-space-between">
          <span class="text-body-2">Rp {{ formatPrice(priceRange[0]) }}</span>
          <span class="text-body-2">Rp {{ formatPrice(priceRange[1]) }}</span>
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
          <div class="text-caption text-medium-emphasis mt-1">
            {{ minRating === 0 ? 'All ratings' : `${minRating} stars and above` }}
          </div>
        </div>
      </VCardText>
    </VCard>

    <!-- Active Filters Summary -->
    <VCard v-if="localSearchQuery || minRating > 0 || priceRange[0] > 0 || priceRange[1] < 1000000">
      <VCardText class="pa-6">
        <h4 class="text-h6 font-weight-medium mb-4">Active Filters</h4>
        
        <div class="d-flex flex-wrap ga-2">
          <VChip 
            v-if="localSearchQuery" 
            size="small" 
            closable 
            @click:close="updateSearch('')"
          >
            Search: "{{ localSearchQuery }}"
          </VChip>
          
          <VChip 
            v-if="minRating > 0" 
            size="small" 
            closable 
            @click:close="minRating = 0"
          >
            {{ minRating }}+ stars
          </VChip>
          
          <VChip 
            v-if="priceRange[0] > 0 || priceRange[1] < 1000000" 
            size="small" 
            closable 
            @click:close="priceRange = [0, 1000000]"
          >
            Rp {{ formatPrice(priceRange[0]) }} - Rp {{ formatPrice(priceRange[1]) }}
          </VChip>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>
