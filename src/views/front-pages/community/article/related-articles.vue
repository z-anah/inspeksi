<script setup>
defineProps({
  articles: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section>
    <h3 class="text-h5 font-weight-medium mb-4">Related Articles</h3>

    <VRow>
      <VCol v-for="article in articles" :key="article.id" cols="12" md="6">
        <VCard class="h-100">
          <VImg :src="article.image" :alt="article.title" height="200" cover />
          <VCardText>
            <h4 class="text-h6 font-weight-medium mb-2">{{ article.title }}</h4>
            <p class="text-body-2 text-medium-emphasis mb-3">{{ article.excerpt }}</p>
            <div class="d-flex align-center justify-space-between">
              <span class="text-caption text-medium-emphasis">{{ article.date }}</span>
              <span class="text-caption text-medium-emphasis">{{ article.readingTime }}</span>
            </div>
          </VCardText>
          <VCardActions>
            <VBtn variant="text" color="primary">Read More</VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>
