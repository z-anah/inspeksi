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
      <h2 class="text-h6 font-weight-medium mb-4">Card with button</h2>

      <div class="d-flex flex-column ga-4">
        <VCard v-for="form in forms" :key="form.id" variant="outlined">
          <VImg :src="form.image" :alt="form.title" height="128" cover />

          <VCardText class="d-flex flex-column">
            <h3 class="text-h6 font-weight-medium mb-2">{{ form.title }}</h3>
            <p class="text-body-2 text-medium-emphasis mb-4 flex-grow-1">{{ form.description }}</p>

            <div class="d-flex justify-end">
              <VBtn :href="form.url" target="_blank" rel="noopener" color="success" variant="flat" size="small">
                Open Form
              </VBtn>
            </div>
          </VCardText>
        </VCard>
      </div>
    </VCardText>
  </VCard>
</template>
