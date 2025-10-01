<script setup>
import { supabase } from '@/libs/supabase'
import { ref, onMounted, computed, watch } from 'vue'
import ArticlesSidebar from '@/views/front-pages/community/articles/articles-sidebar.vue'
import CategoryTabbedLayout2 from '@/views/front-pages/community/articles/category-tabbed-layout-2.vue'
import Footer from '@/views/front-pages/front-page-footer.vue'
import Navbar from '@/views/front-pages/front-page-navbar.vue'
import { useConfigStore } from '@core/stores/config'

const store = useConfigStore()
store.skin = 'default'

const articles = ref([])
const recentArticles = ref([])
const categories = ref([])
const events = ref([])
const loading = ref(true)
const error = ref('')

const searchQuery = ref("")
const searchLoading = ref(false)
const searchTimeout = ref(null)

const fetchArticles = async () => {
  loading.value = true
  const { data, error: fetchError } = await supabase
    .from('articles')
    .select('id, type, title, content, published_at, image_url')
    .order('published_at', { ascending: false })

  if (fetchError) {
    error.value = fetchError.message
  } else if (data) {
    articles.value = data.map((article, index) => {
      const excerpt = Array.isArray(article.content) && article.content[0] 
        ? article.content[0].slice(0, 120) + (article.content[0].length > 120 ? '...' : '')
        : 'No content available'
      
      return {
        id: article.id,
        title: article.title,
        author: article.author || 'Anonymous',
        authorRole: article.author_role || 'Contributor',
        date: new Date(article.published_at).toLocaleDateString('en-US', { 
          year: 'numeric', month: 'short', day: 'numeric' 
        }),
        readingTime: `${Math.max(1, Math.ceil(excerpt.length / 200))} min read`,
        excerpt,
        image: article.image_url || 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=250&fit=crop',
        category: article.type || 'Rilis',
        tags: ['community', 'news', 'updates'],
        views: Math.floor(Math.random() * 300) + 50,
        likes: Math.floor(Math.random() * 50) + 5,
        featured: index < 3
      }
    })

    // Generate recent articles
    recentArticles.value = articles.value.slice(0, 6).map(article => ({
      id: article.id,
      title: article.title,
      date: article.date
    }))

    // Extract unique categories
    const uniqueCategories = [...new Set(data.map(article => article.type || 'Rilis'))]
    categories.value = uniqueCategories.length > 0 ? uniqueCategories : ['Opini', 'Kisah', 'Rilis']
  }
  loading.value = false
}

const fetchEvents = async () => {
  const { data } = await supabase
    .from('events')
    .select('id, name, event_date, event_time, location')
    .order('event_date', { ascending: true })
    .limit(5)

  if (data) {
    events.value = data.map(event => ({
      id: event.id,
      name: event.name,
      date: new Date(event.event_date).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'short', day: 'numeric' 
      }),
      time: event.event_time || '6:00 PM',
      location: event.location || 'Community Center'
    }))
  } else {
    // Fallback static events
    events.value = [
      { id: 1, name: "Community Gathering", date: "Oct 10, 2025", time: "6:00 PM", location: "Community Center" },
      { id: 2, name: "Workshop: Digital Services", date: "Oct 15, 2025", time: "2:00 PM", location: "Library Meeting Room" }
    ]
  }
}

const spotlight = ref({
  name: "Maria Lopez",
  quote: "This community helped me share my story and connect with others."
})

const testimonials = ref([
  { id: 1, text: "Amazing support from the front office team. They made the permit process so much easier.", author: "Alex P.", role: "Local Business Owner" },
  { id: 2, text: "I feel more connected to the community now. The events and programs are fantastic.", author: "Samira K.", role: "Resident" },
  { id: 3, text: "The youth program changed my perspective and gave me leadership skills I use every day.", author: "Jordan M.", role: "Program Graduate" },
  { id: 4, text: "Excellent communication and transparency from the community office.", author: "Robert L.", role: "Community Volunteer" },
  { id: 5, text: "The digital tools have made accessing services so much more convenient.", author: "Elena V.", role: "Senior Resident" }
])

const partners = ref([
  { id: 1, name: "Local Chamber", logo: "https://via.placeholder.com/80x40?text=Chamber" },
  { id: 2, name: "Community Bank", logo: "https://via.placeholder.com/80x40?text=Bank" },
  { id: 3, name: "Regional Health", logo: "https://via.placeholder.com/80x40?text=Health" },
  { id: 4, name: "Education Foundation", logo: "https://via.placeholder.com/80x40?text=Education" },
  { id: 5, name: "Environmental Group", logo: "https://via.placeholder.com/80x40?text=Green" },
  { id: 6, name: "Tech Collaborative", logo: "https://via.placeholder.com/80x40?text=Tech" }
])

const faqs = ref([
  { id: 1, question: "How can I submit a permit application?", category: "Services" },
  { id: 2, question: "Where do I find community event schedules?", category: "Events" },
  { id: 3, question: "Who do I contact for neighborhood concerns?", category: "Support" },
  { id: 4, question: "How do I register for community programs?", category: "Programs" },
  { id: 5, question: "What are the office hours and contact information?", category: "Contact" },
  { id: 6, question: "How can I volunteer for community initiatives?", category: "Volunteer" },
  { id: 7, question: "Where can I access community resources and services?", category: "Resources" },
  { id: 8, question: "How do I report community issues or suggestions?", category: "Feedback" }
])

const filteredArticles = computed(() => {
  if (!searchQuery.value.trim()) {
    return articles.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return articles.value.filter(article => 
    article.title.toLowerCase().includes(query) ||
    article.excerpt.toLowerCase().includes(query) ||
    article.category.toLowerCase().includes(query) ||
    article.author.toLowerCase().includes(query)
  )
})

const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    return categories.value
  }
  
  const articleCategories = filteredArticles.value.map(article => article.category)
  return [...new Set(articleCategories)]
})

// Watch for search query changes with debounce
watch(searchQuery, (newQuery) => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  
  if (newQuery.trim()) {
    searchLoading.value = true
    searchTimeout.value = setTimeout(() => {
      searchLoading.value = false
    }, 2000)
  } else {
    searchLoading.value = false
  }
})

onMounted(async () => {
  await Promise.all([fetchArticles(), fetchEvents()])
})

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})
</script>

<template>
  <Navbar />

  <div class="checkout-card">
    <VContainer class="py-8" style="max-width: 1400px;">
      <VRow>
        <!-- Main Column -->
        <VCol cols="12" lg="8">
          <h1 class="text-h3 font-weight-bold mb-6">Hello Community Articles</h1>

          <VAlert v-if="error" type="error" class="mb-4">
            {{ error }}
          </VAlert>

          <div v-if="loading" class="d-flex justify-center align-center py-12">
            <VProgressCircular indeterminate color="primary" size="48" />
          </div>

          <div v-else class="d-flex flex-column ga-12">
            <!-- Search Results Info -->
            <div v-if="searchQuery.trim() && !searchLoading" class="mb-2">
              <VChip size="small" color="primary" variant="tonal">
                {{ filteredArticles.length }} result{{ filteredArticles.length !== 1 ? 's' : '' }} 
                for "{{ searchQuery }}"
              </VChip>
            </div>

            <CategoryTabbedLayout2 
              :articles="filteredArticles" 
              :categories="filteredCategories"
              :search-active="!!searchQuery.trim()"
              :search-loading="searchLoading"
            />
          </div>
        </VCol>

        <!-- Sidebar -->
        <VCol cols="12" lg="4">
          <ArticlesSidebar 
            :recent-articles="recentArticles" 
            :categories="categories" 
            :events="events"
            :spotlight="spotlight" 
            :testimonials="testimonials" 
            :partners="partners" 
            :faqs="faqs"
            v-model:search-query="searchQuery" 
          />
        </VCol>
      </VRow>
    </VContainer>
  </div>

  <Footer />
</template>

<style lang="scss">
.checkout-card {
  margin-block: 10.5rem 5.25rem;

  .v-container {
    max-width: 1400px !important;
  }
}

@media (max-width: 960px) and (min-width: 600px) {
  .checkout-page {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}

@media (max-width: 600px) {
  .checkout-card {
    margin-block-start: 6rem;
  }
}
</style>