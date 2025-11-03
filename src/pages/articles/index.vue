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
    .select('id, type, title, content, excerpt, published_at, image_url, views, likes, shares')
    .order('published_at', { ascending: false })

  if (fetchError) {
    error.value = fetchError.message
  } else if (data) {
    articles.value = data.map((article, index) => {
      return {
        id: article.id,
        title: article.title,
        author: article.author || 'Anonim',
        authorRole: article.author_role || 'Kontributor',
        date: new Date(article.published_at).toLocaleDateString('id-ID', {
          year: 'numeric', month: 'short', day: 'numeric'
        }),
        readingTime: `${Math.max(1, Math.ceil((article.excerpt || '').length / 200))} menit baca`,
        excerpt: article.excerpt || 'Tidak ada ringkasan tersedia',
        image: article.image_url || 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=250&fit=crop',
        category: article.type || 'Rilis',
        tags: ['community', 'news', 'updates'],
        views: article.views || 0,
        likes: article.likes || 0,
        shares: article.shares || 0,
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
      date: new Date(event.event_date).toLocaleDateString('id-ID', {
        year: 'numeric', month: 'short', day: 'numeric'
      }),
      time: event.event_time || '18:00',
      location: event.location || 'Pusat Komunitas'
    }))
  } else {
    // Fallback static events
    events.value = [
      { id: 1, name: "Pertemuan Komunitas", date: "10 Okt 2025", time: "18:00", location: "Pusat Komunitas" },
      { id: 2, name: "Workshop: Layanan Digital", date: "15 Okt 2025", time: "14:00", location: "Ruang Rapat Perpustakaan" }
    ]
  }
}

const spotlight = ref({
  name: "Maria Lopez",
  quote: "Komunitas ini membantu saya berbagi cerita dan terhubung dengan orang lain."
})

const testimonials = ref([
  { id: 1, text: "Dukungan luar biasa dari tim front office. Mereka membuat proses perizinan menjadi jauh lebih mudah.", author: "Alex P.", role: "Pemilik Usaha Lokal" },
  { id: 2, text: "Saya merasa lebih terhubung dengan komunitas sekarang. Acara dan programnya fantastis.", author: "Samira K.", role: "Warga" },
  { id: 3, text: "Program pemuda mengubah perspektif saya dan memberikan keterampilan kepemimpinan yang saya gunakan setiap hari.", author: "Jordan M.", role: "Lulusan Program" },
  { id: 4, text: "Komunikasi dan transparansi yang sangat baik dari kantor komunitas.", author: "Robert L.", role: "Sukarelawan Komunitas" },
  { id: 5, text: "Alat digital telah membuat mengakses layanan menjadi jauh lebih nyaman.", author: "Elena V.", role: "Warga Senior" }
])

const partners = ref([
  { id: 1, name: "Kamar Dagang Lokal", logo: "https://via.placeholder.com/80x40?text=Kamar+Dagang" },
  { id: 2, name: "Bank Komunitas", logo: "https://via.placeholder.com/80x40?text=Bank" },
  { id: 3, name: "Kesehatan Regional", logo: "https://via.placeholder.com/80x40?text=Kesehatan" },
  { id: 4, name: "Yayasan Pendidikan", logo: "https://via.placeholder.com/80x40?text=Pendidikan" },
  { id: 5, name: "Kelompok Lingkungan", logo: "https://via.placeholder.com/80x40?text=Hijau" },
  { id: 6, name: "Kolaboratif Teknologi", logo: "https://via.placeholder.com/80x40?text=Teknologi" }
])

const faqs = ref([
  { id: 1, question: "Bagaimana cara mengajukan permohonan izin?", category: "Layanan" },
  { id: 2, question: "Di mana saya bisa menemukan jadwal acara komunitas?", category: "Acara" },
  { id: 3, question: "Siapa yang harus saya hubungi untuk masalah lingkungan?", category: "Dukungan" },
  { id: 4, question: "Bagaimana cara mendaftar program komunitas?", category: "Program" },
  { id: 5, question: "Apa jam kerja dan informasi kontak?", category: "Kontak" },
  { id: 6, question: "Bagaimana cara menjadi sukarelawan untuk inisiatif komunitas?", category: "Sukarelawan" },
  { id: 7, question: "Di mana saya bisa mengakses sumber daya dan layanan komunitas?", category: "Sumber Daya" },
  { id: 8, question: "Bagaimana cara melaporkan masalah atau saran komunitas?", category: "Umpan Balik" }
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
        <!-- Sidebar -->
        <VCol cols="12" lg="4">
          <ArticlesSidebar :recent-articles="recentArticles" :categories="categories" :events="events"
            :spotlight="spotlight" :testimonials="testimonials" :partners="partners" :faqs="faqs"
            v-model:search-query="searchQuery" />
        </VCol>
        
        <!-- Main Column -->
        <VCol cols="12" lg="8">
          <h1 class="text-h3 font-weight-bold mb-6">Artikel Inspeksi</h1>

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
                {{ filteredArticles.length }} hasil
                untuk "{{ searchQuery }}"
              </VChip>
            </div>

            <CategoryTabbedLayout2 :articles="filteredArticles" :categories="filteredCategories"
              :search-active="!!searchQuery.trim()" :search-loading="searchLoading" />
          </div>
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