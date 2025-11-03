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

const scrollToHeading = (anchor) => {
  const element = document.querySelector(anchor)
  if (element) {
    const navbarHeight = 80 // Adjust this value based on your navbar height
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset / 1.03
    const offsetPosition = elementPosition - navbarHeight
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <div class="d-flex flex-column ga-6 position-sticky" style="top: 2rem;">
    <!-- Table of Contents -->
    <VCard v-if="tableOfContents.length > 0">
      <VCardText class="pa-6">
        <h4 class="text-h6 font-weight-medium mb-4">Daftar Isi</h4>
        <VList class="pa-0">
          <VListItem 
            v-for="item in tableOfContents" 
            :key="item.anchor" 
            class="pa-2 text-body-2 cursor-pointer"
            :style="{ paddingLeft: `${16 + item.indent}px` }"
            @click="scrollToHeading(item.anchor)"
          >
            <span :class="['text-high-emphasis', item.level === 1 ? 'font-weight-medium' : '']">
              {{ item.title }}
            </span>
          </VListItem>
        </VList>
      </VCardText>
    </VCard>

    <!-- Article Stats -->
    <VCard>
      <VCardText class="pa-6">
        <h4 class="text-h6 font-weight-medium mb-4">Statistik Artikel</h4>
        <div class="d-flex flex-column ga-3">
          <div class="d-flex justify-space-between">
            <span class="text-body-2">Tampilan</span>
            <span class="font-weight-medium">{{ article.views }}</span>
          </div>
          <div class="d-flex justify-space-between">
            <span class="text-body-2">Suka</span>
            <span class="font-weight-medium">{{ article.likes }}</span>
          </div>
          <div class="d-flex justify-space-between">
            <span class="text-body-2">Bagikan</span>
            <span class="font-weight-medium">{{ article.shares }}</span>
          </div>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>
