<script setup>
import CalendarEventHandler from '@/views/apps/calendar/CalendarEventHandler.vue'
import { blankEvent, useCalendar } from '@/views/apps/calendar/useCalendar'
import Footer from '@/views/front-pages/front-page-footer.vue'
import NavBar from '@/views/front-pages/front-page-navbar.vue'
import FullCalendar from '@fullcalendar/vue3'
import { ref, watch } from 'vue'

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const event = ref(structuredClone(blankEvent))
const isEventHandlerSidebarActive = ref(false)

watch(isEventHandlerSidebarActive, val => {
  if (!val)
    event.value = structuredClone(blankEvent)
})

const { refCalendar, calendarOptions: baseCalendarOptions, jumpToDate } = useCalendar(event, isEventHandlerSidebarActive)

// Clone and override calendarOptions to disable dateClick (no create), but allow eventClick
const calendarOptions = {
  ...baseCalendarOptions,
  dateClick: undefined, // Disable creating event on date click
}

const jumpToDateFn = date => {
  jumpToDate(date)
}
</script>

<template>
  <NavBar active-id="Kegiatan" />
  <div class="forms-container">
    <VContainer class="mt-10">
      <VCard>
        <VCardText>
          <FullCalendar ref="refCalendar" :options="calendarOptions" />
        </VCardText>
      </VCard>
      <CalendarEventHandler v-model:is-drawer-open="isEventHandlerSidebarActive" :event="event" />
    </VContainer>
  </div>
  <Footer />
</template>

<style lang="scss">
@use "@core/scss/template/libs/full-calendar";
.forms-container {
  margin-block: 8rem 3rem;

  .v-container {
    max-width: 1400px !important;
  }
}

@media (max-width: 960px) and (min-width: 600px) {
  .forms-container {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}

@media (max-width: 600px) {
  .forms-container {
    margin-block-start: 6rem;
  }
}
</style>
