<script setup>
import { supabase } from '@/libs/supabase'
import cuImg from '@images/front-pages/landing-page/contact-us.png'
import { onMounted, ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

const whatsappNumber = ref('')

// Fetch WhatsApp number from Supabase
const fetchWhatsAppNumber = async () => {
  const { data, error } = await supabase
    .from('content')
    .select('value')
    .eq('section', 'contact')
    .eq('key', 'wa')
    .single()
  if (!error && data) {
    whatsappNumber.value = data.value
  }
}

function sendToWhatsApp() {
  if (!whatsappNumber.value) return
  const text = `Nama: ${name.value}\nEmail: ${email.value}\nPesan: ${message.value}`
  const url = `https://wa.me/${whatsappNumber.value}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')
}

onMounted(fetchWhatsAppNumber)
</script>

<template>
  <div class="bg-surface">
  <VContainer id="contact-us">
    <!-- 👉 Headers  -->
    <div class="contact-us-section">
      <div class="headers d-flex justify-center flex-column align-center">
        <div class="text-center mb-4">
          <VChip color="primary" class="mb-2 text-dark font-weight-medium px-4 py-1 rounded-pill" size="small">
            Hubungi Kami
          </VChip>
          <h2 class="mb-3 text-h4 lg:text-h2 md:text-h3">
            Ada pertanyaan atau masukan? Tulis pesan untuk kami
          </h2>
        </div>
      </div>
      <div class="mb-8">
        <VCard>
          <VCardText>
            <VForm @submit.prevent="sendToWhatsApp">
              <VRow>
                <VCol cols="12" md="6">
                  <AppTextField v-model="name" placeholder="Prabowo" label="Nama Lengkap" />
                </VCol>

                <VCol cols="12" md="6">
                  <AppTextField v-model="email" placeholder="prabowo@gmail.com" label="Alamat Email" />
                </VCol>

                <VCol cols="12">
                  <AppTextarea v-model="message" placeholder="Tulis pesan Anda..." rows="3" label="Pesan" />
                </VCol>

                <VCol>
                  <VBtn type="submit">
                    Kirim Pesan
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </div>
    </div>
  </VContainer>
  </div>
</template>

<style lang="scss" scoped>
.contact-us-section {
  margin-block: 3rem;
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
  inline-size: 120%;
  inset-block-end: 12%;
  inset-inline-start: -12%;
}

.contact-card {
  position: relative;
}

.contact-card::before {
  position: absolute;
  content: url("@images/front-pages/icons/contact-border.png");
  inset-block-start: -2.5rem;
  inset-inline-start: -2.5rem;
}

@media screen and (max-width: 999px) {
  .contact-card::before {
    display: none;
  }
}
</style>
