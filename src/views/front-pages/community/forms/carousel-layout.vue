<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  forms: {
    type: Array,
    required: true
  }
})

const featuredIndex = ref(0)

const featured = computed(() => {
  return props.forms[featuredIndex.value % props.forms.length]
})

const prev = () => {
  featuredIndex.value = (featuredIndex.value - 1 + props.forms.length) % props.forms.length
}

const next = () => {
  featuredIndex.value = (featuredIndex.value + 1) % props.forms.length
}

onMounted(() => {
  setInterval(() => {
    next()
  }, 4000)
})
</script>

<template>
  <VCard>
    <VCardText class="pa-6">
      <h2 class="text-h6 font-weight-medium mb-4">Carousel</h2>

      <div class="position-relative">
        <VCard variant="outlined" class="text-center pa-6" style="height: 200px;">
          <div class="d-flex flex-column align-center justify-center h-100">
            <VImg :src="featured.image" :alt="featured.title" width="100%" height="80" class="rounded mb-3" cover />

            <h3 class="text-h6 font-weight-medium mb-1">{{ featured.title }}</h3>
            <p class="text-caption text-medium-emphasis mb-2">{{ featured.category }}</p>

            <VBtn :href="featured.url" target="_blank" rel="noopener" color="primary" variant="text" size="small">
              Open
            </VBtn>
          </div>
        </VCard>

        <div class="d-flex justify-space-between mt-3">
          <VBtn variant="outlined" size="small" @click="prev">
            Prev
          </VBtn>

          <VBtn variant="outlined" size="small" @click="next">
            Next
          </VBtn>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>
