<script setup>
import { ref } from 'vue'

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

const updateSearch = (value) => {
  localSearchQuery.value = value
  emit('update:searchQuery', value)
}

const subscribeNewsletter = () => {
  console.log('Newsletter subscription:', newsletterEmail.value)
  newsletterEmail.value = ''
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
        <VList class="pa-0">
          <VListItem v-for="recent in recentArticles" :key="recent.id" class="pa-0">
            <VListItemTitle>
              <a href="#" class="text-primary text-decoration-none">{{ recent.title }}</a>
            </VListItemTitle>
          </VListItem>
        </VList>
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
