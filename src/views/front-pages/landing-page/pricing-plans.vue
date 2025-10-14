<script setup>
import paperPlane from '@images/front-pages/icons/paper-airplane.png'
import plane from '@images/front-pages/icons/plane.png'
import pricingPlanArrow from '@images/front-pages/icons/pricing-plans-arrow.png'
import shuttleRocket from '@images/front-pages/icons/shuttle-rocket.png'

const annualMonthlyPlanPriceToggler = ref(true)

const pricingPlans = [
  {
    title: 'Dasar',
    image: paperPlane,
    monthlyPrice: 19,
    yearlyPrice: 168,
    features: [
      'Linimasa',
      'Pencarian dasar',
      'Widget chat langsung',
      'Pemasaran email',
      'Formulir kustom',
      'Analitik lalu lintas',
      'Dukungan dasar',
    ],
    supportType: 'Dasar',
    supportMedium: 'Hanya Email',
    respondTime: 'Rata-rata: 24 jam',
    current: false,
  },
  {
    title: 'Favorit',
    image: plane,
    monthlyPrice: 29,
    yearlyPrice: 264,
    features: [
      'Semua fitur dasar',
      'Linimasa dengan database',
      'Pencarian lanjutan',
      'Otomasi pemasaran',
      'Chatbot lanjutan',
      'Manajemen kampanye',
      'Alat kolaborasi',
    ],
    supportType: 'Standar',
    supportMedium: 'Email & Chat',
    respondTime: 'Rata-rata: 6 jam',
    current: true,
  },
  {
    title: 'Standar',
    image: shuttleRocket,
    monthlyPrice: 49,
    yearlyPrice: 444,
    features: [
      'Manajemen kampanye',
      'Linimasa dengan database',
      'Pencarian fuzzy',
      'Sandbox A/B testing',
      'Izin kustom',
      'Otomasi media sosial',
      'Alat otomasi penjualan',
    ],
    supportType: 'Eksklusif',
    supportMedium: 'Email, Chat & Google Meet',
    respondTime: 'Dukungan Langsung',
    current: false,
  },
]
</script>

<template>
  <div id="pricing-plan">
    <VContainer>
      <div class="pricing-plans">
        <!-- 👉 Headers  -->
        <div class="headers d-flex justify-center flex-column align-center flex-wrap">
          <VChip
            label
            color="primary"
            class="mb-4"
            size="small"
          >
            Paket Harga
          </VChip>
          <h4 class="d-flex align-center text-h4 mb-1 flex-wrap justify-center">
            <div class="position-relative me-2">
              <div class="section-title">
                Paket desain yang disesuaikan
              </div>
            </div>
            dirancang untuk Anda
          </h4>
          <div class="text-center text-body-1">
            <p class="mb-0">
              Semua paket mencakup 40+ alat dan fitur canggih untuk meningkatkan produk Anda.
            </p>
            <p class="mb-0">
              Pilih paket terbaik yang sesuai dengan kebutuhan Anda.
            </p>
          </div>
        </div>
        <!-- 👉 Annual and monthly price toggler -->
        <div class="d-flex align-center justify-center mx-auto mt-6 mb-16">
          <VLabel
            for="pricing-plan-toggle"
            class="me-3"
          >
            Bayar Bulanan
          </VLabel>
          <div class="position-relative">
            <VSwitch
              id="pricing-plan-toggle"
              v-model="annualMonthlyPlanPriceToggler"
            >
              <template #label>
                <div class="text-body-1">
                  Bayar Tahunan
                </div>
              </template>
            </VSwitch>
            <div class="position-absolute pricing-plan-arrow d-md-flex d-none">
              <VImg
                :src="pricingPlanArrow"
                class="flip-in-rtl"
                width="60"
                height="42"
              />
              <div class="text-no-wrap text-body-1 font-weight-medium">
                Hemat 25%
              </div>
            </div>
          </div>
        </div>
        <VRow>
          <VCol
            v-for="(plan, index) in pricingPlans"
            :key="index"
          >
            <VCard :style="plan.current ? 'border:2px solid rgb(var(--v-theme-primary))' : ''">
              <VCardText class="pa-8 pt-12">
                <VImg
                  :src="plan.image"
                  width="88"
                  height="88"
                  class="mx-auto mb-8"
                />
                <h4 class="text-h4 text-center">
                  {{ plan.title }}
                </h4>
                <div class="d-flex justify-center mb-8 position-relative">
                  <div class="d-flex align-end">
                    <div class="pricing-title text-primary me-1">
                      ${{ annualMonthlyPlanPriceToggler ? Math.floor(plan.yearlyPrice) / 12 : plan.monthlyPrice }}
                    </div>
                    <span class="text-disabled mb-2">/mo</span>
                  </div>

                  <!-- 👉 Annual Price -->
                  <span
                    v-show="annualMonthlyPlanPriceToggler"
                    class="annual-price-text position-absolute text-sm text-disabled"
                  >
                    {{ plan.yearlyPrice === 0 ? 'free' : `USD ${plan.yearlyPrice}/Year` }}
                  </span>
                </div>
                <VList class="card-list">
                  <VListItem
                    v-for="(item, i) in plan.features"
                    :key="i"
                  >
                    <template #prepend>
                      <VAvatar
                        size="16"
                        :variant="!plan.current ? 'tonal' : 'elevated'"
                        color="primary"
                        class="me-3"
                      >
                        <VIcon
                          icon="tabler-check"
                          size="12"
                          :color="!plan.current ? 'primary' : 'white'"
                        />
                      </VAvatar>
                      <h6 class="text-h6">
                        {{ item }}
                      </h6>
                    </template>
                  </VListItem>
                </VList>
                <VBtn
                  block
                  :variant="plan.current ? 'elevated' : 'tonal'"
                  class="mt-8"
                  :to="{ name: 'front-pages-payment' }"
                >
                  Mulai Sekarang
                </VBtn>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </div>
    </VContainer>
  </div>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 12px;
}

#pricing-plan {
  border-radius: 3.75rem;
  background-color: rgb(var(--v-theme-background));
}

.pricing-title {
  font-size: 38px;
  font-weight: 800;
  line-height: 52px;
}

.pricing-plans {
  margin-block: 5.25rem;
}

@media (max-width: 600px) {
  .pricing-plans {
    margin-block: 4rem;
  }
}

.save-upto-chip {
  inset-block-start: -1.5rem;
  inset-inline-end: -7rem;
}

.pricing-plan-arrow {
  inset-block-start: -0.5rem;
  inset-inline-end: -8rem;
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
  font-weight: 700;
  inline-size: 120%;
  inset-block-end: 0;
  inset-inline-start: -12%;
}

.annual-price-text {
  inset-block-end: -40%;
}
</style>
