<script setup>
import { computed } from 'vue'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const tableOfContents = computed(() => {
  if (!props.article.content) return []
  
  // Create a temporary DOM parser to extract headings
  const parser = new DOMParser()
  const doc = parser.parseFromString(props.article.content, 'text/html')
  const headings = doc.querySelectorAll('h1, h2, h3')
  
  return Array.from(headings).map((heading, index) => {
    const text = heading.textContent
    const level = parseInt(heading.tagName.charAt(1))
    const anchor = `#${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
    
    return {
      title: text,
      anchor,
      level,
      indent: level > 1 ? (level - 1) * 16 : 0
    }
  })
})
</script>

<template>
  <div class="d-flex flex-column ga-6 position-sticky" style="top: 2rem;">
    <!-- Table of Contents -->
    <VCard v-if="tableOfContents.length > 0">
      <VCardText class="pa-6">
        <h4 class="text-h6 font-weight-medium mb-4">Table of Contents</h4>
        <VList class="pa-0">
          <VListItem 
            v-for="item in tableOfContents" 
            :key="item.anchor" 
            :href="item.anchor" 
            class="pa-2 text-body-2"
            :style="{ paddingLeft: `${16 + item.indent}px` }"
          >
            <span :class="item.level === 1 ? 'font-weight-medium' : ''">
              {{ item.title }}
            </span>
          </VListItem>
        </VList>
      </VCardText>
    </VCard>

    <!-- Article Stats -->
    <VCard>
      <VCardText class="pa-6">
        <h4 class="text-h6 font-weight-medium mb-4">Article Stats</h4>
        <div class="d-flex flex-column ga-3">
          <div class="d-flex justify-space-between">
            <span class="text-body-2">Views</span>
            <span class="font-weight-medium">{{ article.views }}</span>
          </div>
          <div class="d-flex justify-space-between">
            <span class="text-body-2">Likes</span>
            <span class="font-weight-medium">{{ article.likes }}</span>
          </div>
          <div class="d-flex justify-space-between">
            <span class="text-body-2">Shares</span>
            <span class="font-weight-medium">{{ article.shares }}</span>
          </div>
        </div>
      </VCardText>
    </VCard>

    <!-- Quick Actions -->
    <VCard>
      <VCardText class="pa-6">
        <h4 class="text-h6 font-weight-medium mb-4">Quick Actions</h4>
        <div class="d-flex flex-column ga-2">
          <VBtn variant="outlined" prepend-icon="tabler-bookmark">
            Bookmark
          </VBtn>
          <VBtn variant="outlined" prepend-icon="tabler-printer">
            Print
          </VBtn>
          <VBtn variant="outlined" prepend-icon="tabler-flag">
            Report
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>
