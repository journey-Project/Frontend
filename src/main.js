import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'v-calendar/style.css'
import 'vue3-carousel/carousel.css'
import './styles/global.css';
import './styles/variables.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
import VueGtag from 'vue-gtag-next'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

if (import.meta.env.PROD) {
  app.use(VueGtag, {
    property: {
      id: 'G-TYTQ1MW7DW',
    }
  }, router)
}

setupCalendar(app, {
  componentPrefix: 'V', // <VDatePicker /> 형식으로 사용 가능
  locales: { ko: { id: 'ko', firstDayOfWeek: 0 } },
  theme: false,
})
app.component('Calendar', Calendar)
app.component('VDatePicker', DatePicker)

app.mount('#app')
