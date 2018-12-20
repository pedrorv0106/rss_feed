import Vue from 'vue'
import App from './App.vue'
import VueNativeSock from 'vue-native-websocket'
Vue.use(VueNativeSock, 'ws://18.191.245.20:3001/coindesk', {
// Vue.use(VueNativeSock, 'ws://localhost:3001/coindesk', {
	reconnection: true,
});

new Vue({
 	el: 'app',
 	components: {App}
})