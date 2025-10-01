<script setup>
defineProps({
  forms: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <VCard>
    <VCardText class="pa-6">
      <h2 class="text-h6 font-weight-medium mb-4">List group</h2>

      <VList class="pa-0">
        <VListItem v-for="(form, index) in forms" :key="'list-' + form.id" class="pa-0 mb-2">
          <VListItemTitle>
            <span class="text-body-2 text-medium-emphasis me-2">{{ index + 1 }}.</span>
            <a :href="form.url" target="_blank" rel="noopener" class="text-primary text-decoration-none">
              {{ form.title }}
            </a>
          </VListItemTitle>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>
