<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const route = useRoute()

const shareUrls = computed(() => {
  const currentUrl = window.location.href
  const title = encodeURIComponent(props.article.title)
  
  return {
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`
  }
})

const handleShare = (platform) => {
  window.open(shareUrls.value[platform], '_blank', 'width=600,height=400')
}
</script>

<template>
  <section>
    <VCard>
      <VCardText class="pa-6">
        <div class="d-flex justify-space-between align-center flex-wrap ga-4">
          <div class="d-flex align-center ga-4">
            <!-- views -->
            <div class="d-flex align-center ga-2">
              <VBtn icon="tabler-eye" variant="outlined" size="small" />
              <span class="text-body-2">{{ article.views.toLocaleString() }} views</span>
            </div>

            <div class="d-flex align-center ga-2">
              <VBtn icon="tabler-heart" variant="outlined" size="small" />
              <span class="text-body-2">{{ article.likes.toLocaleString() }} likes</span>
            </div>

            <div class="d-flex align-center ga-2">
              <VBtn icon="tabler-share" variant="outlined" size="small" />
              <span class="text-body-2">{{ article.shares }} shares</span>
            </div>
          </div>

          <div class="d-flex ga-2">
            <VBtn 
              icon="tabler-brand-twitter" 
              variant="tonal" 
              size="small" 
              color="info"
              @click="handleShare('twitter')"
            />
            <VBtn 
              icon="tabler-brand-facebook" 
              variant="tonal" 
              size="small" 
              color="primary"
              @click="handleShare('facebook')"
            />
            <VBtn 
              icon="tabler-brand-linkedin" 
              variant="tonal" 
              size="small" 
              color="info"
              @click="handleShare('linkedin')"
            />
          </div>
        </div>
      </VCardText>
    </VCard>
  </section>
</template>
