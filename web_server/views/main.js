import Vue from 'vue'
import App from './App.vue'
import './style/style.css'
import './style/Spinner.scss'
import './style/fonts/Catamaran-Regular.ttf'
import './style/fonts/Catamaran-Regular.woff2'
import './style/fonts/Gilroy-Light.eot'
import './style/fonts/Gilroy-Light.ttf'
import './style/fonts/Gilroy-Light.woff'

import VueNativeSock from 'vue-native-websocket'
import Global from './global.js'

Vue.use(VueNativeSock, Global.WS_URL, {
	reconnection: true,
});

new Vue({
 	el: 'app',
 	components: {App}
})