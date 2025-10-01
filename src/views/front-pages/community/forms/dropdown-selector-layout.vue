<script setup>
import { ref } from 'vue'

const props = defineProps({
  forms: {
    type: Array,
    required: true
  }
})

const selectedForm = ref('')

const goToSelected = () => {
  const form = props.forms.find(f => f.id === selectedForm.value)
  if (form) {
    window.open(form.url, '_blank')
    selectedForm.value = ''
  }
}
</script>

<template>
  <VCard>
    <VCardText class="pa-6">
      <h2 class="text-h6 font-weight-medium mb-4">Dropdown selector</h2>

      <VSelect v-model="selectedForm" :items="[
        { title: 'Choose a form', value: '' },
        ...forms.map(f => ({ title: `${f.title} — ${f.category}`, value: f.id }))
      ]" item-title="title" item-value="value" variant="outlined" hide-details @update:model-value="goToSelected" />
    </VCardText>
  </VCard>
</template>
