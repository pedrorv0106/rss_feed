import * as Parser from 'rss-parser';
import * as dbMysql from './db/dbMysql';
import * as WebSocket from 'ws';

var parser = new Parser();
const wss = new WebSocket.Server({ port: 3001, path: '/coindesk' });
const MINS = 1000 * 60;
var socket = null;

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
  	console.log('sending CLIENT');
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

async function getCoinDesk() {
	console.log("Get CoinDesk FeedData");
  	parser.parseURL('http://feeds.feedburner.com/CoinDesk').then(async feed => {
		console.log(feed.title);

		var latestRss = await dbMysql.get_latest_rss();
		if (latestRss != null)
			console.log(latestRss.isodate);

		var newerItems = [];
		feed.items.forEach(item => {
			if (latestRss != null) {
				var latestDate = Date.parse(latestRss.isodate);
				var itemDate = Date.parse(item.isoDate);
				if (latestDate >= itemDate)
					return;
			}
		  	dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, item.isoDate).catch(console.log);
		  	newerItems[newerItems.length] = {
		  		title: item.title,
		  		link: item.link,
		  		creator: item.creator,
		  		content: item.content,
		  		date: item.isoDate,
		  	};
		});

		if (newerItems.length > 0)
			wss.broadcast(JSON.stringify(newerItems));

		setTimeout(() => getCoinDesk(), MINS);
  	}, error => {
  		console.log(error);
  		setTimeout(() => getCoinDesk(), 1000);
  	});
}

getCoinDesk();

