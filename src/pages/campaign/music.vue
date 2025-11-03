<script setup>
import { ref, computed } from 'vue'
import Navbar from '@/views/front-pages/front-page-navbar.vue'
import Footer from '@/views/front-pages/front-page-footer.vue'

const musicList = [
  { title: "Musik Integritas dan Antikorupsi", url: "https://youtu.be/kDsrZM0WJBY" },
  { title: "Fiktif", url: "https://youtu.be/DL4JTEbeYVo" },
  { title: "Bahagia Dari Kardus", url: "https://youtu.be/hzK82TRjw38" },
  { title: "Tak Akan Punah", url: null },
  { title: "Analogi Hujan", url: "https://youtu.be/WpLrAmu1GXw" },
  { title: "1 Centi", url: "https://youtu.be/C4_eeUu9ZOo" }
]

const search = ref('')
const loading = ref(false)
const preview = ref({ open: false, url: null, title: '' })

function getYouTubeId(url) {
  if (!url) return null
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/)
  return match ? match[1] : null
}

function getThumbnail(url) {
  const id = getYouTubeId(url)
  return id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : 'https://via.placeholder.com/400x225?text=No+Preview'
}

const filteredMusic = computed(() =>
  musicList.filter(m =>
    m.title.toLowerCase().includes(search.value.toLowerCase())
  )
)

function openPreview(song) {
  if (!song.url) return
  preview.value = { open: true, url: song.url, title: song.title }
}
function closePreview() {
  preview.value = { open: false, url: null, title: '' }
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
  <div class="music-gallery-wrapper">
    <VContainer class="py-8" style="max-width: 1200px;">
      <div class="d-flex flex-column flex-md-row justify-space-between align-center mb-8 ga-4">
        <div>
          <h1 class="text-h4 font-weight-bold mb-1">Musik Integritas dan Antikorupsi</h1>
          <div class="text-medium-emphasis">Kumpulan lagu bertema integritas & antikorupsi</div>
        </div>
        <VTextField
          v-model="search"
          prepend-inner-icon="tabler-search"
          placeholder="Cari lagu..."
          variant="solo"
          hide-details
          style="max-width: 300px"
        />
      </div>

      <VRow class="music-grid" align="stretch" dense>
        <template v-if="loading">
          <VCol v-for="i in 6" :key="i" cols="12" sm="6" md="4">
            <div class="music-card skeleton"></div>
          </VCol>
        </template>
        <template v-else>
          <VCol
            v-for="song in filteredMusic"
            :key="song.title"
            cols="12"
            sm="6"
            md="4"
            class="d-flex"
          >
            <div
              class="music-card"
              :class="{ unavailable: !song.url }"
              @click="openPreview(song)"
              tabindex="0"
              :aria-disabled="!song.url"
            >
              <div class="music-thumb-wrapper">
                <VImg
                  :src="getThumbnail(song.url)"
                  aspect-ratio="16/9"
                  class="music-thumb"
                  :lazy-src="'https://via.placeholder.com/400x225?text=Loading...'"
                  cover
                >
                  <template #placeholder>
                    <div class="music-thumb-skeleton"></div>
                  </template>
                </VImg>
                <VBtn
                  v-if="song.url"
                  icon="tabler-player-play-filled"
                  color="primary"
                  class="music-play-btn"
                  variant="flat"
                  @click.stop="openPreview(song)"
                  :aria-label="`Putar ${song.title}`"
                />
                <VChip
                  v-else
                  color="grey"
                  size="small"
                  class="music-unavailable-badge"
                  label
                >
                  Tidak Tersedia
                </VChip>
              </div>
              <div class="music-info">
                <div class="music-title text-h6 font-weight-medium">
                  {{ song.title }}
                </div>
              </div>
            </div>
          </VCol>
        </template>
      </VRow>

      <div v-if="!loading && filteredMusic.length === 0" class="text-center py-8">
        <VIcon icon="tabler-music-off" size="64" class="text-medium-emphasis mb-4" />
        <h3 class="text-h5 font-weight-medium mb-2">Tidak ada lagu ditemukan</h3>
        <p class="text-body-1 text-medium-emphasis mb-4">
          Coba kata kunci lain atau hapus filter pencarian.
        </p>
        <VBtn color="primary" variant="tonal" @click="search = ''">
          Hapus filter
        </VBtn>
      </div>
    </VContainer>

    <!-- Video Modal -->
    <VDialog v-model="preview.open" max-width="700" persistent>
      <VCard>
        <VCardTitle class="d-flex justify-space-between align-center">
          <span>{{ preview.title }}</span>
          <VBtn icon="tabler-x" variant="text" @click="closePreview" />
        </VCardTitle>
        <VCardText>
          <div v-if="preview.url" class="video-embed">
            <iframe
              :src="`https://www.youtube.com/embed/${getYouTubeId(preview.url)}?autoplay=1`"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              style="width:100%;aspect-ratio:16/9;border-radius:12px;"
            ></iframe>
          </div>
        </VCardText>
      </VCard>
    </VDialog>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.music-gallery-wrapper {
  margin-block: 8rem 3rem;
  min-height: 70vh;
  background: #fafbfc;
}

.music-grid {
  row-gap: 2rem;
  column-gap: 0;
}

.music-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(40, 40, 40, 0.07);
  transition: box-shadow 0.18s, transform 0.18s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 260px;
  position: relative;
  overflow: hidden;

  &:hover,
  &:focus-visible {
    box-shadow: 0 6px 24px 0 rgba(40, 40, 40, 0.13);
    transform: translateY(-2px) scale(1.015);
    .music-thumb {
      filter: brightness(1.08) saturate(1.1);
      scale: 1.03;
    }
    .music-play-btn {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  &.unavailable {
    cursor: not-allowed;
    opacity: 0.7;
    .music-play-btn {
      display: none;
    }
  }
}

.music-thumb-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #e9ecef;
}

.music-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.18s, scale 0.18s;
  border-radius: 0;
}

.music-thumb-skeleton {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
  animation: skeleton-loading 1.2s infinite linear;
  border-radius: 0;
}

@keyframes skeleton-loading {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.music-play-btn {
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 2;
  opacity: 0.92;
  transition: opacity 0.18s, transform 0.18s;
  box-shadow: 0 2px 8px 0 rgba(40,40,40,0.13);
}

.music-unavailable-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  background: #e0e0e0 !important;
  color: #888 !important;
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
}

.music-info {
  padding: 1.1rem 1.2rem 1.2rem 1.2rem;
  flex: 1 1 auto;
  display: flex;
  align-items: flex-end;
}

.music-title {
  color: #222;
  font-size: 1.13rem;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: 0.01em;
  margin-bottom: 0;
  word-break: break-word;
}

.skeleton {
  background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
  animation: skeleton-loading 1.2s infinite linear;
  border-radius: 18px;
  min-height: 260px;
}

@media (max-width: 960px) {
  .music-gallery-wrapper {
    .v-container {
      padding-inline: 1rem !important;
    }
  }
  .music-card {
    min-height: 210px;
  }
}
</style>