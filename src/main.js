import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
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
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

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

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.component('v-icon', OhVueIcon)
app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(ConfirmationService)
app.use(ToastService)

app.mount('#app')
