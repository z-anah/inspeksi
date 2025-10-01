<script setup>
defineProps({
  author: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section>
    <VCard>
      <VCardText class="pa-6">
        <h3 class="text-h5 font-weight-medium mb-4">About the Author</h3>

        <div class="d-flex ga-4">
          <VAvatar :image="author.avatar" size="80" class="flex-shrink-0" />

          <div class="flex-grow-1">
            <h4 class="text-h6 font-weight-medium mb-1">{{ author.name }}</h4>
            <p class="text-body-2 text-medium-emphasis mb-3">{{ author.role }}</p>
            <p class="text-body-2 mb-4">{{ author.bio }}</p>

            <div class="d-flex ga-2">
              <VBtn v-if="author.socialLinks?.twitter" variant="outlined" size="small"
                prepend-icon="tabler-brand-twitter">
                {{ author.socialLinks.twitter }}
              </VBtn>
              <VBtn v-if="author.socialLinks?.linkedin" variant="outlined" size="small"
                prepend-icon="tabler-brand-linkedin">
                LinkedIn
              </VBtn>
            </div>
          </div>
        </div>
      </VCardText>
    </VCard>
  </section>
</template>
