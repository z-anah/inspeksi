<script setup>
import { supabase } from '@/libs/supabase'
import ProductGridLayout from '@/views/front-pages/community/products/product-grid-layout.vue'
import ProductsSidebarCopy from '@/views/front-pages/community/products/products-sidebar-copy.vue'
import Footer from '@/views/front-pages/front-page-footer.vue'
import Navbar from '@/views/front-pages/front-page-navbar.vue'
import { useConfigStore } from '@core/stores/config'
import { useCartStore } from '@/stores/cart'
import { ref, computed, onMounted } from 'vue'

const store = useConfigStore()
store.skin = 'default'

const cartStore = useCartStore()

const products = ref([])
const errorMsg = ref('')
const loading = ref(false)

const categories = ref([])

const filters = ref({
  priceRange: [0, 1000000],
  categories: [],
  inStock: false,
  featured: false,
  minRating: 0
})

const searchQuery = ref("")

// Computed property for filtered products
const filteredProducts = computed(() => {
  let filtered = products.value

  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }

  // Price range filter
  filtered = filtered.filter(product => 
    product.price >= filters.value.priceRange[0] && 
    product.price <= filters.value.priceRange[1]
  )

  // Rating filter
  if (filters.value.minRating > 0) {
    filtered = filtered.filter(product => 
      product.rating >= filters.value.minRating
    )
  }

  // In stock filter
  if (filters.value.inStock) {
    filtered = filtered.filter(product => product.inStock)
  }

  // Featured filter
  if (filters.value.featured) {
    filtered = filtered.filter(product => product.featured)
  }

  return filtered
})

// Fetch products from Supabase
const fetchProducts = async () => {
  loading.value = true
  errorMsg.value = ''
  
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(image_url, is_primary)')
    .gt('stock', 0)
    .order('created_at', { ascending: false })
    
  if (error) {
    errorMsg.value = error.message
    loading.value = false
    return
  }
  
  // Transform data to match the expected format
  products.value = data.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: Number(p.price),
    originalPrice: Number(p.price) * 1.2, // Add 20% as original price
    image: p.product_images?.find(img => img.is_primary)?.image_url
      || p.product_images?.[0]?.image_url
      || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    category: 'Products',
    rating: Math.floor(Math.random() * 5) + 1, // Random rating 1-5
    reviews: Math.floor(Math.random() * 10) + 1, 
    inStock: p.stock > 0,
    stock: p.stock,
    tags: ['product'],
    featured: Math.random() > 0.5, // Random featured status
    primary_image: p.product_images?.find(img => img.is_primary)?.image_url
      || p.product_images?.[0]?.image_url
      || null,
  }))
  
  // Extract unique categories (for now just use 'Products')
  categories.value = ['Products']
  loading.value = false
}

// Fetch WhatsApp number from Supabase
const fetchWhatsAppNumber = async () => {
  const { data, error } = await supabase
    .from('content')
    .select('value')
    .eq('section', 'contact')
    .eq('key', 'wa')
    .single()
  if (!error && data) {
    cartStore.setWhatsAppNumber(data.value)
  }
}

// Use cart store methods
const addToCart = (product, quantity = 1) => {
  cartStore.addToCart(product, quantity)
}

// Update filters
const updateFilters = (newFilters) => {
  filters.value = { ...filters.value, ...newFilters }
}

onMounted(() => {
  fetchProducts()
  fetchWhatsAppNumber()
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
  <div class="landing-page-wrapper">
    <div class="products-container">
      <VContainer class="py-8" style="max-width: 1400px;">
        <!-- Error Alert -->
        <VAlert v-if="errorMsg" type="error" class="mb-4">{{ errorMsg }}</VAlert>
        
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-8">
          <VProgressCircular indeterminate color="primary" size="64" />
          <div class="mt-4">Loading products...</div>
        </div>
        
        <VRow v-else>
          <!-- Main Column -->
          <VCol cols="12" lg="8">
            <div class="d-flex justify-space-between align-center mb-6">
              <h1 class="text-h3 font-weight-bold">Product Showcase</h1>
              <VChip color="primary" size="small">
                {{ filteredProducts.length }} product{{ filteredProducts.length !== 1 ? 's' : '' }} found
              </VChip>
            </div>

            <!-- No Results -->
            <div v-if="filteredProducts.length === 0" class="text-center py-8">
              <VIcon icon="tabler-search-off" size="64" class="text-medium-emphasis mb-4" />
              <h3 class="text-h5 font-weight-medium mb-2">No products found</h3>
              <p class="text-body-1 text-medium-emphasis mb-4">
                Try adjusting your search criteria or filters
              </p>
              <VBtn 
                color="primary" 
                variant="tonal" 
                @click="() => { searchQuery = ''; filters.priceRange = [0, 1000000]; filters.minRating = 0 }"
              >
                Clear all filters
              </VBtn>
            </div>

            <div v-else class="d-flex flex-column ga-12">
              <ProductGridLayout 
                :products="filteredProducts" 
                @add-to-cart="addToCart"
                :cart="cartStore.items"
              />
            </div>
          </VCol>

          <!-- Sidebar -->
          <VCol cols="12" lg="4">
            <ProductsSidebarCopy 
              :categories="categories" 
              :filters="filters" 
              v-model:search-query="searchQuery"
              @update:filters="updateFilters"
            />
          </VCol>
        </VRow>
      </VContainer>
    </div>

    <Footer />
  </div>
</template>

<style lang="scss">
.products-container {
  margin-block: 8rem 3rem;

  .v-container {
    max-width: 1400px !important;
  }
}

@media (max-width: 960px) and (min-width: 600px) {
  .landing-page-wrapper {
    .container {
      padding-inline: 2rem !important;
    }
  }
}
</style>