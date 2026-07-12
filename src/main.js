import { createApp } from 'vue'
import App from './App.vue'
import { magnetic } from './directives/magnetic.js'
import './style.css'

const app = createApp(App)
app.directive('magnetic', magnetic)
app.mount('#app')
