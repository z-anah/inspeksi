<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  }
})

const tableOfContents = [
  { title: 'The Digital Transformation', anchor: '#digital-transformation' },
  { title: 'Key Benefits', anchor: '#key-benefits' },
  { title: 'Implementation Strategies', anchor: '#implementation-strategies' }
]
</script>

<template>
  <div class="d-flex flex-column ga-6 position-sticky" style="top: 2rem;">
    <!-- Table of Contents -->
    <VCard>
      <VCardText class="pa-6">
        <h4 class="text-h6 font-weight-medium mb-4">Table of Contents</h4>
        <VList class="pa-0">
          <VListItem v-for="item in tableOfContents" :key="item.anchor" :href="item.anchor" class="pa-2 text-body-2">
            {{ item.title }}
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
          <div class="d-flex justify-space-between">
            <span class="text-body-2">Comments</span>
            <span class="font-weight-medium">{{ article.comments }}</span>
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
