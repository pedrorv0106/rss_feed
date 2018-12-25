"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Parser = require("rss-parser");
const dbMysql = require("./db/dbMysql");
const WebSocket = require("ws");
var parserCoinDesk = new Parser();
var parserCryptoCoin = new Parser();
var parserEthereum = new Parser();
var parserCoindoo = new Parser();
var parserCointelegraph = new Parser();
var parserCoinspeaker = new Parser();
var parserBitcoinCom = new Parser();
var parserNewsBTC = new Parser();
var parserWalletInvestor = new Parser();
var parserReddit = new Parser();
var parserBitcoinMagazine = new Parser();
var parserMinergate = new Parser();
var parserKraken = new Parser();
var parserFinanceMagnates = new Parser();
var parserCoinsutra = new Parser();
var parserCoingape = new Parser();
var parserCryptopotato = new Parser();
var parserBitcoinExchange = new Parser();
var parserReuters = new Parser();
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
    if (categories === undefined)
        return "";
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
function getCoinDesk() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get CoinDesk FeedData");
        parserCoinDesk.parseURL('https://www.coindesk.com/feed').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(1);
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
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'CoinDesk',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getCoinDesk(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getCoinDesk(), 1000);
        });
    });
}
function getCryptoCoin() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get CryptoCoin FeedData");
        parserCryptoCoin.parseURL('https://www.ccn.com/feed/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(2);
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
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'CryptoCoin',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getCryptoCoin(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getCryptoCoin(), 1000);
        });
    });
}
function getEthereum() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get Ethereum World FeedData");
        parserEthereum.parseURL('https://ethereumworldnews.com/feed/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(3);
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
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'Ethereum World',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getEthereum(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getEthereum(), 1000);
        });
    });
}
function getCoindoo() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get Coindoo FeedData");
        parserCoindoo.parseURL('https://coindoo.com/feed/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(4);
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
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'Coindoo',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getCoindoo(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getCoindoo(), 1000);
        });
    });
}
function getCointelegraph() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get Cointelegraph FeedData");
        parserCointelegraph.parseURL('https://cointelegraph.com/feed').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(5);
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
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'Cointelegraph',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getCointelegraph(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getCointelegraph(), 1000);
        });
    });
}
function getCoinspeaker() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get Coinspeaker FeedData");
        parserCoinspeaker.parseURL('https://www.coinspeaker.com/feed/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(6);
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
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'Coinspeaker',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getCoinspeaker(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getCoinspeaker(), 1000);
        });
    });
}
function getBitcoinCom() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get BitcoinCom FeedData");
        parserBitcoinCom.parseURL('https://news.bitcoin.com/feed/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(7);
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
                dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 7).catch(console.log);
                newerItems[newerItems.length] = {
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'BitcoinCom',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getBitcoinCom(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getBitcoinCom(), 1000);
        });
    });
}
function getNewsBTC() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get NewsBTC FeedData");
        parserNewsBTC.parseURL('https://www.newsbtc.com/feed/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(8);
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
                dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 8).catch(console.log);
                newerItems[newerItems.length] = {
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'NewsBTC',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getNewsBTC(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getNewsBTC(), 1000);
        });
    });
}
function getWalletInvestor() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get WalletInvestor FeedData");
        parserWalletInvestor.parseURL('https://walletinvestor.com/blog/feed/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(9);
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
                dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 9).catch(console.log);
                newerItems[newerItems.length] = {
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'WalletInvestor',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getWalletInvestor(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getWalletInvestor(), 1000);
        });
    });
}
function getReddit() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get Reddit FeedData");
        parserReddit.parseURL('https://www.reddit.com/r/CryptoCurrency/top/.rss').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(10);
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
                dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 10).catch(console.log);
                newerItems[newerItems.length] = {
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'Reddit',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getReddit(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getReddit(), 1000);
        });
    });
}
function getBitcoinMagazine() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get BitcoinMagazine FeedData");
        parserBitcoinMagazine.parseURL('https://bitcoinmagazine.com/feed/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(11);
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
                dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 11).catch(console.log);
                newerItems[newerItems.length] = {
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'BitcoinMagazine',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getBitcoinMagazine(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getBitcoinMagazine(), 1000);
        });
    });
}
function getMinergate() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get Minergate FeedData");
        parserMinergate.parseURL('https://minergate.com/blog/feed/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(12);
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
                dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 12).catch(console.log);
                newerItems[newerItems.length] = {
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'Minergate',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getMinergate(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getMinergate(), 1000);
        });
    });
}
function getKraken() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get Kraken FeedData");
        parserKraken.parseURL('https://blog.kraken.com/feed/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(13);
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
                dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 13).catch(console.log);
                newerItems[newerItems.length] = {
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'Kraken',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getKraken(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getKraken(), 1000);
        });
    });
}
function getFinanceMagnates() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get FinanceMagnates FeedData");
        parserFinanceMagnates.parseURL('https://www.financemagnates.com/cryptocurrency/feed/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(14);
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
                dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 14).catch(console.log);
                newerItems[newerItems.length] = {
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'FinanceMagnates',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getFinanceMagnates(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getFinanceMagnates(), 1000);
        });
    });
}
function getCoinsutra() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get Coinsutra FeedData");
        parserCoinsutra.parseURL('https://coinsutra.com/blog/feed/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(15);
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
                dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 15).catch(console.log);
                newerItems[newerItems.length] = {
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'Coinsutra',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getCoinsutra(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getCoinsutra(), 1000);
        });
    });
}
function getCoingape() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get Coingape FeedData");
        parserCoingape.parseURL('https://coingape.com/feed/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(16);
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
                dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 16).catch(console.log);
                newerItems[newerItems.length] = {
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'Coingape',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getCoingape(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getCoingape(), 1000);
        });
    });
}
function getCryptopotato() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get Cryptopotato FeedData");
        parserCryptopotato.parseURL('https://cryptopotato.com/feed/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(17);
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
                dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 17).catch(console.log);
                newerItems[newerItems.length] = {
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'Cryptopotato',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getCryptopotato(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getCryptopotato(), 1000);
        });
    });
}
function getBitcoinExchange() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get BitcoinExchange FeedData");
        parserBitcoinExchange.parseURL('https://bitcoinexchangeguide.com/feed/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(18);
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
                dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 18).catch(console.log);
                newerItems[newerItems.length] = {
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'BitcoinExchange',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getBitcoinExchange(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getBitcoinExchange(), 1000);
        });
    });
}
function getReuters() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get Reuters FeedData");
        parserReuters.parseURL('http://feeds.reuters.com/reuters/INtopNews/').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss(19);
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
                if (!((item.content.includes('crypto')) ||
                    (item.content.includes('bitcoin')) ||
                    (item.content.includes('ethereum'))))
                    return;
                dbMysql.insert_coindesk_rss(item.title, item.creator, item.link, item.content, item.content_snippet, topic, item.isoDate, 19).catch(console.log);
                newerItems[newerItems.length] = {
                    headline: item.title,
                    description: item.content,
                    url: item.link,
                    timestamp: item.isoDate,
                    source: 'Reuters',
                    dbId: item.id,
                    topic: topic,
                };
            });
            if (newerItems.length > 0)
                wss.broadcast(JSON.stringify(newerItems));
            setTimeout(() => getReuters(), MINS);
        }), error => {
            console.log(error);
            setTimeout(() => getReuters(), 1000);
        });
    });
}
getCoinDesk();
getCryptoCoin();
getEthereum();
getCoindoo();
getCointelegraph();
getCoinspeaker();
getBitcoinCom();
getNewsBTC();
getWalletInvestor();
getReddit();
getBitcoinMagazine();
getMinergate();
getKraken();
getFinanceMagnates();
getCoinsutra();
getCoingape();
getCryptopotato();
getBitcoinExchange();
getReuters();
