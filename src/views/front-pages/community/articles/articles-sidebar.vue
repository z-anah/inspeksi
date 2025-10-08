<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  recentArticles: {
    type: Array,
    required: true
  },
  categories: {
    type: Array,
    required: true
  },
  events: {
    type: Array,
    required: true
  },
  spotlight: {
    type: Object,
    required: true
  },
  testimonials: {
    type: Array,
    required: true
  },
  partners: {
    type: Array,
    required: true
  },
  faqs: {
    type: Array,
    required: true
  },
  searchQuery: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:searchQuery'])

const localSearchQuery = ref(props.searchQuery)
const newsletterEmail = ref('')

const router = useRouter()

const updateSearch = (value) => {
  localSearchQuery.value = value
  emit('update:searchQuery', value)
}

const subscribeNewsletter = () => {
  console.log('Newsletter subscription:', newsletterEmail.value)
  newsletterEmail.value = ''
}

const navigateToArticle = (articleId) => {
  router.push(`/articles/${articleId}`)
}
</script>

<template>
  <div class="d-flex flex-column ga-8">
    <!-- Search -->
    <VCard>
      <VCardText class="pa-6">
        <VTextField :model-value="localSearchQuery" @update:model-value="updateSearch" placeholder="Search articles..."
          prepend-inner-icon="tabler-search" variant="outlined" hide-details />
      </VCardText>
    </VCard>

    <!-- Recent Articles -->
    <VCard>
      <VCardText class="pa-6">
        <h3 class="text-h5 font-weight-medium mb-4">Recent Articles</h3>
        <div class="d-flex flex-column gap-3">
          <div 
            v-for="article in recentArticles" 
            :key="article.id"
            class="cursor-pointer pa-2 rounded hover-bg"
            @click="navigateToArticle(article.id)"
          >
            <h4 class="text-body-1 font-weight-medium mb-1">{{ article.title }}</h4>
            <p class="text-caption text-medium-emphasis">{{ article.date }}</p>
          </div>
        </div>
      </VCardText>
    </VCard>

    <!-- Categories -->
    <VCard>
      <VCardText class="pa-6">
        <h3 class="text-h5 font-weight-medium mb-4">Categories</h3>
        <div class="d-flex flex-wrap ga-2">
          <VChip v-for="category in categories" :key="category" size="small" variant="tonal" class="cursor-pointer">
            {{ category.toUpperCase() }}
          </VChip>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
.cursor-pointer {
  cursor: pointer;
}

.hover-bg:hover {
  background-color: rgba(var(--v-theme-on-surface), 0.04);
}
</style>
