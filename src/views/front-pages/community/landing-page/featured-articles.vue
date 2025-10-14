<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/libs/supabase'

const router = useRouter()

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const articles = ref([])

const fetchArticles = async () => {
  const { data, error } = await supabase
    .from('articles')
    .select('title, excerpt, published_at, image_url, id')
    .order('published_at', { ascending: false })
    .limit(2)

  if (!error && data) {
    articles.value = data.map(article => ({
      title: article.title,
      description: article.excerpt || 'No excerpt available',
      image: article.image_url || 'https://placehold.co/400x200?text=Article+Image',
      id: article.id,
    }))
  }
}

onMounted(() => {
  fetchArticles()
})

const navigateToArticle = (articleId) => {
  router.push(`/articles/${articleId}`)
}
</script>

<template>
  <VContainer>
    <div class="d-flex justify-center align-center payment-card">
      <VRow>
        <VCol cols="12" md="4" class="mb-6 mb-md-0 d-flex flex-column align-center justify-center">
          <VAvatar variant="tonal" size="48" rounded color="primary">
            <VIcon icon="tabler-bulb" size="32" />
          </VAvatar>
          <h4 class="text-h5 font-weight-medium mt-3 mb-2 text-center">
            Artikel Inspeksi
          </h4>
          <p class="text-body-2 text-center mb-3">
            Jelajahi opini, aktivitas, kisah inspiratif dan berita terkini untuk menguatkan semangat antikorupsi mu!
          </p>
          <VBtn to="/articles" size="small">Baca Semua Artikel</VBtn>
        </VCol>
        <VCol v-for="(article, idx) in articles" :key="article.id || idx" cols="12" md="4" sm="6">
          <VCard flat border class="cursor-pointer h-100" hover @click="navigateToArticle(article.id)">
            <div class="px-2 pt-2">
              <VImg :src="article.image" :alt="article.title" class="w-100 rounded" height="180" cover />
            </div>
            <VCardText class="pa-3">
              <h5 class="text-h5 mb-2 text-truncate"
                style="max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                {{ article.title.length > 38 ? article.title.slice(0, 35) + '...' : article.title }}
              </h5>
              <p class="text-body-1 mb-0 text-truncate-multiline">
                {{ article.description.length > 80 ? article.description.slice(0, 77) + '...' : article.description }}
              </p>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </div>
  </VContainer>
</template>

<style lang="scss" scoped>
.payment-card {
  margin-block: 3rem 3rem;
}

.text-truncate-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.cursor-pointer {
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
}
</style>