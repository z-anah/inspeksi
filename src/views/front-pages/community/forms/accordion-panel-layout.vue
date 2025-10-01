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
      <h2 class="text-h6 font-weight-medium mb-4">Accordion panel</h2>

      <VExpansionPanels>
        <VExpansionPanel v-for="form in forms" :key="'acc-' + form.id">
          <VExpansionPanelTitle>
            <span class="font-weight-medium">{{ form.title }}</span>
          </VExpansionPanelTitle>

          <VExpansionPanelText>
            <div class="d-flex flex-column ga-3">
              <VImg :src="form.image" :alt="form.title" height="112" class="rounded" cover />

              <p class="text-body-2 text-medium-emphasis">{{ form.description }}</p>

              <VBtn :href="form.url" target="_blank" rel="noopener" color="primary" variant="text" size="small"
                class="align-self-start">
                Open Form
              </VBtn>
            </div>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCardText>
  </VCard>
</template>
