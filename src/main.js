import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { createApp } from 'vue'
import App from './App.vue'

library.add(faXmark)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
