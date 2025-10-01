<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  forms: {
    type: Array,
    required: true
  },
  categories: {
    type: Array,
    required: true
  }
})

const activeTab = ref('All')
const tabs = computed(() => ['All', ...props.categories])

const filteredForms = computed(() => {
  if (activeTab.value === 'All') return props.forms
  return props.forms.filter(form => form.category === activeTab.value)
})
</script>

<template>
  <VCard>
    <VCardText class="pa-6">
      <h2 class="text-h6 font-weight-medium mb-4">Tabbed navigation</h2>

      <VTabs v-model="activeTab" class="mb-4">
        <VTab v-for="tab in tabs" :key="tab" :value="tab">
          {{ tab }}
        </VTab>
      </VTabs>

      <div class="d-flex flex-column ga-2">
        <VCard v-for="form in filteredForms" :key="'tab-' + form.id" variant="outlined">
          <VCardText class="d-flex ga-3 align-center pa-4">
            <VImg :src="form.image" :alt="form.title" width="48" height="48" class="rounded" cover />

            <div class="flex-grow-1">
              <h4 class="text-body-1 font-weight-medium">{{ form.title }}</h4>
              <p class="text-caption text-medium-emphasis">{{ form.category }}</p>
            </div>

            <VBtn :href="form.url" target="_blank" rel="noopener" color="primary" variant="text" size="small">
              Open
            </VBtn>
          </VCardText>
        </VCard>
      </div>
    </VCardText>
  </VCard>
</template>
