<script setup>
const props = defineProps({
  forms: {
    type: Array,
    required: true
  },
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
      <h2 class="text-h6 font-weight-medium mb-4">Filterable search bar</h2>

      <div class="d-flex ga-2 mb-4">
        <VTextField :model-value="searchQuery" @update:model-value="$emit('update:searchQuery', $event)"
          placeholder="Search..." variant="outlined" hide-details class="flex-grow-1" />

        <VSelect :model-value="filterCategory" @update:model-value="$emit('update:filterCategory', $event)"
          :items="[{ title: 'All', value: '' }, ...categories.map(c => ({ title: c, value: c }))]" item-title="title"
          item-value="value" variant="outlined" hide-details style="min-width: 120px;" />
      </div>

      <div class="d-flex flex-column ga-2">
        <VCard v-for="form in forms.slice(0, 10)" :key="'s-' + form.id" variant="outlined">
          <VCardText class="d-flex ga-3 align-center pa-4">
            <VImg :src="form.image" :alt="form.title" width="48" height="48" class="rounded" cover />

            <div class="flex-grow-1">
              <h4 class="text-body-1 font-weight-medium">{{ form.title }}</h4>
              <p class="text-caption text-medium-emphasis">{{ form.description }}</p>
            </div>

            <VBtn :href="form.url" target="_blank" rel="noopener" color="success" variant="text" size="small">
              Open
            </VBtn>
          </VCardText>
        </VCard>
      </div>
    </VCardText>
  </VCard>
</template>
