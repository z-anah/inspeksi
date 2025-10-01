<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  searchQuery: {
    type: String,
    default: ''
  },
  filterCategory: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:searchQuery', 'update:filterCategory'])

</script>

<template>
  <VCard>

    <VCardText class="pa-6">
      <h4 class="text-h6 font-weight-medium mb-4">Search Forms</h4>
      <VTextField :model-value="searchQuery" @update:model-value="$emit('update:searchQuery', $event)"
        placeholder="Search forms..." prepend-inner-icon="tabler-search" variant="outlined" hide-details />
    </VCardText>
  </VCard>
</template>
