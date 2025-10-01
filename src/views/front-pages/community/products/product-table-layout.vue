<script setup>
defineProps({
  products: {
    type: Array,
    required: true
  }
})

const headers = [
  { title: 'Product', key: 'product', sortable: false },
  { title: 'Category', key: 'category' },
  { title: 'Price', key: 'price' },
  { title: 'Rating', key: 'rating' },
  { title: 'Stock', key: 'inStock' },
  { title: 'Actions', key: 'actions', sortable: false }
]
</script>

<template>
  <section>
    <h2 class="text-h4 font-weight-medium mb-4">Product Table</h2>

    <VCard>
      <VDataTable :headers="headers" :items="products" item-key="id" class="text-no-wrap">
        <template #item.product="{ item }">
          <div class="d-flex align-center ga-3">
            <VImg :src="item.image" :alt="item.name" width="60" height="45" class="rounded" cover />
            <div>
              <div class="font-weight-medium">{{ item.name }}</div>
              <div class="text-caption text-medium-emphasis">{{ item.description }}</div>
            </div>
          </div>
        </template>

        <template #item.price="{ item }">
          <div>
            <span class="text-primary font-weight-medium">${{ item.price }}</span>
            <span v-if="item.originalPrice > item.price"
              class="text-decoration-line-through text-medium-emphasis ms-2 text-caption">
              ${{ item.originalPrice }}
            </span>
          </div>
        </template>

        <template #item.rating="{ item }">
          <div class="d-flex align-center ga-1">
            <VRating :model-value="item.rating" readonly size="x-small" color="warning" />
            <span class="text-caption">({{ item.reviews }})</span>
          </div>
        </template>

        <template #item.inStock="{ item }">
          <VChip :color="item.inStock ? 'success' : 'error'" size="small" variant="tonal">
            {{ item.inStock ? 'In Stock' : 'Out of Stock' }}
          </VChip>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex ga-2">
            <VBtn color="primary" variant="flat" size="small" :disabled="!item.inStock">
              Add to Cart
            </VBtn>
            <VBtn icon="tabler-eye" variant="text" size="small" />
          </div>
        </template>
      </VDataTable>
    </VCard>
  </section>
</template>
