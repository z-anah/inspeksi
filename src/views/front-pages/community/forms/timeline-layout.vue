<script setup>
defineProps({
  forms: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <VCard>
    <VCardText class="pa-6">
      <h2 class="text-h6 font-weight-medium mb-4">Timeline</h2>

      <VTimeline>
        <VTimelineItem v-for="(form, index) in forms" :key="'time-' + form.id" size="small" dot-color="primary">
          <template #icon>
            <span class="text-caption font-weight-medium">{{ index + 1 }}</span>
          </template>

          <div>
            <VImg :src="form.image" :alt="form.title" width="128" height="80" class="rounded mb-2" cover />

            <h4 class="text-body-1 font-weight-medium">{{ form.title }}</h4>
            <p class="text-caption text-medium-emphasis">{{ form.category }}</p>
          </div>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>
