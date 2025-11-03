<script setup>
import { supabase } from '@/libs/supabase'
import { onMounted, ref } from 'vue'

const teamData = ref([])
const bgColors = [
  '#EEEEEE',
]
const borderColors = [
  '#E0E0E0',
]

const fetchTeam = async () => {
  const { data, error } = await supabase
    .from('team_members')
    .select('name, position, image_url')
    .order('created_at', { ascending: false })
  if (!error && data) {
    teamData.value = data.map((member, idx) => ({
      ...member,
      backgroundColor: bgColors[idx % bgColors.length],
      borderColor: borderColors[idx % borderColors.length],
    }))
  }
}

onMounted(fetchTeam)
</script>

<template>
  <div class="bg-surface">
    <VContainer id="team">
      <div class="our-team">
        <div class="headers d-flex justify-center flex-column align-center">
          <VChip label color="primary" class="mb-4" size="small">
            Tim Hebat Kami
          </VChip>

          <h4 class="d-flex align-center text-h4 mb-1 flex-wrap justify-center">
            <div class="position-relative me-2">
              <div class="section-title">
                Didukung
              </div>
            </div>
            oleh tim terbaik
          </h4>

          <p class="text-center text-body-1 mb-0">
            Kenali siapa saja di balik gerakan anti-korupsi ini.
          </p>
        </div>

        <VRow dense>
          <VCol
            v-for="(data, index) in teamData"
            :key="index"
            cols="6"
            sm="4"
            md="3"
            lg="2"
            class="d-flex justify-center"
          >
            <VCard flat class="team-card-simple d-flex flex-column align-center pa-2">
              <VAvatar
                :image="data.image_url"
                size="72"
                class="mb-2 team-avatar"
                :style="{ border: `1px solid ${data.borderColor}`, backgroundColor: data.backgroundColor }"
              />
              <div class="text-center">
                <h6 class="text-h6 mb-1">{{ data.name }}</h6>
                <p class="text-caption text-disabled mb-0">{{ data.position }}</p>
              </div>
            </VCard>
          </VCol>
        </VRow>
      </div>
    </VContainer>
  </div>
</template>

<style lang="scss" scoped>
.team-avatar {
  // Smaller avatar, border and background handled inline
}

.our-team {
  margin-block: 2rem;
}

.headers {
  margin-block-end: 2.5rem;
}

.team-card-simple {
  box-shadow: none;
  border-radius: 12px;
  min-width: 0;
  width: 100%;
  max-width: 140px;
  margin: 0 auto 1.5rem auto;
  background: transparent;
}

.section-title {
  font-size: 20px;
  font-weight: 800;
  line-height: 28px;
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

/* Remove old styles for .team-image, .team-card, etc. */
</style>
