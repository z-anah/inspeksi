<script setup>
defineProps({
  navigation: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section>
    <VRow>
      <VCol v-if="navigation.previous" cols="12" md="6">
        <VCard class="h-100">
          <VCardText class="d-flex ga-3">
            <VImg :src="navigation.previous.image" :alt="navigation.previous.title" width="60" height="60"
              class="flex-shrink-0 rounded" cover />
            <div>
              <p class="text-caption text-medium-emphasis mb-1">Previous Article</p>
              <h4 class="text-body-1 font-weight-medium">{{ navigation.previous.title }}</h4>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol v-if="navigation.next" cols="12" md="6">
        <VCard class="h-100">
          <VCardText class="d-flex ga-3">
            <div class="text-right flex-grow-1">
              <p class="text-caption text-medium-emphasis mb-1">Next Article</p>
              <h4 class="text-body-1 font-weight-medium">{{ navigation.next.title }}</h4>
            </div>
            <VImg :src="navigation.next.image" :alt="navigation.next.title" width="60" height="60"
              class="flex-shrink-0 rounded" cover />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>
