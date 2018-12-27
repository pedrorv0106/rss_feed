import Vue from 'vue'
import App from './App.vue'
import './style/base_ocean_blue.css'
import './style/style.css'
import './style/Spinner.scss'
import './style/imgs/logo.svg'
import './style/imgs/PROOF_Hi_PNG_Black.png'
import './style/imgs/PROOF_Hi_PNG_White.png'
import './style/imgs/uFw8Nu8c_400x400.jpg'
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