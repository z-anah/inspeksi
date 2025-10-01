<script setup>
defineProps({
  forms: {
    type: Array,
    required: true
  }
})

const openForm = (url) => {
  window.open(url, '_blank')
}
</script>

<template>
  <VCard>
    <VCardText class="pa-6">
      <h2 class="text-h6 font-weight-medium mb-4">Tile buttons</h2>

      <VRow>
        <VCol v-for="form in forms" :key="'tile-' + form.id" cols="6">
          <VCard variant="outlined" class="cursor-pointer h-100" @click="openForm(form.url)">
            <VCardText class="pa-4">
              <VImg :src="form.image" :alt="form.title" height="80" class="rounded mb-3" cover />

              <div class="text-caption text-medium-emphasis mb-1">{{ form.category }}</div>
              <h4 class="text-body-1 font-weight-medium">{{ form.title }}</h4>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
