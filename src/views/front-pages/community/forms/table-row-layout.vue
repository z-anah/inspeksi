<script setup>
defineProps({
  forms: {
    type: Array,
    required: true
  }
})

const headers = [
  { title: 'Form', key: 'form', sortable: false },
  { title: 'Purpose', key: 'category' },
  { title: 'Action', key: 'actions', sortable: false }
]
</script>

<template>
  <VCard>
    <VCardText class="pa-6">
      <h2 class="text-h6 font-weight-medium mb-4">Table row</h2>

      <VDataTable :headers="headers" :items="forms" item-key="id" class="text-no-wrap" hide-default-footer
        :items-per-page="-1">
        <template #item.form="{ item }">
          <div class="d-flex align-center ga-2">
            <VImg :src="item.image" :alt="item.title" width="40" height="40" class="rounded" cover />
            <span class="text-body-2">{{ item.title }}</span>
          </div>
        </template>

        <template #item.category="{ item }">
          <span class="text-body-2 text-medium-emphasis">{{ item.category }}</span>
        </template>

        <template #item.actions="{ item }">
          <VBtn :href="item.url" target="_blank" rel="noopener" color="primary" variant="text" size="small">
            Go to Form
          </VBtn>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>
