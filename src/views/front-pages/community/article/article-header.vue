<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section>
    <!-- Breadcrumbs -->
    <VBreadcrumbs :items="[
      { title: 'Home', to: '/' },
      { title: 'Community', to: '/community' },
      { title: 'Articles', to: '/community/articles' },
      { title: article.title, disabled: true }
    ]" class="pa-0 mb-4" />

    <!-- Article Header -->
    <div class="mb-6">
      <VChip color="primary" size="small" class="mb-3">
        {{ article.category }}
      </VChip>

      <h1 class="text-h3 font-weight-bold mb-2">
        {{ article.title }}
      </h1>

      <p class="text-h6 text-medium-emphasis mb-4">
        {{ article.subtitle }}
      </p>

      <!-- Article Meta -->
      <div class="d-flex align-center flex-wrap ga-4 mb-6">
        <div class="d-flex align-center ga-3">
          <VAvatar :image="article.author.avatar" size="40" />
          <div>
            <div class="text-body-1 font-weight-medium">{{ article.author.name }}</div>
            <div class="text-caption text-medium-emphasis">{{ article.author.role }}</div>
          </div>
        </div>

        <VDivider vertical />

        <div class="d-flex align-center ga-4 text-body-2 text-medium-emphasis">
          <div class="d-flex align-center ga-1">
            <VIcon icon="tabler-calendar" size="16" />
            {{ article.date }}
          </div>
          <div class="d-flex align-center ga-1">
            <VIcon icon="tabler-clock" size="16" />
            {{ article.readingTime }}
          </div>
          <div class="d-flex align-center ga-1">
            <VIcon icon="tabler-eye" size="16" />
            {{ article.views }} views
          </div>
        </div>
      </div>

      <!-- Featured Image -->
      <VImg :src="article.featuredImage" :alt="article.title" height="400" class="rounded" cover />

      <!-- Tags -->
      <div class="d-flex flex-wrap ga-2 mt-4">
        <VChip v-for="tag in article.tags" :key="tag" size="small" variant="outlined">
          #{{ tag }}
        </VChip>
      </div>
    </div>
  </section>
</template>
