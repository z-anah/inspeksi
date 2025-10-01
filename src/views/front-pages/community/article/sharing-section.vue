<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section>
    <VCard>
      <VCardText class="pa-6">
        <div class="d-flex justify-space-between align-center flex-wrap ga-4">
          <div class="d-flex align-center ga-4">
            <div class="d-flex align-center ga-2">
              <VBtn icon="tabler-heart" variant="outlined" size="small" />
              <span class="text-body-2">{{ article.likes }} likes</span>
            </div>

            <div class="d-flex align-center ga-2">
              <VBtn icon="tabler-message-circle" variant="outlined" size="small" />
              <span class="text-body-2">{{ article.comments }} comments</span>
            </div>

            <div class="d-flex align-center ga-2">
              <VBtn icon="tabler-share" variant="outlined" size="small" />
              <span class="text-body-2">{{ article.shares }} shares</span>
            </div>
          </div>

          <div class="d-flex ga-2">
            <VBtn icon="tabler-brand-twitter" variant="tonal" size="small" color="info" />
            <VBtn icon="tabler-brand-facebook" variant="tonal" size="small" color="primary" />
            <VBtn icon="tabler-brand-linkedin" variant="tonal" size="small" color="info" />
            <VBtn icon="tabler-bookmark" variant="tonal" size="small" />
          </div>
        </div>
      </VCardText>
    </VCard>
  </section>
</template>
