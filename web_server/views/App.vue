<template>
  <div>
    <h1>{{title}} News Feed</h1>
    <div v-for="rss in rssData['result']">
        <rss-item :rss="rss">
		</rss-item>
    </div>
  </div>
</template>

<script>
	import RssItem from './component/RssItem.vue'
	export default {
		name: 'app',

	  	data: function () {
	  		return {
	  			title: 'CoinDesk',
	  			rssData: {}
	  		}
	  	},

		created: function () {
		    this.fetchData()
		},

		methods: {
		    fetchData: function () {
		      var xhr = new XMLHttpRequest()
		      var self = this
		      var apiURL = 'http://18.191.245.20:3000/news/'
		      // var apiURL = 'http://localhost:3000/news/'
		      xhr.open('POST', apiURL + self.title)
		      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		      xhr.onload = function () {
		        self.rssData = JSON.parse(xhr.responseText)
		      }
		      xhr.send('limit=4')
		    }
		},
		components: {RssItem}
	}
</script>