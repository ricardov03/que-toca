<script>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

export default {
  setup() {
    const router = useRouter()
    const { t } = useI18n()
    const decree = ref({
      wd_12_hours: {},
      wd_24_hours: {},
      we_12_hours: {},
      we_24_hours: {},
    })
    const curfew = ref({
      start: 0,
      ends: 0,
      status: '',
    })

    onMounted(async() => {
      const result = await fetch(import.meta.env.VITE_API_URL)
      decree.value = await result.json()

      decree.value.wd_12_hours = decree.value.weekdays_12_hours
      decree.value.wd_24_hours = decree.value.weekdays_24_hours
      decree.value.we_12_hours = decree.value.weekends_12_hours
      decree.value.we_24_hours = decree.value.weekends_24_hours
    })

    return {
      t,
      router,
      decree,
    }
  },
}
</script>

<template>
  <Suspense>
    <template #default>
      <div>
        <div id="logo" class="">
          <div class="text-4xl -mb-2">
            <carbon-timer class="timer-style dark:text-blue-200" />
          </div>
          <a class="text-blue-500 dark:text-blue-200 font-bold text-2xl" rel="noreferrer" href="https://myblog.ricardovargas.me" target="_blank">
            <span class="">¿Qué</span> Toca?
          </a>
        </div>
        <div class="flex justify-center">
          <div class="w-75">
            <em class="text-xs py-3 text-blue-600 dark:text-blue-200 block leading-tight opacity-75">{{ t('intro.desc') }}</em>
          </div>
        </div>

        <clock :weekdays="decree.wd_24_hours" :weekends="decree.we_24_hours" class="text-center font-mono" />

        <div class="card-default  dark:card-dark-default">
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="card-icon dark:card-dark-icon">
              <carbon-time class="h-10 w-10 stroke-current stroke-1 stroke-join-round" />
            </div>
          </div>
          <div class="text-left w-1/2 flex flex-col justify-end">
            <div class="font-normal text-xs text-gray-700 mr-3  dark:text-gray-100">
              {{ t('card.m-f') }}
            </div>
            <div class="text-2xl tracking-tight text-blue-600 font-bold dark:text-blue-200">
              {{ decree.wd_12_hours.start }} - {{ decree.wd_12_hours.end }}
            </div>
          </div>
          <div class="text-left w-1/2 flex flex-col justify-end">
            <div class="font-normal text-xs text-gray-700 mr-3  dark:text-gray-100">
              {{ t('card.s-s') }}
            </div>
            <div class="text-2xl tracking-tight text-blue-600 font-bold dark:text-blue-200">
              {{ decree.we_12_hours.start }} - {{ decree.we_12_hours.end }}
            </div>
          </div>
          <div class="absolute top-1 right-4 font-bold text-lg text-blue-400 dark:text-gray-800">
            {{ t('card.title.schedule') }}
          </div>
        </div>

        <div class="mt-8 card-default  dark:card-dark-default">
          <div class="text-left w-1/2 flex flex-col justify-end">
            <div class="font-normal text-xs text-gray-700 mr-3 dark:text-gray-100">
              {{ t('card.m-f') }}
            </div>
            <div class="text-3xl text-blue-600 font-bold dark:text-blue-200">
              {{ decree.wd_12_hours.traffic_hours }} {{ t('general.hours') }}
            </div>
          </div>
          <div class="text-left w-1/2 flex flex-col justify-end">
            <div class="font-normal text-xs text-gray-700 mr-3 dark:text-gray-100">
              {{ t('card.s-s') }}
            </div>
            <div class="text-3xl text-blue-600 font-bold dark:text-blue-200">
              {{ decree.we_12_hours.traffic_hours }} {{ t('general.hours') }}
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="card-icon dark:card-dark-icon">
              <carbon-car class="h-10 w-10 stroke-current stroke-1 stroke-join-round" />
            </div>
          </div>
          <div class="absolute top-1 -left-4 font-bold text-lg text-blue-400 dark:text-gray-800">
            {{ t('card.title.free_traffic') }}
          </div>
        </div>

        <div class="mt-8 card-default  dark:card-dark-default">
          <div class="flex-shrink-0 flex items-center justify-center">
            <div class="card-icon dark:card-dark-icon">
              <carbon-rule class="h-10 w-10 stroke-current stroke-1 stroke-join-round" />
            </div>
          </div>
          <div class="text-left w-1/2 flex flex-col justify-center dark:text-gray-100">
            <div class="font-normal text-sm text-gray-700 mr-3 dark:text-gray-100">
              {{ t('card.last_decree') }}
            </div>
            <div class="text-3xl text-blue-600 font-bold dark:text-blue-200">
              <a :href="decree.decree_url" target="_blank">{{ decree.decree }}</a>
            </div>
          </div>
          <div class="text-left w-1/2 flex flex-col justify-center">
            <div class="font-normal text-sm text-gray-700 mr-3 dark:text-gray-100">
              {{ t('card.expires') }}
            </div>
            <div class="text-xl text-blue-600 font-bold dark:text-blue-200">
              {{ decree.expiration }}
            </div>
            <div class="text-sm text-green-600 font-bold dark:text-green-200">
              {{ t('general.en') }} {{ decree.expiration_days }} {{ t('card.days') }}
            </div>
          </div>
          <div class="absolute top-1 right-4 font-bold text-lg text-blue-400 dark:text-gray-800">
            {{ t('card.title.legal_frame') }}
          </div>
        </div>
        <div class="text-center text-sm pt-5">
          <span class="font-bold">{{ t('general.last_update') }}:</span> {{ decree.last_update }}
        </div>
      </div>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
