<script setup>
import { supabase } from '@/libs/supabase'
import { onMounted, ref } from 'vue'

// WhatsApp number from Supabase
const whatsappNumber = ref('')

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

onMounted(fetchWhatsAppNumber)
</script>

<template>
  <div class="footer">

    <!-- 👉 Footer Line -->
    <div class="footer-line w-100">
      <VContainer>
        <div class="d-flex justify-space-between flex-wrap gap-y-5 align-center">
          <div class="text-body-1 text-white-variant text-wrap me-4">
            &copy;

            {{ new Date().getFullYear() }}
            Inspeksi
          </div>
        </div>
      </VContainer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-title {
  color: rgba(255, 255, 255, 92%);
}

.footer-top {
  border-radius: 60px 60px 0 0;
  background-size: cover;
  color: #fff;
}

.footer-links {

  .text-white-variant,
  .text-body-1 {
    &:hover {
      color: #fff;
    }
  }
}

.footer-line {
  background: #000;
}
</style>

<style lang="scss">
.subscribe-form {
  .v-label {
    color: rgba(225, 222, 245, 90%) !important;
  }

  .v-field {
    border-end-end-radius: 0;
    border-end-start-radius: 10px;
    border-start-end-radius: 0;
    border-start-start-radius: 10px;

    input.v-field__input::placeholder {
      color: rgba(225, 222, 245, 40%) !important;
    }

    input.v-field__input {
      color: rgba(255, 255, 255, 78%);
    }
  }
}

.footer {
  border-radius: 50%;

  @media (min-width: 600px) and (max-width: 960px) {
    .v-container {
      padding-inline: 2rem !important;
    }

    .footer-logo-buttons {
      gap: 0.75rem;
    }
  }
}
</style>
