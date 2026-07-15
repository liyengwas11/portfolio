import { createApp } from 'vue'
import App from './App.vue'
import { magnetic } from './directives/magnetic.js'
import { spotlight } from './directives/spotlight.js'
import './style.css'

const app = createApp(App)
app.directive('magnetic', magnetic)
app.directive('spotlight', spotlight)
app.mount('#app')
