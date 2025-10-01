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

const emit = defineEmits(['update:searchQuery', 'update:filterCategory', 'showModal'])

const showModal = () => {
  emit('showModal')
}
</script>

<template>
  <VCard>
    <VCardText class="pa-6">
      <div class="d-flex align-center justify-space-between flex-wrap ga-4">
        <h1 class="text-h3 font-weight-bold">Forms Hub</h1>

        <div class="d-flex ga-3 align-center flex-wrap">
          <VSelect :model-value="filterCategory" @update:model-value="$emit('update:filterCategory', $event)"
            :items="[{ title: 'All categories', value: '' }, ...categories.map(c => ({ title: c, value: c }))]"
            item-title="title" item-value="value" placeholder="All categories" variant="outlined" hide-details
            style="min-width: 160px;" />

          <VTextField :model-value="searchQuery" @update:model-value="$emit('update:searchQuery', $event)"
            placeholder="Search forms..." prepend-inner-icon="tabler-search" variant="outlined" hide-details
            style="min-width: 200px;" />

          <VBtn color="primary" variant="flat" @click="showModal">
            See Forms
          </VBtn>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>
