<template>
  <Clock :weekdays="schedule.weekdays_12_hours" :weekends="schedule.weekends_12_hours" class=" lg:my-20" />
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex">
    <Card :title="t('card.title.schedule')">
      <template #icon>
        <carbon-time class="h-8 text-gray-200 w-8 stroke-current stroke-1 stroke-join-round" />
      </template>
      <template #default>
        <h3 class="text-sm font-semibold text-gray-800 dark:text-white">
          {{ t('card.m-f') }}
        </h3>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
          {{ schedule.weekdays_12_hours.start }} - {{ schedule.weekdays_12_hours.end }}
        </h2>
        <h3 class="text-sm mt-3 font-semibold text-gray-800 dark:text-white">
          {{ t('card.s-s') }}
        </h3>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
          {{ schedule.weekends_12_hours.start }} - {{ schedule.weekends_12_hours.end }}
        </h2>
      </template>
    </Card>

    <Card :title="t('card.title.free_traffic')">
      <template #icon>
        <carbon-car class="h-8 text-gray-200 w-8 stroke-current stroke-1 stroke-join-round" />
      </template>
      <template #default>
        <h3 class="text-sm font-semibold text-gray-800 dark:text-white">
          {{ t('card.m-f') }}
        </h3>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
          {{ schedule.weekdays_12_hours.traffic_hours }} {{ t('general.hours') }}
        </h2>
        <h3 class="text-sm mt-3 font-semibold text-gray-800 dark:text-white">
          {{ t('card.s-s') }}
        </h3>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
          {{ schedule.weekends_12_hours.traffic_hours }} {{ t('general.hours') }}
        </h2>
      </template>
    </Card>

    <Card :title="t('card.title.legal_frame')">
      <template #icon>
        <carbon-rule class="h-8 text-gray-200 w-8 stroke-current stroke-1 stroke-join-round" />
      </template>
      <template #default>
        <h3 class="text-sm font-semibold text-gray-800 dark:text-white">
          {{ t('card.last_decree') }}
        </h3>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
          <a :href="schedule.decree_url" target="_blank">{{ schedule.decree }}</a>
        </h2>
        <h3 class="text-sm mt-3 font-semibold text-gray-800 dark:text-white">
          {{ t('card.expires') }}
        </h3>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
          {{ schedule.expiration }}
        </h2>
        <p class="text-sm">
          {{ t('general.en') }} {{ schedule.expiration_days }} {{ t('card.days') }}
        </p>
      </template>
    </Card>
  </div>
  <div class="text-center text-sm mt-10 w-full text-center pb-8">
    <span class="font-bold">{{ t('general.last_update') }}:</span> {{ schedule.last_update }}
    <div class="text-xs">
      {{ t('dev_by') }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default {
  async setup() {
    const schedule = ref({})
    const router = useRouter()
    const { t } = useI18n()

    const api = await fetch(import.meta.env.VITE_API_URL)
    schedule.value = await api.json()

    return {
      schedule,
      router,
      t,
    }
  },
}
</script>

<route lang="yaml">
meta:
  layout: master
</route>
