<template>
  <div>
    <h1>News Feed</h1>
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
		      var apiURL = 'http://18.191.245.20:3000/news/feed'
		      // var apiURL = 'http://localhost:3000/news/feed'
		      xhr.open('POST', apiURL)
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