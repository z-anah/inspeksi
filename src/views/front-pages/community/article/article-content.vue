<script setup>
import { onMounted, nextTick } from 'vue'

defineProps({
  content: {
    type: String,
    required: true
  }
})

const addHeadingIds = () => {
  nextTick(() => {
    const headings = document.querySelectorAll('.article-content h1, .article-content h2, .article-content h3')
    headings.forEach((heading) => {
      const text = heading.textContent
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      heading.id = id
    })
  })
}

onMounted(() => {
  addHeadingIds()
})
</script>

<template>
  <section>
    <VCard>
      <VCardText class="pa-8">
        <div class="article-content text-body-1" v-html="content" @vue:updated="addHeadingIds" />
      </VCardText>
    </VCard>
  </section>
</template>

<style scoped>
.article-content {
  line-height: 1.75;
  font-size: 1.1rem;
  color: rgb(var(--v-theme-on-surface));
  max-width: none;
}

/* Headings */
.article-content :deep(h1) {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  color: rgb(var(--v-theme-primary));
  letter-spacing: -0.025em;
}

.article-content :deep(h1:first-child) {
  margin-top: 0;
}

.article-content :deep(h2) {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.3;
  margin-top: 3rem;
  margin-bottom: 1.25rem;
  color: rgb(var(--v-theme-on-surface));
  letter-spacing: -0.015em;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgb(var(--v-theme-surface-variant));
}

.article-content :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: rgb(var(--v-theme-on-surface));
  letter-spacing: -0.01em;
}

/* Paragraphs */
.article-content :deep(p) {
  margin-bottom: 1.75rem;
  line-height: 1.8;
  font-size: 1.1rem;
}

.article-content :deep(p:last-child) {
  margin-bottom: 0;
}

/* Text Formatting */
.article-content :deep(strong),
.article-content :deep(b) {
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

.article-content :deep(em),
.article-content :deep(i) {
  font-style: italic;
  color: rgb(var(--v-theme-on-surface-variant));
}

.article-content :deep(u) {
  text-decoration: underline;
  text-decoration-color: rgb(var(--v-theme-primary));
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

.article-content :deep(s) {
  text-decoration: line-through;
  color: rgb(var(--v-theme-on-surface-variant));
  opacity: 0.7;
}

/* Lists */
.article-content :deep(ul) {
  margin: 2rem 0;
  padding-left: 0;
  list-style: none;
}

.article-content :deep(ul li) {
  position: relative;
  margin-bottom: 0.75rem;
  padding-left: 2rem;
  line-height: 1.7;
}

.article-content :deep(ul li::before) {
  content: "•";
  position: absolute;
  left: 0;
  top: 0;
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
  font-size: 1.2em;
}

.article-content :deep(ol) {
  margin: 2rem 0;
  padding-left: 0;
  counter-reset: list-counter;
  list-style: none;
}

.article-content :deep(ol li) {
  position: relative;
  margin-bottom: 0.75rem;
  padding-left: 2.5rem;
  line-height: 1.7;
  counter-increment: list-counter;
}

.article-content :deep(ol li::before) {
  content: counter(list-counter) ".";
  position: absolute;
  left: 0;
  top: 0;
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
  width: 2rem;
  text-align: left;
}

/* Nested Lists */
.article-content :deep(ul ul),
.article-content :deep(ol ol),
.article-content :deep(ul ol),
.article-content :deep(ol ul) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

/* Blockquotes */
.article-content :deep(blockquote) {
  margin: 2.5rem 0;
  padding: 1.5rem 2rem;
  background: rgb(var(--v-theme-surface-variant));
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 0 8px 8px 0;
  font-style: italic;
  font-size: 1.125rem;
  line-height: 1.7;
  color: rgb(var(--v-theme-on-surface-variant));
}

.article-content :deep(blockquote p) {
  margin-bottom: 1rem;
}

.article-content :deep(blockquote p:last-child) {
  margin-bottom: 0;
}

/* Code */
.article-content :deep(code) {
  background: rgb(var(--v-theme-surface-variant));
  color: rgb(var(--v-theme-primary));
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.9em;
  font-weight: 500;
}

.article-content :deep(pre) {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-outline-variant));
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  overflow-x: auto;
  line-height: 1.5;
}

.article-content :deep(pre code) {
  background: none;
  padding: 0;
  color: rgb(var(--v-theme-on-surface));
  font-size: 0.95rem;
}

/* Text Alignment */
.article-content :deep(.text-left) {
  text-align: left;
}

.article-content :deep(.text-center) {
  text-align: center;
}

.article-content :deep(.text-right) {
  text-align: right;
}

.article-content :deep(.text-justify) {
  text-align: justify;
  hyphens: auto;
}

/* Horizontal Rule */
.article-content :deep(hr) {
  margin: 3rem 0;
  border: none;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgb(var(--v-theme-outline-variant)),
    transparent
  );
}

/* Line Breaks */
.article-content :deep(br) {
  line-height: 2;
}

/* Links */
.article-content :deep(a) {
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
  text-decoration-color: rgb(var(--v-theme-primary));
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.article-content :deep(a:hover) {
  color: rgb(var(--v-theme-primary));
  text-decoration-thickness: 2px;
  opacity: 0.8;
}

.article-content :deep(a:focus) {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
  border-radius: 2px;
}

/* Tables */
.article-content :deep(table) {
  width: 100%;
  margin: 2rem 0;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.article-content :deep(th),
.article-content :deep(td) {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid rgb(var(--v-theme-outline-variant));
}

.article-content :deep(th) {
  background: rgb(var(--v-theme-surface-variant));
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

/* Responsive Design */
@media (max-width: 768px) {
  .article-content {
    font-size: 1rem;
  }
  
  .article-content :deep(h1) {
    font-size: 2rem;
    margin-top: 2rem;
  }
  
  .article-content :deep(h2) {
    font-size: 1.5rem;
    margin-top: 2rem;
  }
  
  .article-content :deep(h3) {
    font-size: 1.25rem;
    margin-top: 1.5rem;
  }
  
  .article-content :deep(blockquote) {
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
  }
  
  .article-content :deep(pre) {
    padding: 1rem;
    margin: 1.5rem 0;
  }
}
</style>
