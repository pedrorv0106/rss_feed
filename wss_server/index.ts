import * as Parser from 'rss-parser';
import * as dbMysql from './db/dbMysql';
import * as WebSocket from 'ws';
import * as moment from 'moment';

var parserCoinDesk = new Parser();
var parserCryptoCoin = new Parser();
var parserEthereum = new Parser();
var parserCoindoo = new Parser();
var parserCointelegraph = new Parser();
var parserCoinspeaker = new Parser();

const wss = new WebSocket.Server({ port: 3001, path: '/feeds' });
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

function getTopic(categories) {
	var value;
	for (var i = 0; i < categories.length; i++) {
        value = categories[i].toLowerCase();
        if (value.includes('regulation'))
            return "Regulation";
        if (value.includes('adoption'))
            return "Adoption";
        if (value.includes('fraud'))
            return "Fraud";
        if (value.includes('ico'))
            return "ICO";
        if (value.includes('exchange'))
            return "Exchange";
        if (value.includes('mining'))
            return "Mining";
    }

    return "";
}

async function getCoinDesk() {
	console.log("Get CoinDesk FeedData");
  	parserCoinDesk.parseURL('https://www.coindesk.com/feed').then(async feed => {
		console.log(feed.title);

		var latestRss = await dbMysql.get_latest_rss(1);
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
		  	var topic = getTopic(item.categories);
            dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 1).catch(console.log);
            newerItems[newerItems.length] = {
                title: item.title,
                url: item.link,
                from: 'CoinDesk',
                topic: topic,
                // creator: item.creator,
                // content: item.content,
                date: moment(item.isoDate).fromNow(),
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

async function getCryptoCoin() {
	console.log("Get CryptoCoin FeedData");
  	parserCryptoCoin.parseURL('https://www.ccn.com/feed/').then(async feed => {
		console.log(feed.title);

		var latestRss = await dbMysql.get_latest_rss(2);
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
		  	var topic = getTopic(item.categories);
            dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 2).catch(console.log);
            newerItems[newerItems.length] = {
                title: item.title,
                url: item.link,
                from: 'CryptoCoin',
                topic: topic,
                // creator: item.creator,
                // content: item.content,
                date: moment(item.isoDate).fromNow(),
            };
		});

		if (newerItems.length > 0)
			wss.broadcast(JSON.stringify(newerItems));

		setTimeout(() => getCryptoCoin(), MINS);
  	}, error => {
  		console.log(error);
  		setTimeout(() => getCryptoCoin(), 1000);
  	});
}

async function getEthereum() {
	console.log("Get Ethereum World FeedData");
  	parserEthereum.parseURL('https://ethereumworldnews.com/feed/').then(async feed => {
		console.log(feed.title);

		var latestRss = await dbMysql.get_latest_rss(3);
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
		  	var topic = getTopic(item.categories);
            dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 3).catch(console.log);
            newerItems[newerItems.length] = {
                title: item.title,
                url: item.link,
                from: 'Ethereum World',
                topic: topic,
                // creator: item.creator,
                // content: item.content,
                date: moment(item.isoDate).fromNow(),
            };
		});

		if (newerItems.length > 0)
			wss.broadcast(JSON.stringify(newerItems));

		setTimeout(() => getEthereum(), MINS);
  	}, error => {
  		console.log(error);
  		setTimeout(() => getEthereum(), 1000);
  	});
}

async function getCoindoo() {
	console.log("Get Coindoo FeedData");
  	parserCoindoo.parseURL('https://coindoo.com/feed/').then(async feed => {
		console.log(feed.title);

		var latestRss = await dbMysql.get_latest_rss(4);
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
		  	var topic = getTopic(item.categories);
            dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 4).catch(console.log);
            newerItems[newerItems.length] = {
                title: item.title,
                url: item.link,
                from: 'Coindoo',
                topic: topic,
                // creator: item.creator,
                // content: item.content,
                date: moment(item.isoDate).fromNow(),
            };
		});

		if (newerItems.length > 0)
			wss.broadcast(JSON.stringify(newerItems));

		setTimeout(() => getCoindoo(), MINS);
  	}, error => {
  		console.log(error);
  		setTimeout(() => getCoindoo(), 1000);
  	});
}

async function getCointelegraph() {
	console.log("Get Cointelegraph FeedData");
  	parserCointelegraph.parseURL('https://cointelegraph.com/feed').then(async feed => {
		console.log(feed.title);

		var latestRss = await dbMysql.get_latest_rss(5);
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
		  	var topic = getTopic(item.categories);
            dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 5).catch(console.log);
            newerItems[newerItems.length] = {
                title: item.title,
                url: item.link,
                from: 'Cointelegraph',
                topic: topic,
                // creator: item.creator,
                // content: item.content,
                date: moment(item.isoDate).fromNow(),
            };
		});

		if (newerItems.length > 0)
			wss.broadcast(JSON.stringify(newerItems));

		setTimeout(() => getCointelegraph(), MINS);
  	}, error => {
  		console.log(error);
  		setTimeout(() => getCointelegraph(), 1000);
  	});
}

async function getCoinspeaker() {
	console.log("Get Coinspeaker FeedData");
  	parserCoinspeaker.parseURL('https://www.coinspeaker.com/feed/').then(async feed => {
		console.log(feed.title);

		var latestRss = await dbMysql.get_latest_rss(6);
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
		  	var topic = getTopic(item.categories);
            dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 6).catch(console.log);
            newerItems[newerItems.length] = {
                title: item.title,
                url: item.link,
                from: 'Coinspeaker',
                topic: topic,
                // creator: item.creator,
                // content: item.content,
                date: moment(item.isoDate).fromNow(),
            };
		});

		if (newerItems.length > 0)
			wss.broadcast(JSON.stringify(newerItems));

		setTimeout(() => getCoinspeaker(), MINS);
  	}, error => {
  		console.log(error);
  		setTimeout(() => getCoinspeaker(), 1000);
  	});
}

getCoinDesk();
getCryptoCoin();
getEthereum();
getCoindoo();
getCointelegraph();
getCoinspeaker();