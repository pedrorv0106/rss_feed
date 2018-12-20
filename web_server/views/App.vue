<template>
  <div>
    <h1>{{title}} News Feed</h1>
    <div v-for="rss in rssData">
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
	  			rssData: []
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
		         var jsonData = JSON.parse(xhr.responseText)
		         self.rssData = jsonData['result']
		      }
		      xhr.send('limit=4')
		    }
		},

		sockets: {
            onmessage: function(msg) {
                var updatedRss = JSON.parse(msg.data);
                updatedRss.sort(function(a, b){
                	var timeA = Date.parse(a.date);
                	var timeB = Date.parse(b.date);

                	return timeB - timeA
                });

                this.rssData = updatedRss.concat(this.rssData);
            },

            onopen: function() {
                console.log("Websocket connected");
            },

            onclose: function() {
                console.log("Websocket disconnected");
            },

            onerror: function(err) {
                console.error("Websocket error!", err);
            }
		},

		components: {RssItem}
	}
</script>