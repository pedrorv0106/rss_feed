<template>
	<tr>
		<td>{{rss['date']}}</td>
		<td>{{rss['topic']}}</td>
		<td>
			<a :href="rss['url']" target='_blank'>{{rss['title']}}</a>
		</td>
		<td>{{rss['from']}}</td>
	</tr>
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