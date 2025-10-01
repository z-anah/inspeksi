<script setup>
import { supabase } from '@/libs/supabase'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import ArticleContent from '@/views/front-pages/community/article/article-content.vue'
import ArticleHeader from '@/views/front-pages/community/article/article-header.vue'
import ArticleNavigation from '@/views/front-pages/community/article/article-navigation.vue'
import ArticleSidebar from '@/views/front-pages/community/article/article-sidebar.vue'
import SharingSection from '@/views/front-pages/community/article/sharing-section.vue'
import Footer from '@/views/front-pages/front-page-footer.vue'
import Navbar from '@/views/front-pages/front-page-navbar.vue'
import { useConfigStore } from '@core/stores/config'

const store = useConfigStore()
store.skin = 'default'

const route = useRoute()
const currentArticle = ref(null)
const relatedArticles = ref([])
const comments = ref([])
const articleNavigation = ref({})
const loading = ref(true)
const error = ref('')

const fetchArticle = async (id) => {
  try {
    const { data, error: fetchError } = await supabase
      .from('articles')
      .select(`*`)
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    currentArticle.value = {
      id: data.id,
      title: data.title,
      subtitle: data.subtitle || '',
      author: {
        name: data.author_name || 'Anonymous',
        role: 'Contributor',
        avatar: data.author_avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b412?w=150&h=150&fit=crop&crop=face',
        bio: data.author_bio || 'Community contributor and writer.',
        socialLinks: {
          twitter: '@contributor',
          linkedin: 'contributor'
        }
      },
      date: new Date(data.published_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      }),
      readingTime: `${Math.max(1, Math.ceil((Array.isArray(data.content) ? data.content.join(' ').length : 0) / 1000))} min read`,
      category: data.type || 'General',
      tags: ['community', 'news'],
      featuredImage: data.image_url || 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=400&fit=crop',
      content: Array.isArray(data.content) ? data.content.map(p => `<p>${p}</p>`).join('') : '<p>Content not available</p>',
      views: data.views || 0,
      likes: data.likes || 0,
      shares: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 30)
    }

    // Update view count
    await supabase
      .from('articles')
      .update({ views: (data.views || 0) + 1 })
      .eq('id', id)

  } catch (err) {
    error.value = err.message
  }
}

const fetchRelatedArticles = async (currentId, category) => {
  const { data } = await supabase
    .from('articles')
    .select(`*`)
    .eq('type', category)
    .neq('id', currentId)
    .limit(3)

  if (data) {
    relatedArticles.value = data.map(article => ({
      id: article.id,
      title: article.title,
      excerpt: Array.isArray(article.content) && article.content[0] 
        ? article.content[0].slice(0, 100) + '...'
        : 'Read more about this topic...',
      image: article.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      date: new Date(article.published_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      }),
      readingTime: '5 min read'
    }))
  }
}

const fetchNavigation = async (currentId) => {
  const { data: prevData } = await supabase
    .from('articles')
    .select('id, title, image_url')
    .lt('id', currentId)
    .order('id', { ascending: false })
    .limit(1)

  const { data: nextData } = await supabase
    .from('articles')
    .select('id, title, image_url')
    .gt('id', currentId)
    .order('id', { ascending: true })
    .limit(1)

  articleNavigation.value = {
    previous: prevData?.[0] ? {
      id: prevData[0].id,
      title: prevData[0].title,
      image: prevData[0].image_url || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop'
    } : null,
    next: nextData?.[0] ? {
      id: nextData[0].id,
      title: nextData[0].title,
      image: nextData[0].image_url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&h=100&fit=crop'
    } : null
  }
}

const fetchComments = async (articleId) => {
  // Placeholder for comments - implement based on your comments table structure
  comments.value = [
    {
      id: 1,
      author: "Community Member",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      date: "2 hours ago",
      content: "Great article! Very informative.",
      likes: 5,
      replies: []
    }
  ]
}

onMounted(async () => {
  const articleId = route.params.id
  loading.value = true
  
  await fetchArticle(articleId)
  
  if (currentArticle.value) {
    await Promise.all([
      fetchRelatedArticles(articleId, currentArticle.value.category),
      fetchNavigation(articleId),
      fetchComments(articleId)
    ])
  }
  
  loading.value = false
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
  <div class="article-page-wrapper">
    <div class="article-container">
      <VContainer class="py-8" style="max-width: 1400px;">
        <VAlert v-if="error" type="error" class="mb-4">
          {{ error }}
        </VAlert>

        <div v-if="loading" class="d-flex justify-center align-center py-12">
          <VProgressCircular indeterminate color="primary" size="48" />
        </div>

        <VRow v-else-if="currentArticle">
          <!-- Main Content -->
          <VCol cols="12" lg="8">
            <div class="d-flex flex-column ga-8">
              <ArticleHeader :article="currentArticle" />
              <ArticleContent :content="currentArticle.content" />
              <SharingSection :article="currentArticle" />
              <ArticleNavigation :navigation="articleNavigation" />
            </div>
          </VCol>

          <!-- Sidebar -->
          <VCol cols="12" lg="4">
            <ArticleSidebar :article="currentArticle" />
          </VCol>
        </VRow>

        <div v-else class="text-center py-12">
          <VIcon icon="tabler-article-off" size="64" class="text-medium-emphasis mb-4" />
          <h2 class="text-h4 mb-2">Article Not Found</h2>
          <p class="text-body-1 text-medium-emphasis mb-4">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <VBtn to="/articles" color="primary">
            Back to Articles
          </VBtn>
        </div>
      </VContainer>
    </div>

    <Footer />
  </div>
</template>

<style lang="scss">
.article-container {
  margin-block: 8rem 3rem;

  .v-container {
    max-width: 1400px !important;
  }
}

@media (max-width: 960px) and (min-width: 600px) {
  .article-page-wrapper {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}

@media (max-width: 600px) {
  .article-container {
    margin-block-start: 6rem;
  }
}
</style>
