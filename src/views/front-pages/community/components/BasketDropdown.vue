<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const isBasketOpen = ref(false)
const basketRef = ref()

const toggleBasket = (e) => {
  e.stopPropagation()
  isBasketOpen.value = !isBasketOpen.value
}

const closeBasket = () => {
  isBasketOpen.value = false
}

const proceedToCheckout = () => {
  cartStore.sendWhatsAppOrder()
  isBasketOpen.value = false
}
</script>

<template>
  <div ref="basketRef">
    <!-- Basket Trigger Button -->
    <VBtn icon variant="text" @click="toggleBasket"
      color="rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))">
      <VIcon icon="tabler-shopping-cart" size="24" />

      <!-- Item Count Badge -->
      <VBadge v-if="cartStore.itemCount > 0" :content="cartStore.itemCount" color="error" floating offset-x="4" offset-y="4" />

      <VTooltip activator="parent" open-delay="1000" scroll-strategy="close">
        <span>Keranjang Belanja ({{ cartStore.itemCount }} item)</span>
      </VTooltip>
    </VBtn>

    <!-- Basket Dropdown Menu -->
    <VMenu v-model="isBasketOpen" :activator="basketRef" :close-on-content-click="false" location="bottom end"
      offset="8" max-width="900" min-width="800">
      <VCard>
        <!-- Header -->
        <VCardTitle class="d-flex align-center justify-space-between pa-4 pb-2">
          <div class="d-flex align-center ga-2">
            <VIcon icon="tabler-shopping-cart" size="16" />
            <span class="text-body-1 font-weight-medium">Keranjang Belanja</span>
            <VChip size="x-small" color="primary">{{ cartStore.itemCount }}</VChip>
          </div>
          <VBtn icon="tabler-x" variant="text" size="x-small" @click="closeBasket" />
        </VCardTitle>

        <VDivider />

        <!-- Basket Content -->
        <VCardText class="pa-0" style="max-height: 400px; overflow-y: auto;">
          <!-- Empty State -->
          <div v-if="cartStore.items.length === 0" class="text-center py-6">
            <VIcon icon="tabler-shopping-cart-off" size="32" class="text-medium-emphasis mb-2" />
            <div class="text-body-1 font-weight-medium mb-1">Keranjang Anda kosong</div>
            <div class="text-body-2 text-medium-emphasis mb-3">Tambahkan beberapa item untuk memulai</div>
            <VBtn color="primary" variant="tonal" size="small" @click="closeBasket">
              Lanjut Belanja
            </VBtn>
          </div>

          <!-- Basket Items -->
          <div v-else>
            <div v-for="item in cartStore.items" :key="item.id" class="d-flex align-center ga-4 pa-4 border-b">
              <!-- Product Image -->
              <div style="width: 60px; height: 60px;">
                <VImg 
                  :src="item.primary_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=60&h=60&fit=crop'" 
                  :alt="item.name" 
                  width="60" 
                  height="60" 
                  class="rounded flex-shrink-0" 
                  cover 
                />
              </div>

              <!-- Product Details -->
              <div class="flex-grow-1">
                <h4 class="text-body-1 font-weight-medium mb-1">{{ item.name }}</h4>
                <VChip size="x-small" variant="tonal" class="mb-2">{{ item.category }}</VChip>
                <div class="text-body-1 text-primary font-weight-medium">
                  Rp {{ cartStore.formatPrice(item.price * item.qty) }}
                </div>
              </div>

              <!-- Quantity Controls -->
              <div class="d-flex align-center ga-2">
                <VBtn icon="tabler-minus" variant="outlined" size="x-small" @click="cartStore.decreaseQuantity(item.id)" />
                <div class="text-body-1 font-weight-medium px-3">{{ item.qty }}</div>
                <VBtn icon="tabler-plus" variant="outlined" size="x-small" @click="cartStore.increaseQuantity(item.id)" />
              </div>
            </div>

            <!-- Basket Summary -->
            <div class="pa-4">
              <div class="d-flex justify-space-between mb-3">
                <span class="text-body-1 font-weight-medium">Total:</span>
                <span class="text-body-1 text-primary font-weight-bold">Rp {{ cartStore.formatPrice(cartStore.total) }}</span>
              </div>

              <!-- Action Buttons -->
              <div class="d-flex flex-column ga-2">
                <VBtn 
                  color="primary" 
                  variant="flat" 
                  block 
                  size="small" 
                  prepend-icon="tabler-brand-whatsapp"
                  @click="proceedToCheckout"
                  :disabled="!cartStore.whatsappNumber"
                >
                  Pesan via WhatsApp
                </VBtn>
                <VBtn variant="outlined" block size="small" @click="closeBasket">
                  Lanjut Belanja
                </VBtn>
              </div>

              <!-- Clear Basket -->
              <div class="text-center mt-2">
                <VBtn variant="text" size="x-small" color="error" @click="cartStore.clearCart">
                  Kosongkan Keranjang
                </VBtn>
              </div>
            </div>
          </div>
        </VCardText>
      </VCard>
    </VMenu>
  </div>
</template>

<style scoped>
.border-b {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.border-b:last-child {
  border-bottom: none;
}
</style>