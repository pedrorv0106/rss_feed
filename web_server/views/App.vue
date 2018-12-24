<template>
  <div>
    <div id="navigation-bar">
    	<ul class="list-group">
    		<li style="display:block;">
    			<h3>Topics</h3>
    			<ul class="list-group">
    				<li class="list-group-item">
		    			<a href='#' v-on:click='fetchData()'>All News</a>
		    		</li>
    				<li class="list-group-item">
    					<a href='#' v-on:click="fetchTopicData('Regulation')">Regulation</a>
    				</li>
    				<li class="list-group-item">
    					<a href='#' v-on:click="fetchTopicData('Adoption')">Adoption</a>
    				</li>
    				<li class="list-group-item">
    					<a href='#' v-on:click="fetchTopicData('Fraud')">Fraud</a>
    				</li>
    				<li class="list-group-item">
    					<a href='#' v-on:click="fetchTopicData('ICO')">ICO</a>
    				</li>
    				<li class="list-group-item">
    					<a href='#' v-on:click="fetchTopicData('Exchange')">Exchange</a>
    				</li>
    				<li class="list-group-item">
    					<a href='#' v-on:click="fetchTopicData('Mining')">Mining</a>
    				</li>
    			</ul>
    		</li>
    	</ul>
    </div>
    <div id="content">
    	<h1>News Feed</h1>
    	<table class="table table-bordered">
		    <thead>
		      <tr>
		        <th>Time</th>
		        <th>Topics</th>
		        <th>Headline</th>
		        <th>Source</th>
		      </tr>
		    </thead>
		    <tbody>
		    	<template v-for="rss in rssData">
		    		<rss-item :rss="rss">
					</rss-item>
				</template>
		    </tbody>
		</table>
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
		      xhr.send('limit=50')
		    },
		    fetchTopicData: function (topic) {
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
		      xhr.send('limit=50&topic=' + topic);
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