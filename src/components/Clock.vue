<template>
  <div class="mt-4 mb-8">
    <div id="MyClock" :class="`text-${statusClass}-800 dark:text-${statusClass}-200 `" class="text-3xl antialiased " v-text="time"></div>
    <div id="statusBar" class="flex justify-center flex-wrap content-center block">
      <div :class="`border-b border-b-3 border-${statusClass}-300 text-${statusClass}-900  dark:text-${statusClass}-200 border-${statusClass}-900 dark:border-${statusClass}-200`" class="text-xs" v-text="statusMessage"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['color', 'weekdays', 'weekends'],
  data() {
    return {
      time: '',
      hour: 0,
      session: '',
      message: '',
      statusClass: '',
    }
  },
  computed: {
    status() {
      return (this.hour >= 9 && this.session === 'PM') || (this.hour === 12 && this.session === 'AM') || (this.hour <= 5 && this.session === 'AM')
    },
    danger() {
      return (this.hour >= 4 && this.session === 'PM') && (this.hour <= 9 && this.session === 'PM')
    },
    statusMessage() {
      switch (this.statusClass) {
        case 'red':
          return 'Toque de Queda Activo.'
          break
        case 'yellow':
          return 'Toque de Queda Activo. Estás en Libre Tránsito.'
          break
        case 'green':
        default:
          return 'Toque de Queda Inactivo.'
      }
    },
  },
  mounted() {
    this.showTime()
    setTimeout(this.curfewTime, 1000)
  },
  methods: {
    weekend(day) {
      return day === 0 || day === 6
    },
    curfewTime() {
      const hour = new Date().getHours()

      const wd_end = parseInt(this.weekdays.end)
      const wd_start = parseInt(this.weekdays.start)
      const wd_thours = parseInt(this.weekdays.traffic_hours)
      const we_end = parseInt(this.weekends.end)
      const we_start = parseInt(this.weekends.start)
      const we_thours = parseInt(this.weekends.traffic_hours)

      if (this.weekend(new Date().getDay())) {
        if (hour <= we_start && hour >= we_end)
          return this.statusClass = 'green'
        if (hour >= we_start && hour <= (we_start + we_thours))
          return this.statusClass = 'yellow'
        if ((hour >= (we_start + we_thours)) || hour <= we_end)
          return this.statusClass = 'red'
        // console.log(hour, this.weekends.start, this.statusClass, this.weekends.traffic_hours, (parseInt(this.weekends.start) + parseInt(this.weekends.traffic_hours)), this.weekends.end)
      }
      else {
        console.log(hour, wd_end, wd_start)
        if (hour >= wd_end && hour <= wd_start)
          return this.statusClass = 'green'
        if (hour >= wd_start && hour <= (wd_start + wd_thours))
          return this.statusClass = 'yellow'
        if ((hour >= (wd_start + wd_thours)) || hour <= wd_end)
          return this.statusClass = 'red'
        // console.log(hour, this.weekdays.start, this.statusClass, this.weekdays.traffic_hours)
      }
    },
    showTime() {
      const timeZone = -4 // GTM -4:00

      const d = new Date()
      const utc = d.getTime() + (d.getTimezoneOffset() * 60000)
      // getTime -> milliseconds since epoch (absolute time)
      // getTimezoneOffset -> difference between local time vs utc, in minutes (relative time)
      //    E.g.: d = "20210626T120000 GMT-4", UTC="20210626T160000 GMT+0", diff = UTC - d = 40000 secs, or 40000 / 60 mins => 666.67 minutes
      const date = new Date(utc + (3600000 * timeZone)) // 1 hr in milliseconds = 3600000 ms

      let h = date.getHours() // 0 - 23
      let m = date.getMinutes() // 0 - 59
      let s = date.getSeconds() // 0 - 59

      const session = h >= 12 ? 'PM' : 'AM'
      h = h > 12 ? h - 12 : h === 0 ? 12 : h

      h = (h < 10) ? `0${h}` : h
      m = (m < 10) ? `0${m}` : m
      s = (s < 10) ? `0${s}` : s

      const time = `${h}:${m}:${s} ${session}`
      this.time = time

      this.hour = h
      this.session = session

      setTimeout(this.showTime, 1000)
      // setTimeout(this.curfewTime, 1000)
    },
  },
}
</script>
