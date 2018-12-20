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
function getCoinDesk() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get CoinDesk FeedData");
        parser.parseURL('http://feeds.feedburner.com/CoinDesk').then((feed) => __awaiter(this, void 0, void 0, function* () {
            console.log(feed.title);
            var latestRss = yield dbMysql.get_latest_rss();
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
                    url: item.link,
                    creator: item.creator,
                    content: item.content,
                    date: item.isoDate,
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
getCoinDesk();
