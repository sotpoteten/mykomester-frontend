import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  BiCaretDownFill,
  BiCaretUpFill,
  BiTrophyFill,
  MdLogoutRound,
  MdSaveRound,
  MdLoginRound,
  BiSendCheckFill,
} from 'oh-vue-icons/icons'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

addIcons(
  BiCaretDownFill,
  BiCaretUpFill,
  BiTrophyFill,
  MdLogoutRound,
  MdSaveRound,
  MdLoginRound,
  BiSendCheckFill,
)

const app = createApp(App)


app.component('v-icon', OhVueIcon)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
