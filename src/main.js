import { createApp } from 'vue'
import { IonicVue } from '@ionic/vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

import { Capacitor } from '@capacitor/core'

import { addIcons } from 'ionicons'
import { home, homeOutline, person, personOutline, settings, settingsOutline } from 'ionicons/icons'

addIcons({
    'home': home,
    'home-outline': homeOutline,
    'person': person,
    'person-outline': personOutline,
    'settings': settings,
    'settings-outline': settingsOutline
})


const app = createApp(App)

/* app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('ion-')
}
 */
app.use(IonicVue)
app.use(router)

app.mount('#app')
