<script setup>
import { ref } from 'vue';

const props = defineProps({
  articles: {
    type: Array,
    required: true
  },
  categories: {
    type: Array,
    required: true
  }
})

const activeTab = ref(0)
</script>

<template>
  <section>

    <VTabs v-model="activeTab" class="mb-4 v-tabs-pill">
      <VTab>All Articles</VTab>
      <VTab v-for="category in categories" :key="category">{{ category }}</VTab>
    </VTabs>

    <VTabsWindow v-model="activeTab">
      <!-- All Articles Tab -->
      <VTabsWindowItem>
        <div class="d-flex flex-column ga-4">
          <VCard v-for="article in articles" :key="'tab-all-' + article.id">
            <VCardText class="d-flex ga-4">
              <div style="width: 128px; height: 96px;">
                <VImg :src="article.image" :alt="article.title" width="128" height="96" class="flex-shrink-0 rounded"
                  cover />
              </div>
              <div>
                <h3 class="text-h6 font-weight-medium">{{ article.title }}</h3>
                <p class="text-medium-emphasis text-caption">{{ article.date }}</p>
                <p class="text-body-2">{{ article.excerpt }}</p>
              </div>
            </VCardText>
          </VCard>
        </div>
      </VTabsWindowItem>

      <!-- Category Tabs -->
      <VTabsWindowItem v-for="category in categories" :key="category">
        <div class="d-flex flex-column ga-4">
          <VCard v-for="article in articles.slice(0, 2)" :key="'tab-' + category + '-' + article.id">
            <VCardText class="d-flex ga-4">
              <div style="width: 128px; height: 96px;">
                <VImg :src="article.image" :alt="article.title" width="128" height="96" class="flex-shrink-0 rounded"
                  cover />
              </div>
              <div>
                <VChip size="x-small" class="mb-1">{{ category }}</VChip>
                <h3 class="text-h6 font-weight-medium">{{ article.title }}</h3>
                <p class="text-medium-emphasis text-caption">{{ article.date }}</p>
                <p class="text-body-2">{{ article.excerpt }}</p>
              </div>
            </VCardText>
          </VCard>
        </div>
      </VTabsWindowItem>
    </VTabsWindow>
  </section>
</template>
