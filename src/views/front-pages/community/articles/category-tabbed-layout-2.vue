<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  articles: {
    type: Array,
    required: true
  },
  categories: {
    type: Array,
    required: true
  },
  searchActive: {
    type: Boolean,
    default: false
  },
  searchLoading: {
    type: Boolean,
    default: false
  }
})

const activeTab = ref(0)

const filteredArticlesByCategory = computed(() => {
  if (props.searchActive) {
    // When searching, show all filtered articles in each category tab
    return props.categories.map(category => 
      props.articles.filter(article => article.category === category)
    )
  } else {
    // Normal category filtering
    return props.categories.map(category => 
      props.articles.filter(article => article.category === category)
    )
  }
})
</script>

<template>
  <section>
    <VTabs v-model="activeTab" class="mb-4 v-tabs-pill">
      <VTab>All Articles</VTab>
      <VTab v-for="category in categories" :key="category">{{ category.toUpperCase() }}</VTab>
    </VTabs>

    <VTabsWindow v-model="activeTab">
      <!-- All Articles Tab -->
      <VTabsWindowItem>
        <div v-if="searchLoading" class="d-flex justify-center align-center py-8">
          <VProgressCircular indeterminate color="primary" size="32" />
        </div>
        
        <div v-else class="d-flex flex-column ga-4">
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
          
          <div v-if="!articles.length && searchActive" class="text-center py-8">
            <VIcon icon="tabler-search-off" size="48" class="text-medium-emphasis mb-2" />
            <p class="text-body-1 text-medium-emphasis">No articles found matching your search.</p>
          </div>
        </div>
      </VTabsWindowItem>

      <!-- Category Tabs -->
      <VTabsWindowItem v-for="(category, index) in categories" :key="category">
        <div v-if="searchLoading" class="d-flex justify-center align-center py-8">
          <VProgressCircular indeterminate color="primary" size="32" />
        </div>
        
        <div v-else class="d-flex flex-column ga-4">
          <VCard v-for="article in filteredArticlesByCategory[index]" :key="'tab-' + category + '-' + article.id">
            <VCardText class="d-flex ga-4">
              <div style="width: 128px; height: 96px;">
                <VImg :src="article.image" :alt="article.title" width="128" height="96" class="flex-shrink-0 rounded"
                  cover />
              </div>
              <div>
                <VChip size="x-small" class="mb-1">{{ category.toUpperCase() }}</VChip>
                <h3 class="text-h6 font-weight-medium">{{ article.title }}</h3>
                <p class="text-medium-emphasis text-caption">{{ article.date }}</p>
                <p class="text-body-2">{{ article.excerpt }}</p>
              </div>
            </VCardText>
          </VCard>
          
          <div v-if="!filteredArticlesByCategory[index]?.length" class="text-center py-8">
            <VIcon icon="tabler-article-off" size="48" class="text-medium-emphasis mb-2" />
            <p class="text-body-1 text-medium-emphasis">
              {{ searchActive ? 'No articles found in this category.' : 'No articles available in this category.' }}
            </p>
          </div>
        </div>
      </VTabsWindowItem>
    </VTabsWindow>
  </section>
</template>
