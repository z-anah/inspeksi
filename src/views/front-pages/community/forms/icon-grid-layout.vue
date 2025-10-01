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
      <h2 class="text-h6 font-weight-medium mb-4">Icon grid</h2>

      <VRow>
        <VCol v-for="form in forms" :key="'icon-' + form.id" cols="4">
          <VCard variant="outlined" class="text-center pa-3">
            <VImg :src="form.image" :alt="form.title" height="80" class="rounded mb-2" cover />

            <div class="text-body-2 font-weight-medium">{{ form.title }}</div>
          </VCard>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
