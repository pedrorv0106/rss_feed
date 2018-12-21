<template>
  <div>
    <h3>{{rss['title']}}</h3>
    <p>{{rss['from']}}</p>
    <p>{{rss['date']}}</p>
    <a :href="rss['url']" target='_blank'>{{rss['url']}}</a>
  </div>
</template>

<script>
	export default {
		name: 'rss-item',
		props: {
			rss: {},
	  	},

		created: function () {
		},

		methods: {
		}
	}
</script>