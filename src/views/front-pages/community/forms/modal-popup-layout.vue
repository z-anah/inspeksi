<script setup>
import { ref } from 'vue'

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

const showModal = ref(false)

const formsByCategory = (category) => {
  return props.forms.filter(f => f.category === category)
}
</script>

<template>
  <VCard>
    <VCardText class="pa-6">
      <h2 class="text-h6 font-weight-medium mb-4">Modal popup</h2>

      <VBtn color="primary" variant="flat" @click="showModal = true">
        Open Directory
      </VBtn>

      <VDialog v-model="showModal" max-width="800">
        <VCard>
          <VCardTitle class="d-flex align-center justify-space-between pa-6">
            <h3 class="text-h5 font-weight-medium">Forms Directory</h3>
            <VBtn icon="tabler-x" variant="text" size="small" @click="showModal = false" />
          </VCardTitle>

          <VCardText class="pa-6 pt-0">
            <VRow>
              <VCol v-for="category in categories" :key="'cat-' + category" cols="12" md="6">
                <div class="mb-4">
                  <h4 class="text-h6 font-weight-medium mb-3">{{ category }}</h4>

                  <VList class="pa-0">
                    <VListItem v-for="form in formsByCategory(category)" :key="'m-' + form.id" class="pa-0 mb-2">
                      <template #prepend>
                        <VImg :src="form.image" :alt="form.title" width="40" height="40" class="rounded" cover />
                      </template>

                      <VListItemTitle>
                        <a :href="form.url" target="_blank" rel="noopener" class="text-primary text-decoration-none">
                          {{ form.title }}
                        </a>
                      </VListItemTitle>
                    </VListItem>
                  </VList>
                </div>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VDialog>
    </VCardText>
  </VCard>
</template>
