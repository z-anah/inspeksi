<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components/VForm'
import { useCalendarStore } from './useCalendarStore'
import { useClipboard } from '@vueuse/core'

// 👉 store
const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  event: {
    type: null,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'addEvent',
  'updateEvent',
  'removeEvent',
])

const store = useCalendarStore()
const refForm = ref()

// 👉 Event
const event = ref(JSON.parse(JSON.stringify(props.event)))

const resetEvent = () => {
  event.value = JSON.parse(JSON.stringify(props.event))
  nextTick(() => {
    refForm.value?.resetValidation()
  })
}

watch(() => props.isDrawerOpen, resetEvent)

const removeEvent = () => {
  emit('removeEvent', String(event.value.id))

  // Close drawer
  emit('update:isDrawerOpen', false)
}

const handleSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {

      // If id exist on id => Update event
      if ('id' in event.value)
        emit('updateEvent', event.value)

      // Else => add new event
      else
        emit('addEvent', event.value)

      // Close drawer
      emit('update:isDrawerOpen', false)
    }
  })
}

const guestsOptions = [
  {
    avatar: avatar1,
    name: 'Jane Foster',
  },
  {
    avatar: avatar3,
    name: 'Donna Frank',
  },
  {
    avatar: avatar5,
    name: 'Gabrielle Robertson',
  },
  {
    avatar: avatar7,
    name: 'Lori Spears',
  },
  {
    avatar: avatar6,
    name: 'Sandy Vega',
  },
  {
    avatar: avatar2,
    name: 'Cheryl May',
  },
]

// 👉 Form
const onCancel = () => {

  // Close drawer
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    resetEvent()
    refForm.value?.resetValidation()
  })
}

const startDateTimePickerConfig = computed(() => ({
  enableTime: false,
  dateFormat: 'Y-m-d',
}))

const dialogModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

// 👉 Disable all form fields
const isDisabled = computed(() => true)

// Copy all event info to clipboard
const { copy } = useClipboard()

const copyAllInfo = () => {
  const e = event.value
  const info = `
Title: ${e.title}
Date: ${e.start}
Location: ${e.extendedProps?.location || ''}
Map URL: ${e.extendedProps?.map_url || ''}
  `.trim()
  copy(info)
}
</script>

<template>
  <VNavigationDrawer data-allow-mismatch temporary location="end" :model-value="props.isDrawerOpen" width="370"
    :border="0" class="scrollable-content" @update:model-value="dialogModelValueUpdate">
    <!-- 👉 Header -->
    <AppDrawerHeaderSection title="Detail Acara"
      @cancel="$emit('update:isDrawerOpen', false)">
      <template #beforeClose>
        <VBtn icon="tabler-copy" variant="text" @click="copyAllInfo" title="Salin Semua Info" />
      </template>
    </AppDrawerHeaderSection>

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- SECTION Form -->
          <VForm ref="refForm" @submit.prevent="handleSubmit">
            <VRow>
              <!-- 👉 Title -->
              <VCol cols="12">
                <AppTextField id="event-title" v-model="event.title" label="Judul" placeholder="Judul acara"
                  :rules="[requiredValidator]" :disabled="isDisabled" />
              </VCol>

              <!-- 👉 Event Date -->
              <VCol cols="12">
                <AppDateTimePicker id="event-date" :key="JSON.stringify(startDateTimePickerConfig)"
                  v-model="event.start" :rules="[requiredValidator]" label="Tanggal Acara" placeholder="Pilih Tanggal"
                  :config="startDateTimePickerConfig" :disabled="isDisabled" />
              </VCol>

              <!-- 👉 Location -->
              <VCol cols="12">
                <AppTextField id="event-location" v-model="event.extendedProps.location" label="Lokasi"
                  placeholder="Lokasi acara" :disabled="isDisabled" />
              </VCol>

              <!-- 👉 Map URL -->
              <VCol cols="12">
                <AppTextField id="event-map-url" v-model="event.extendedProps.map_url" label="URL Peta"
                  placeholder="https://maps.google.com/..." type="url" :disabled="isDisabled" />
              </VCol>

            </VRow>
          </VForm>
          <!-- !SECTION -->
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
