<script setup>
defineProps({
  content: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section>
    <VCard>
      <VCardText class="pa-8">
        <div class="article-content text-body-1" v-html="content" />
      </VCardText>
    </VCard>
  </section>
</template>

<style scoped>
.article-content {
  line-height: 1.8;
}

.article-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: rgb(var(--v-theme-on-surface));
}

.article-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: rgb(var(--v-theme-on-surface));
}

.article-content :deep(p) {
  margin-bottom: 1.5rem;
}

.article-content :deep(ul) {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
}
</style>
