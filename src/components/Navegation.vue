<template>
  <nav class="bg-white shadow dark:bg-gray-800 mb-6">
    <div class="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
      <div class="md:flex md:items-center w-full">
        <div class="flex items-center justify-between">
          <div>
            <a class="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl hover:text-gray-700 dark:hover:text-gray-300" href="#">
              <carbon-timer class="timer-style dark:text-blue-200" />
              <a class="text-blue-500 dark:text-blue-200 font-bold text-2xl" rel="noreferrer" href="https://myblog.ricardovargas.me" target="_blank">
                <span class="">¿Qué</span> Toca?
              </a>
            </a>
          </div>

          <!-- Mobile menu button -->
          <div class="flex md:hidden">
            <button type="button" class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu" @click="isOpen = !isOpen">
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div :class="!isOpen ? 'hidden' : ''" class="flex-1 md:flex md:items-center md:justify-between">
          <div class="flex flex-col text-gray-600 capitalize dark:text-gray-300 md:flex md:px-16 md:-mx-4 md:flex-row md:items-center">
            <router-link to="/" :title="t('button.home')" class="mt-2 md:mt-0 md:mx-4 text-center hover:text-gray-800 dark:hover:text-gray-200">
              {{ t('button.home') }}
            </router-link>
            <router-link to="/about" :title="t('button.about')" class="mt-2 md:mt-0 md:mx-4 text-center hover:text-gray-800 dark:hover:text-gray-200">
              {{ t('button.about') }}
            </router-link>
            <select id="" name="province">
              <option value="santo_domingo">
                Santo Domingo
              </option>
            </select>
          </div>
          <hr class="sm:hidden mt-3 border-gray-300" />
          <div class="flex justify-center mt-4 md:flex md:mt-0 md:-mx-2">
            <a class="icon-btn mx-2" :title="t('button.toggle_dark')" @click="toggleDark">
              <carbon-moon v-if="isDark" width="1.5em" height="1.5em" class="text-white" />
              <carbon-sun v-else width="1.5em" height="1.5em" />
            </a>
            <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales">
              <carbon-language width="1.5em" height="1.5em" :class="{'text-white': isDark}" />
            </a>
            <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/ricardov03/que-toca" target="_blank" title="GitHub">
              <carbon-logo-github width="1.5em" height="1.5em" :class="{'text-white': isDark}" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
// import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { isDark, toggleDark } from '~/logic'

export default {
  setup() {
    const router = useRouter()
    const { t, availableLocales, locale } = useI18n()
    const toggleLocales = () => {
      // change to some real logic
      const locales = availableLocales
      locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
    }

    return {
      isDark,
      router,
      t,
      toggleDark,
      toggleLocales,
    }
  },
  data() {
    return {
      isOpen: false,
    }
  },
}
</script>
