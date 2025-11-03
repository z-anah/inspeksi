<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/libs/supabase'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-stats'])

const route = useRoute()
const isLiking = ref(false)
const isSharing = ref(false)

const shareUrls = computed(() => {
  const currentUrl = window.location.href
  const title = encodeURIComponent(props.article.title)
  
  return {
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`
  }
})

const handleLike = async () => {
  if (isLiking.value) return
  
  isLiking.value = true
  try {
    const newLikes = props.article.likes + 1
    
    const { error } = await supabase
      .from('articles')
      .update({ likes: newLikes })
      .eq('id', props.article.id)
    
    if (!error) {
      emit('update-stats', { likes: newLikes })
    }
  } catch (error) {
    console.error('Error updating likes:', error)
  } finally {
    isLiking.value = false
  }
}

const handleShare = async (platform) => {
  if (isSharing.value) return
  
  isSharing.value = true
  try {
    // Update share count
    const newShares = props.article.shares + 1
    
    const { error } = await supabase
      .from('articles')
      .update({ shares: newShares })
      .eq('id', props.article.id)
    
    if (!error) {
      emit('update-stats', { shares: newShares })
    }
    
    // Open share dialog
    window.open(shareUrls.value[platform], '_blank', 'width=600,height=400')
  } catch (error) {
    console.error('Error updating shares:', error)
  } finally {
    isSharing.value = false
  }
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
              <span class="text-body-2">{{ article.views.toLocaleString() }}</span>
            </div>

            <div class="d-flex align-center ga-2">
              <VBtn 
                icon="tabler-heart" 
                variant="outlined" 
                size="small"
                :loading="isLiking"
                @click="handleLike"
                color="error"
              />
              <span class="text-body-2">{{ article.likes.toLocaleString() }}</span>
            </div>

            <div class="d-flex align-center ga-2">
              <VBtn icon="tabler-share" variant="outlined" size="small" />
              <span class="text-body-2">{{ article.shares.toLocaleString() }}</span>
            </div>
          </div>

          <div class="d-flex ga-2">
            <VBtn 
              icon="tabler-brand-twitter" 
              variant="tonal" 
              size="small" 
              color="info"
              :loading="isSharing"
              @click="handleShare('twitter')"
            />
            <VBtn 
              icon="tabler-brand-facebook" 
              variant="tonal" 
              size="small" 
              color="primary"
              :loading="isSharing"
              @click="handleShare('facebook')"
            />
            <VBtn 
              icon="tabler-brand-linkedin" 
              variant="tonal" 
              size="small" 
              color="info"
              :loading="isSharing"
              @click="handleShare('linkedin')"
            />
          </div>
        </div>
      </VCardText>
    </VCard>
  </section>
</template>
