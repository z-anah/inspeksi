<script setup>
defineProps({
  products: {
    type: Array,
    required: true
  },
  cart: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['add-to-cart'])

const handleAddToCart = (product) => {
  emit('add-to-cart', product, 1)
}

import { ref, reactive } from 'vue'

const dialog = ref(false)
const dialogImage = ref('')
const dialogTitle = ref('')

// Zoom & Pan state
const zoom = ref(1)
const minZoom = 1
const maxZoom = 4
const translate = reactive({ x: 0, y: 0 })
const dragging = ref(false)
const dragStart = reactive({ x: 0, y: 0 })
const imgStart = reactive({ x: 0, y: 0 })

const openImageDialog = (product) => {
  dialogImage.value = product.image
  dialogTitle.value = product.name
  dialog.value = true
  zoom.value = 1
  translate.x = 0
  translate.y = 0
}

function onWheel(e) {
  let newZoom = zoom.value + (e.deltaY < 0 ? 0.2 : -0.2)
  newZoom = Math.min(maxZoom, Math.max(minZoom, newZoom))
  if (newZoom !== zoom.value) {
    // Adjust translate to zoom towards mouse pointer
    const rect = e.target.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    const dx = (mx - rect.width / 2) / zoom.value
    const dy = (my - rect.height / 2) / zoom.value
    translate.x -= dx * (newZoom - zoom.value)
    translate.y -= dy * (newZoom - zoom.value)
    zoom.value = newZoom
  }
}

function startDrag(e) {
  if (zoom.value === 1) return
  dragging.value = true
  dragStart.x = e.clientX
  dragStart.y = e.clientY
  imgStart.x = translate.x
  imgStart.y = translate.y
  window.addEventListener('mouseup', endDrag)
  window.addEventListener('mousemove', onDrag)
}

function onDrag(e) {
  if (!dragging.value) return
  translate.x = imgStart.x + (e.clientX - dragStart.x)
  translate.y = imgStart.y + (e.clientY - dragStart.y)
}

function endDrag() {
  dragging.value = false
  window.removeEventListener('mouseup', endDrag)
  window.removeEventListener('mousemove', onDrag)
}

function resetZoom() {
  zoom.value = 1
  translate.x = 0
  translate.y = 0
}

// Touch events for mobile
let lastTouch = null
function startTouch(e) {
  if (e.touches.length === 1) {
    dragging.value = true
    dragStart.x = e.touches[0].clientX
    dragStart.y = e.touches[0].clientY
    imgStart.x = translate.x
    imgStart.y = translate.y
    lastTouch = null
  } else if (e.touches.length === 2) {
    dragging.value = false
    lastTouch = {
      dist: Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      ),
      zoom: zoom.value
    }
  }
}

function onTouchMove(e) {
  if (e.touches.length === 1 && dragging.value && zoom.value > 1) {
    translate.x = imgStart.x + (e.touches[0].clientX - dragStart.x)
    translate.y = imgStart.y + (e.touches[0].clientY - dragStart.y)
  } else if (e.touches.length === 2 && lastTouch) {
    const dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    )
    let newZoom = lastTouch.zoom * (dist / lastTouch.dist)
    newZoom = Math.min(maxZoom, Math.max(minZoom, newZoom))
    zoom.value = newZoom
  }
}

function endTouch() {
  dragging.value = false
  lastTouch = null
}
</script>

<template>
  <section>
    <VRow>
      <VCol v-for="product in products" :key="'grid-' + product.id" cols="12" sm="6" md="4">
        <VCard class="h-100">
          <div class="position-relative">
            <VImg
              :src="product.image"
              :alt="product.name"
              height="250"
              class="rounded-lg"
              style="cursor: pointer;"
              @click="openImageDialog(product)"
            />
          </div>

          <VCardText>
            <h3 class="text-h5 font-weight-medium text-info">{{ product.name }}</h3>
            <p class="text-body-2 text-medium-emphasis">{{ product.description }}</p>
            <span class="text-h6 text-primary">Rp {{ new Intl.NumberFormat('id-ID').format(product.price) }}</span>
            <span v-if="product.originalPrice > product.price"
              class="text-decoration-line-through text-medium-emphasis ms-2">
              Rp {{ new Intl.NumberFormat('id-ID').format(product.originalPrice) }}
            </span>
          </VCardText>

          <VCardActions>
            <VBtn 
              color="primary" 
              variant="flat" 
              block 
              :disabled="!product.inStock"
              @click="handleAddToCart(product)"
            >
              {{ product.inStock ? 'Tambah ke Keranjang' : 'Stok Habis' }}
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
    <!-- Image Dialog -->
    <VDialog v-model="dialog">
      <VCard>
        <div
          style="overflow: hidden; position: relative; width: 100%; height: 400px; background: #000;"
        >
          <VImg
            :src="dialogImage"
            :alt="dialogTitle"
            class="rounded-t-lg"
            :style="{
              transform: `scale(${zoom}) translate(${translate.x}px, ${translate.y}px)`,
              transition: dragging ? 'none' : 'transform 0.2s',
              cursor: dragging ? 'grabbing' : zoom > 1 ? 'grab' : 'zoom-in',
              userSelect: 'none'
            }"
            @mousedown="startDrag"
            @mousemove="onDrag"
            @mouseup="endDrag"
            @mouseleave="endDrag"
            @wheel.prevent="onWheel"
            @touchstart="startTouch"
            @touchmove="onTouchMove"
            @touchend="endTouch"
            draggable="false"
          />
        </div>
        <VCardTitle class="text-h6">{{ dialogTitle }}</VCardTitle>
        <VCardActions>
          <VBtn icon @click="resetZoom" title="Reset Zoom">
            <VIcon>mdi-magnify-scan</VIcon>
          </VBtn>
          <VSpacer />
          <VBtn color="primary" text @click="dialog = false">Tutup</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </section>
</template>
