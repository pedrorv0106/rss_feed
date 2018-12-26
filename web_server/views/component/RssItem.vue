<template>
	<tr>
		<td data-label="Time">{{rss['date']}}</td>
		<td data-label="Topics">{{rss['topic']}}</td>
		<td data-label="Headline">
			<a :href="rss['url']" target='_blank'>{{rss['headline']}}</a>
		</td>
		<td data-label="Source">{{rss['source']}}</td>
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