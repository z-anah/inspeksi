<template>
  <Navbar />
  <div class="forms-container">
    <VContainer>
      <!-- Page Header -->
      <div class="text-center mb-8">
        <h1 class="text-h2 font-weight-bold mb-4">Community Forms</h1>
        <p class="text-h6 text-medium-emphasis mb-6 mx-auto" style="max-width: 600px;">
          Get involved in your community. Join events, volunteer, report issues, and make your voice heard through our various forms and initiatives.
        </p>
      </div>

      <!-- Error Alert -->
      <VAlert v-if="errorMsg" type="error" class="mb-4">{{ errorMsg }}</VAlert>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <VProgressCircular indeterminate color="primary" size="64" />
        <div class="mt-4">Loading forms...</div>
      </div>

      <VRow v-else>
        <!-- Main Column -->
        <VCol cols="12" md="8">
          <div class="d-flex justify-space-between align-center mb-6">
            <h2 class="text-h4 font-weight-bold">Available Forms</h2>
            <VChip color="primary" size="small">
              {{ filteredForms.length }} form{{ filteredForms.length !== 1 ? 's' : '' }} available
            </VChip>
          </div>

          <!-- No Results -->
          <div v-if="filteredForms.length === 0 && !loading" class="text-center py-8">
            <VIcon icon="tabler-search-off" size="64" class="text-medium-emphasis mb-4" />
            <h3 class="text-h5 font-weight-medium mb-2">No forms found</h3>
            <p class="text-body-1 text-medium-emphasis mb-4">
              Try adjusting your search criteria or category filter
            </p>
            <VBtn 
              color="primary" 
              variant="tonal" 
              @click="() => { searchQuery = ''; filterCategory = '' }"
            >
              Clear all filters
            </VBtn>
          </div>

          <div v-else class="d-flex flex-column ga-6">
            <ListGroupLayout :forms="filteredForms" />
          </div>
        </VCol>

        <!-- Sidebar -->
        <VCol cols="12" lg="4">
          <FormsHeaderCopy 
            :categories="categories" 
            v-model:search-query="searchQuery"
            v-model:filter-category="filterCategory" 
          />
        </VCol>
      </VRow>
    </VContainer>
  </div>
  <Footer />
</template>

<script setup>
import FormsHeaderCopy from '@/views/front-pages/community/forms/forms-header-copy.vue'
import ListGroupLayout from '@/views/front-pages/community/forms/list-group-layout.vue'
import Footer from '@/views/front-pages/front-page-footer.vue'
import Navbar from '@/views/front-pages/front-page-navbar.vue'
import { useConfigStore } from '@core/stores/config'
import { supabase } from '@/libs/supabase'
import { computed, ref, onMounted } from 'vue'

const store = useConfigStore()
store.skin = 'default'

const forms = ref([])
const loading = ref(false)
const errorMsg = ref('')
const searchQuery = ref('')
const filterCategory = ref('')

// Computed properties for filtering
const categories = computed(() => [...new Set(forms.value.map(f => f.category))])

const filteredForms = computed(() => {
  let filtered = forms.value
  
  // Category filter
  if (filterCategory.value) {
    filtered = filtered.filter(f => f.category === filterCategory.value)
  }
  
  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase()
    filtered = filtered.filter(f => {
      return (
        f.title.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query) ||
        f.category.toLowerCase().includes(query)
      )
    })
  }
  
  return filtered
})

// Fetch forms from Supabase
const fetchForms = async () => {
  loading.value = true
  errorMsg.value = ''
  
  try {
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .eq('is_active', true)
      .order('id', { ascending: true })
    
    if (error) {
      errorMsg.value = error.message
      console.error('Error fetching forms:', error)
      return
    }
    
    // Transform data to match expected format
    forms.value = data.map(form => ({
      id: form.id,
      title: form.title,
      description: form.description,
      category: form.category || 'General',
      url: form.link,
      image: form.image_url || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=400&h=200&fit=crop`,
      icon: form.icon || 'tabler-forms'
    }))
  } catch (err) {
    errorMsg.value = 'Failed to load forms. Please try again later.'
    console.error('Unexpected error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchForms()
})

definePage({
  meta: {
    layout: 'blank',
    public: true,
    title: 'Community Forms - Get Involved',
  },
})
</script>

<style lang="scss">
.forms-container {
  margin-block: 8rem 3rem;

  .v-container {
    max-width: 1400px !important;
  }
}

@media (max-width: 960px) and (min-width: 600px) {
  .forms-container {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}

@media (max-width: 600px) {
  .forms-container {
    margin-block-start: 6rem;
  }
}
</style>
