<script setup>
import { useRouter } from 'vue-router'

defineProps({
  navigation: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const navigateToArticle = async (articleId) => {
  await router.push(`/articles/${articleId}`)
  // Force page refresh to reload content
  router.go(0)
}
</script>

<template>
  <section>
    <VRow>
      <VCol v-if="navigation.previous" cols="12" md="6">
        <VCard 
          class="h-100 cursor-pointer" 
          hover
          @click="navigateToArticle(navigation.previous.id)"
        >
          <VCardText class="d-flex ga-3">
            <div style="width: 60px; height: 60px;">
              <VImg :src="navigation.previous.image" :alt="navigation.previous.title" width="60" height="60"
                class="flex-shrink-0 rounded" cover />
            </div>
            <div class="flex-grow-1 text-right">
              <p class="text-caption text-medium-emphasis mb-1">Previous Article</p>
              <h4 class="text-body-1 font-weight-medium">{{ navigation.previous.title }}</h4>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol v-if="navigation.next" cols="12" md="6">
        <VCard 
          class="h-100 cursor-pointer" 
          hover
          @click="navigateToArticle(navigation.next.id)"
        >
          <VCardText class="d-flex ga-3">
            <div class="flex-grow-1">
              <p class="text-caption text-medium-emphasis mb-1">Next Article</p>
              <h4 class="text-body-1 font-weight-medium">{{ navigation.next.title }}</h4>
            </div>
            <div style="width: 60px; height: 60px;">
              <VImg :src="navigation.next.image" :alt="navigation.next.title" width="60" height="60"
                class="flex-shrink-0 rounded" cover />
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
