<template>
  <div class="mt-4 mb-8">
    <div id="MyClock" :class="`text-${statusClass}-800 dark:text-${statusClass}-200 `" class="text-2xl antialiased " v-text="time"></div>
    <div id="statusBar" class="flex justify-center flex-wrap content-center block">
      <div :class="`border-b border-b-3 border-${statusClass}-300 text-${statusClass}-900  dark:text-${statusClass}-200 border-${statusClass}-900 dark:border-${statusClass}-200`" class="text-xs" v-text="statusMessage"></div>
    </div>
  </div>
</template>

<script>
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
      return day >= 0 || day <= 1
    },
    curfewTime() {
      const hour = new Date().getHours()
      if (this.weekend(new Date().getDay())) {
        if (hour <= this.weekends.start && hour >= this.weekends.end)
          this.statusClass = 'green'
        if (hour >= this.weekends.start && hour <= (parseInt(this.weekends.start) + parseInt(this.weekends.traffic_hours)))
          this.statusClass = 'yellow'
        if ((hour >= (parseInt(this.weekends.start) + parseInt(this.weekends.traffic_hours)) && hour <= this.weekends.end) || hour === 0)
          this.statusClass = 'red'
        // console.log(hour, this.weekends.start, this.statusClass, this.weekends.traffic_hours)
      }
      else {
        if (hour <= this.weekdays.start && hour >= this.weekdays.end)
          this.statusClass = 'green'
        if (hour >= this.weekdays.start && hour <= (parseInt(this.weekdays.start) + parseInt(this.weekdays.traffic_hours)))
          this.statusClass = 'yellow'
        if ((hour >= parseInt((this.weekdays.start) + parseInt(this.weekdays.traffic_hours)) && hour <= this.weekdays.end) || hour === 0)
          this.statusClass = 'red'
        // console.log(hour, this.weekends.start, this.statusClass, this.weekends.traffic_hours)
      }
    },
    showTime() {
      const date = new Date()
      let h = date.getHours() // 0 - 23
      let m = date.getMinutes() // 0 - 59
      let s = date.getSeconds() // 0 - 59
      let session = 'AM'

      if (h === 0) h = 12

      if (h > 12) {
        h = h - 12
        session = 'PM'
      }

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
