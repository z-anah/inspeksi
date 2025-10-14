<script setup>
import { supabase } from '@/libs/supabase'
import faqImg from '@images/front-pages/landing-page/faq.png'
import { onMounted, ref } from 'vue'

const faqData = ref([])

const fetchFaqs = async () => {
  const { data, error } = await supabase
    .from('faqs')
    .select('question, answer')
    .order('created_at', { ascending: false })
  if (!error && data) {
    faqData.value = data
  }
}

onMounted(fetchFaqs)
</script>

<template>
  <div id="faq">
    <VContainer>
      <!-- 👉 Header  -->
      <div class="faq-section">
        <div class="headers d-flex justify-center flex-column align-center">
          <div class="text-center mb-4">
            <VChip color="primary" class="mb-2 text-dark font-weight-medium px-4 py-1 rounded-pill" size="small">
              Pertanyaan yang Sering Diajukan
            </VChip>
            <h2 class="mb-3 text-h4 lg:text-h2 md:text-h3">
              Jelajahi FAQ berikut untuk menemukan jawaban
            </h2>
          </div>
        </div>
        <VExpansionPanels class="pt-8">
          <VExpansionPanel v-for="faq in faqData" :key="faq.question">
            <VExpansionPanelTitle>
              {{ faq.question }}
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              {{ faq.answer }}
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </div>
    </VContainer>
  </div>
</template>

<style lang="scss" scoped>
.faq-section {
  margin-block: 3rem;
}

@media (max-width: 600px) {
  .faq-section {
    margin-block: 2rem;
  }
}

#faq {
  border-radius: 3.75rem 3.75rem 0 0;
  background-color: rgba(var(--v-theme-background));
}

.section-title {
  font-size: 24px;
  font-weight: 800;
  line-height: 36px;
}

.section-title::after {
  position: absolute;
  background: url("../../../assets/images/front-pages/icons/section-title-icon.png") no-repeat left bottom;
  background-size: contain;
  block-size: 100%;
  content: "";
  font-weight: 800;
  inline-size: 130%;
  inset-block-end: 12%;
  inset-inline-start: -12%;
}
</style>
