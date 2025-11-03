<script setup>
import { ref, computed } from 'vue'
import Navbar from '@/views/front-pages/front-page-navbar.vue'
import Footer from '@/views/front-pages/front-page-footer.vue'

// Film data (static)
const filmCategories = [
  {
    title: "Film Antikorupsi",
    gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    films: [
      { title: "Kita Vs Korupsi", url: "" },
      { title: "Selamat Siang Risa", url: "https://youtu.be/8IUaqtmgc2E?si=VNO373M6lD3A2LeQ" },
      { title: "Aku Padamu", url: "https://youtu.be/hMzpz3hWKRU?si=9FaPgR0fGOaHNu3x" },
      { title: "Rumah Perkara", url: "https://youtu.be/7FlZ2p-oyRY?si=NjNvb267EUDXYgQ5" },
      { title: "Pssst Jangan Bilang Siapa-Siapa", url: "https://youtu.be/6u4mHHe7slY?si=AXAtgdLxrQ3RM6N5" }
    ]
  },
  {
    title: "Anticorruption Film Festival 2023",
    gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    films: [
      { title: "Unjuk Pakai Rasa", url: "https://youtu.be/ijAAaVvSnSY?si=7JMO5jOR0RgqrD5V" },
      { title: "Ada Yang Salah Dengan Cinta", url: "https://youtu.be/rBgbCDsPaVk?si=IR9Jcxj_-WIPuhgK" },
      { title: "Ino To Kodiho", url: "https://youtu.be/9-DBUgUUcCg?si=e_Hte30cyShhAMGY" },
      { title: "Kronik Puriwicara", url: "https://youtu.be/Dbgkc2LHmcQ?si=KGqs8jyXm4GE_qkP" },
      { title: "Galatiak", url: "https://youtu.be/z9yCbrVvMWE?si=GryMkoy9V4v_mr-0" },
      { title: "Hitler Mati di Surabaya", url: "https://youtu.be/rBRratroQe0?si=OImj11bCcV3x63Kx" }
    ]
  },
  {
    title: "Film Inspeksi",
    gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    films: []
  }
]

const search = ref('')
const modalOpen = ref(false)
const selectedFilm = ref(null)

// Filtered films per category
const filteredCategories = computed(() => {
  if (!search.value.trim()) return filmCategories
  const q = search.value.toLowerCase()
  return filmCategories.map(cat => ({
    ...cat,
    films: cat.films.filter(f => f.title.toLowerCase().includes(q))
  }))
})

function openModal(film) {
  selectedFilm.value = film
  modalOpen.value = true
}
function closeModal() {
  modalOpen.value = false
  selectedFilm.value = null
}

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})
</script>

<template>
  <Navbar />
  <div class="film-dashboard">
    <VContainer class="py-8" style="max-width: 1200px;">
      <!-- Search Bar -->
      <div class="d-flex flex-column flex-md-row justify-space-between align-center mb-8 ga-4">
        <div>
          <h1 class="text-h4 font-weight-bold mb-1">Film Integritas dan Antikorupsi</h1>
          <div class="text-medium-emphasis">Kumpulan film bertema integritas & antikorupsi</div>
        </div>
        <VTextField
          v-model="search"
          prepend-inner-icon="tabler-search"
          placeholder="Cari judul film..."
          variant="solo"
          hide-details
          style="max-width: 300px"
        />
      </div>

      <!-- List all categories and their films -->
      <div v-for="cat in filteredCategories" :key="cat.title" class="mb-10">
        <div class="text-h5 font-weight-bold mb-4" :style="{ background: cat.gradient || '', padding: cat.gradient ? '1rem' : '', borderRadius: cat.gradient ? '12px' : '' }">
          {{ cat.title }}
        </div>
        <div v-if="cat.films.length" class="film-grid-wrapper">
          <div class="film-grid">
            <div
              v-for="film in cat.films"
              :key="film.title"
              class="film-card"
              @click="film.url && openModal(film)"
              :class="{ 'is-disabled': !film.url }"
            >
              <div class="film-thumb">
                <img
                  v-if="film.url"
                  :src="`https://img.youtube.com/vi/${film.url.split('youtu.be/')[1]?.split('?')[0] || ''}/hqdefault.jpg`"
                  alt="Film thumbnail"
                  class="thumb-img"
                />
                <div v-else class="thumb-placeholder">
                  <VIcon icon="tabler-movie" size="48" />
                </div>
                <div v-if="film.url" class="play-overlay">
                  <VIcon icon="tabler-player-play-filled" size="40" />
                </div>
              </div>
              <div class="film-title">
                {{ film.title }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-12 text-medium-emphasis">
          <VIcon icon="tabler-movie-off" size="64" class="mb-4" />
          <div class="text-h6">Tidak ada film ditemukan</div>
        </div>
      </div>
    </VContainer>

    <!-- Modal Player -->
    <VDialog v-model="modalOpen" max-width="700" persistent>
      <VCard>
        <VCardTitle class="d-flex justify-space-between align-center">
          <span>{{ selectedFilm?.title }}</span>
          <VBtn icon="tabler-x" variant="text" @click="closeModal" />
        </VCardTitle>
        <VCardText>
          <div v-if="selectedFilm?.url" class="video-responsive mb-2">
            <iframe
              :src="`https://www.youtube.com/embed/${selectedFilm.url.split('youtu.be/')[1]?.split('?')[0]}`"
              frameborder="0"
              allowfullscreen
              style="width:100%;aspect-ratio:16/9;border-radius:12px;"
            ></iframe>
          </div>
          <div v-else class="text-medium-emphasis">Film belum tersedia secara daring.</div>
        </VCardText>
      </VCard>
    </VDialog>
    <Footer />
  </div>
</template>

<style lang="scss">
.film-dashboard {
  margin-block: 8rem 3rem;
  min-height: 100vh;
  transition: background 0.5s;
  .v-container {
    max-width: 1200px !important;
  }
}
.film-grid-wrapper {
  width: 100%;
}
.film-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  width: 100%;
}
.film-card {
  min-width: 260px;
  max-width: 280px;
  background: rgba(255,255,255,0.85);
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem 1rem 1rem 1rem;
  position: relative;
  &:hover:not(.is-disabled) {
    box-shadow: 0 6px 24px 0 rgba(0,0,0,0.16);
    transform: translateY(-4px) scale(1.03);
    .play-overlay {
      opacity: 1;
    }
  }
  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .film-thumb {
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    background: #e0e0e0;
    .thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .thumb-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
    }
    .play-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.32);
      opacity: 0;
      transition: opacity 0.2s;
      color: #fff;
      border-radius: 12px;
      pointer-events: none;
    }
  }
  .film-title {
    margin-top: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    color: #222;
    min-height: 2.5em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.video-responsive {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  iframe {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    border-radius: 12px;
  }
}
@media (max-width: 900px) {
  .film-grid {
    gap: 1.2rem;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}
@media (max-width: 600px) {
  .film-grid {
    gap: 1rem;
    grid-template-columns: 1fr;
  }
  .film-card {
    min-width: 100%;
    max-width: 100%;
  }
}
</style>