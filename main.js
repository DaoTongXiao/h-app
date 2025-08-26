import Vue from 'vue'
import uView from 'uview-ui'
import App from './App'
import './uni.promisify.adaptor'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(uView)
// set config
uni.$u.setConfig({
	config: {
		unit: 'rpx'
	},
	props: {

		radio: {
			size: 15
		}
	}
})
const app = new Vue({
  ...App
})

app.$mount()