<script setup>
import { computed } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  forms: {
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

const popularForms = computed(() =>
  props.forms.slice(0, 5).map(form => ({
    ...form,
    isPopular: true
  }))
)

const categoryCounts = computed(() => {
  const counts = {}
  props.forms.forEach(form => {
    counts[form.category] = (counts[form.category] || 0) + 1
  })
  return counts
})

const clearAllFilters = () => {
  emit('update:searchQuery', '')
  emit('update:filterCategory', '')
}

const hasActiveFilters = computed(() => props.searchQuery || props.filterCategory)
</script>

<template>
  <div class="d-flex flex-column ga-6" style="position: sticky; top: 2rem;">
    <!-- Search -->
    <VCard>
      <VCardText class="pa-6">
        <h3 class="text-h6 font-weight-medium mb-4">
          <VIcon icon="tabler-search" class="me-2" />
          Search Forms
        </h3>

        <VTextField :model-value="searchQuery" @update:model-value="$emit('update:searchQuery', $event)"
          placeholder="Search by title or description..." prepend-inner-icon="tabler-search" variant="outlined"
          hide-details clearable />
      </VCardText>
    </VCard>

    <!-- Quick Filters -->
    <VCard>
      <VCardText class="pa-6">
        <div class="d-flex align-center justify-space-between mb-4">
          <h3 class="text-h6 font-weight-medium">
            <VIcon icon="tabler-filter" class="me-2" />
            Filters
          </h3>

          <VBtn v-if="hasActiveFilters" variant="text" size="small" color="error" @click="clearAllFilters">
            Clear All
          </VBtn>
        </div>

        <div class="mb-4">
          <VSelect :model-value="filterCategory" @update:model-value="$emit('update:filterCategory', $event)" :items="[
            { title: 'All Categories', value: '' },
            ...categories.map(cat => ({
              title: `${cat} (${categoryCounts[cat] || 0})`,
              value: cat
            }))
          ]" item-title="title" item-value="value" label="Category" variant="outlined" hide-details />
        </div>

        <!-- Active Filters Display -->
        <div v-if="hasActiveFilters" class="d-flex flex-wrap ga-2">
          <VChip v-if="searchQuery" size="small" closable @click:close="$emit('update:searchQuery', '')">
            Search: "{{ searchQuery }}"
          </VChip>

          <VChip v-if="filterCategory" size="small" closable @click:close="$emit('update:filterCategory', '')">
            Category: {{ filterCategory }}
          </VChip>
        </div>
      </VCardText>
    </VCard>

    <!-- Popular Forms -->
    <VCard>
      <VCardText class="pa-6">
        <h3 class="text-h6 font-weight-medium mb-4">
          <VIcon icon="tabler-trending-up" class="me-2" />
          Popular Forms
        </h3>

        <VList class="pa-0">
          <VListItem v-for="form in popularForms" :key="'popular-' + form.id" class="pa-0 mb-3">
            <template #prepend>
              <VImg :src="form.image" :alt="form.title" width="40" height="40" class="rounded me-3" cover />
            </template>

            <VListItemTitle class="text-body-2 font-weight-medium">
              {{ form.title }}
            </VListItemTitle>
            <VListItemSubtitle>
              <VChip size="x-small" variant="tonal">{{ form.category }}</VChip>
            </VListItemSubtitle>

            <template #append>
              <VBtn :href="form.url" target="_blank" rel="noopener" icon="tabler-external-link" variant="text"
                size="small" />
            </template>
          </VListItem>
        </VList>
      </VCardText>
    </VCard>

    <!-- Category Overview -->
    <VCard>
      <VCardText class="pa-6">
        <h3 class="text-h6 font-weight-medium mb-4">
          <VIcon icon="tabler-category" class="me-2" />
          Categories
        </h3>

        <div class="d-flex flex-column ga-2">
          <div v-for="category in categories" :key="category"
            class="d-flex align-center justify-space-between pa-2 rounded cursor-pointer"
            :class="{ 'bg-primary-lighten-5': filterCategory === category }"
            @click="$emit('update:filterCategory', category)">
            <span class="text-body-2">{{ category }}</span>
            <VChip size="x-small" variant="tonal">{{ categoryCounts[category] || 0 }}</VChip>
          </div>
        </div>
      </VCardText>
    </VCard>

    <!-- Quick Actions -->
    <VCard>
      <VCardText class="pa-6">
        <h3 class="text-h6 font-weight-medium mb-4">
          <VIcon icon="tabler-lightning" class="me-2" />
          Quick Actions
        </h3>

        <div class="d-flex flex-column ga-2">
          <VBtn variant="outlined" prepend-icon="tabler-download" block>
            Download All Forms
          </VBtn>

          <VBtn variant="outlined" prepend-icon="tabler-help" block>
            Get Help
          </VBtn>

          <VBtn variant="outlined" prepend-icon="tabler-phone" block>
            Contact Support
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>
