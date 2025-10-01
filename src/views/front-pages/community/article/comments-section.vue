<script setup>
import { ref } from 'vue';

defineProps({
  comments: {
    type: Array,
    required: true
  },
  articleId: {
    type: Number,
    required: true
  }
})

const newComment = ref('')
</script>

<template>
  <section>
    <h3 class="text-h5 font-weight-medium mb-4">Comments</h3>

    <!-- Add Comment -->
    <VCard class="mb-6">
      <VCardText>
        <VTextarea v-model="newComment" placeholder="Share your thoughts..." variant="outlined" rows="3" class="mb-4" />
        <div class="d-flex justify-end">
          <VBtn color="primary">Post Comment</VBtn>
        </div>
      </VCardText>
    </VCard>

    <!-- Comments List -->
    <div class="d-flex flex-column ga-4">
      <VCard v-for="comment in comments" :key="comment.id">
        <VCardText>
          <div class="d-flex ga-3">
            <VAvatar :image="comment.avatar" size="40" class="flex-shrink-0" />
            <div class="flex-grow-1">
              <div class="d-flex align-center ga-2 mb-2">
                <span class="font-weight-medium">{{ comment.author }}</span>
                <span class="text-caption text-medium-emphasis">{{ comment.date }}</span>
              </div>
              <p class="text-body-2 mb-2">{{ comment.content }}</p>
              <div class="d-flex align-center ga-3">
                <VBtn variant="text" size="small" prepend-icon="tabler-heart">
                  {{ comment.likes }}
                </VBtn>
                <VBtn variant="text" size="small">
                  Reply
                </VBtn>
              </div>

              <!-- Replies -->
              <div v-if="comment.replies && comment.replies.length > 0" class="mt-4 ml-4 pl-4"
                style="border-left: 2px solid rgba(var(--v-border-color), var(--v-border-opacity))">
                <div v-for="reply in comment.replies" :key="reply.id" class="d-flex ga-3 mb-3">
                  <VAvatar :image="reply.avatar" size="32" class="flex-shrink-0" />
                  <div>
                    <div class="d-flex align-center ga-2 mb-1">
                      <span class="font-weight-medium text-body-2">{{ reply.author }}</span>
                      <span class="text-caption text-medium-emphasis">{{ reply.date }}</span>
                    </div>
                    <p class="text-body-2 mb-1">{{ reply.content }}</p>
                    <VBtn variant="text" size="x-small" prepend-icon="tabler-heart">
                      {{ reply.likes }}
                    </VBtn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </VCardText>
      </VCard>
    </div>
  </section>
</template>
